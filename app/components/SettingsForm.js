import React from 'react';
import { reduxForm, Field } from 'redux-form';

type Props = {
  handleSubmit: () => void
};

const SettingsForm = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <div className="control">
          <label className="label" htmlFor="displayName">
            Display Name
            <Field
              className="input"
              id="displayName"
              name="displayName"
              component="input"
              type="text"
              placeholder="e.g. John Doe"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="privateIdentity">
            Private Identity
            <Field
              className="input"
              id="privateIdentity"
              name="privateIdentity"
              component="input"
              type="text"
              placeholder="e.g. +33600000000"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="publicIdentity">
            Public Identity
            <Field
              className="input"
              id="publicIdentity"
              name="publicIdentity"
              component="input"
              type="text"
              placeholder="e.g. sip:+33600000000@doubango.org"
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
              placeholder="Password"
            />
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="label" htmlFor="realm">
            Realm
            <Field
              className="input"
              id="realm"
              name="realm"
              component="input"
              type="text"
              placeholder="e.g. doubango.org"
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
  form: 'settings'
})(SettingsForm);
