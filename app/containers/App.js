// @flow
import * as React from 'react';
import JsSIP from 'jssip';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

export const UAContext = React.createContext();

const defaultOptions = {
  mediaConstraints: { audio: true, video: false },
  pcConfig: {
    rtcpMuxPolicy: 'negotiate'
  },
  sessionTimersExpires: 120
};

type Props = {
  children: React.Node,
  settings: {
    socketUrl: string,
    identity: string,
    password: string
  }
};

class App extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.ua = null;
    this.remoteAudio = window.document.createElement('audio');
    this.remoteAudio.id = 'sip-provider-audio';
    window.document.body.appendChild(this.remoteAudio);
  }

  componentDidMount() {
    const settings = {
      socketUrl: 'wss://192.168.99.100:8089/ws',
      identity: 'sip:1060@192.168.99.100',
      password: 'password'
    };

    this.register(settings);
  }

  componentWillUnmount() {
    this.remoteAudio.parentNode.removeChild(this.remoteAudio);
    delete this.remoteAudio;
    if (this.ua) {
      this.ua.stop();
      this.ua = null;
    }
  }

  register = values => {
    JsSIP.debug.disable('JsSIP:*');
    const socket = new JsSIP.WebSocketInterface(values.socketUrl);
    const configuration = {
      sockets: [socket],
      uri: values.identity,
      password: values.password,
      register: true
    };
    this.ua = new JsSIP.UA(configuration);
    this.ua.on('newRTCSession', ({ session }) => {
      console.log('newRTCSession');
      session.connection.addEventListener('addstream', () => {
        [this.remoteAudio.srcObject] = session.connection.getRemoteStreams();
        this.remoteAudio.play();
      });
    });
    this.ua.start();
    this.ua.register();
  };

  call = (dest, options) => {
    if (this.ua && this.ua.isConnected()) {
      this.ua.call(dest, {
        ...defaultOptions,
        ...options
      });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <UAContext.Provider
        value={{
          register: this.register,
          call: this.call
        }}
      >
        <React.Fragment>{children}</React.Fragment>
      </UAContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: getFormValues('settings')(state)
  };
}

export default connect(mapStateToProps)(App);
