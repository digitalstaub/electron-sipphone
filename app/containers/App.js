// @flow
import * as React from 'react';
import { SipProvider } from 'react-sip';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <SipProvider
        host="localhost"
        port={8089}
        pathname="/ws" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
        user="1060"
        password="password" // usually required (e.g. from ENV or props)
        autoRegister // true by default, see jssip.UA option register
        autoAnswer={false} // automatically answer incoming calls; false by default
        iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
        sessionTimersExpires={120} // value for Session-Expires header; 120 by default
        // iceServers={[
        //   // optional
        //   { urls: ['stun:a.example.com', 'stun:b.example.com'] },
        //   { urls: 'turn:example.com', username: 'foo', credential: '1234' }
        // ]}
        debug // whether to output events to console; false by default
      >
        <React.Fragment>{children}</React.Fragment>
      </SipProvider>
    );
  }
}
