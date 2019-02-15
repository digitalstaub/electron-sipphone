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
      <React.Fragment>
        <SipProvider
          host="localhost"
          port={7443}
          pathname="/ws" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
          user="alice"
          password="secret" // usually required (e.g. from ENV or props)
          autoRegister // true by default, see jssip.UA option register
          autoAnswer={false} // automatically answer incoming calls; false by default
          iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
          sessionTimersExpires={120} // value for Session-Expires header; 120 by default
          extraHeaders={{
            // optional sip headers to send
            register: ['X-Foo: foo', 'X-Bar: bar'],
            invite: ['X-Foo: foo2', 'X-Bar: bar2']
          }}
          iceServers={[
            // optional
            { urls: ['stun:a.example.com', 'stun:b.example.com'] },
            { urls: 'turn:example.com', username: 'foo', credential: '1234' }
          ]}
          debug={false} // whether to output events to console; false by default
        >
          {children}
        </SipProvider>
      </React.Fragment>
    );
  }
}
