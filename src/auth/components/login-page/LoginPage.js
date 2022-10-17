import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function LoginPage() {
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailValidationMessage('The email is required');
    setPasswordValidationMessage('The password is required');
  }
  return (
    <div>
      <h1>Login Page</h1>
      <TextField
        label='email'
        id='email'
        helperText={emailValidationMessage}
      />
      <form onSubmit={handleSubmit}>
        <TextField
          id='password'
          label='password'
          helperText={passwordValidationMessage}
          type={'password'}
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
