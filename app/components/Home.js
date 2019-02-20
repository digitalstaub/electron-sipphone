// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { UAContext } from '../containers/App';

type Props = {};

// type callType = () => void

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.SETTINGS}>to Settings</Link>
        <br />
        <UAContext.Consumer>
          {({ call }) => (
            <button
              type="button"
              onClick={() => {
                call('200');
              }}
            >
              call 200
            </button>
          )}
        </UAContext.Consumer>
      </div>
    );
  }
}
