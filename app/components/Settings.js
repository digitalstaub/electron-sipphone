// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SettingsForm from './SettingsForm';
import styles from './Settings.css';
import routes from '../constants/routes';
import { UAContext } from '../containers/App';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          <UAContext.Consumer>
            {({ register }) => <SettingsForm onSubmit={register} />}
          </UAContext.Consumer>
        </div>
      </div>
    );
  }
}
