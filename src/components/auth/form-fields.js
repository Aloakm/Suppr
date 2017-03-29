import React from 'react';

export const signinFields = {
  usernameField: username => (
    <fieldset className="form-group">
      <label>Username:</label>
      <input {...username.input} className="form-control" />
      {username.meta.touched && username.meta.error && <div className="error">{username.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <label>Password:</label>
      <input {...password.input} type="password" className="form-control" />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  )
}

export const signupFields = {
  emailField: email => (
    <fieldset className="form-group">
      <label>Email:</label>
      <input className="form-control" {...email.input} />
      {email.meta.touched && email.meta.error && <div className="error">{email.meta.error}</div>}
    </fieldset>
  ),

  usernameField: username => (
    <fieldset className="form-group">
      <label>Username:</label>
      <input className="form-control" {...username.input} />
      {username.meta.touched && username.meta.error && <div className="error">{username.meta.error}</div>}
    </fieldset>
  ),

  passwordField: password => (
    <fieldset className="form-group">
      <label>Password:</label>
      <input className="form-control" {...password.input} />
      {password.meta.touched && password.meta.error && <div className="error">{password.meta.error}</div>}
    </fieldset>
  ), 

  passwordConfirmField: passwordConfirm => (
    <fieldset className="form-group">
      <label>Confirm Password:</label>
      <input className="form-control" {...passwordConfirm.input} />
      {passwordConfirm.meta.touched && passwordConfirm.meta.error && <div className="error">{passwordConfirm.meta.error}</div>}
    </fieldset>
  )
}