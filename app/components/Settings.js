// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SettingsForm from './SettingsForm';
import styles from './Settings.css';
import routes from '../constants/routes';

export default class Counter extends Component {
  submit = values => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          <SettingsForm onSubmit={this.submit} />
        </div>
      </div>
    );
  }
}
