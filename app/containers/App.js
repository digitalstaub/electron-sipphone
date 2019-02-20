// @flow
import * as React from 'react';
import JsSIP from 'jssip';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

const defaultVal = {
  register: () => {},
  call: () => {}
};
type obj = {
  register: ({ socketUrl: string, identity: string, password: string }) => void,
  call: (dest: string) => void
};
export const UAContext: React.Context<obj> = React.createContext(defaultVal);

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

  ua: any;

  remoteAudio: HTMLAudioElement;

  constructor(props) {
    super(props);
    this.ua = null;
    this.remoteAudio = window.document.createElement('audio');
    this.remoteAudio.id = 'sip-provider-audio';
    window.document.body.appendChild(this.remoteAudio);
  }

  componentWillUnmount() {
    // this.remoteAudio.parentNode.removeChild(this.remoteAudio);
    delete this.remoteAudio;
    if (this.ua) {
      this.ua.stop();
      this.ua = null;
    }
  }

  register = values => {
    JsSIP.debug.disable('JsSIP:*');
    const { socketUrl, identity, password } = values;
    const socket = new JsSIP.WebSocketInterface(socketUrl);
    const configuration = {
      sockets: [socket],
      uri: identity,
      password,
      register: true
    };
    this.ua = new JsSIP.UA(configuration);
    this.ua.on('newRTCSession', ({ session }) => {
      console.log('newRTCSession');
      session.connection.addEventListener('addstream', () => {
        // $FlowFixMe
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
    const { register, call } = this;
    const { children } = this.props;
    return (
      <UAContext.Provider value={{ register, call }}>
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
