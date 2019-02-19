import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';

type Props = {
  handleSubmit: () => void
};

const SettingsForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <div className="control">
          <label className="label" htmlFor="socketUrl">
            Websocket URL
            <Field
              className="input"
              id="socketUrl"
              name="socketUrl"
              component="input"
              type="text"
              placeholder="wss://sip.example.com"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="identity">
            Identity
            <Field
              className="input"
              id="identity"
              name="identity"
              component="input"
              type="text"
              placeholder="sip:alice@example.com"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="password">
            Password
            <Field
              className="input"
              id="password"
              name="password"
              component="input"
              type="password"
              placeholder="superpassword"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'settings',
  destroyOnUnmount: false
})(SettingsForm);
