// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  static contextTypes = {
    startCall: PropTypes.func
  };

  call = () => {
    const { startCall } = this.context;
    startCall('200');
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.SETTINGS}>to Settings</Link>
        <br />
        <button type="button" onClick={this.call}>
          call 200
        </button>
      </div>
    );
  }
}
