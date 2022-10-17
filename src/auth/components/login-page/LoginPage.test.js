import { screen, render, fireEvent } from '@testing-library/react';

import LoginPage from './LoginPage';


describe('When the login page is mounted', () => {
  beforeAll(() => render(<LoginPage />));

  test('should have a form with the following fieldls: email, password and a submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});

describe('When the user leaves empty fields and clicks the submit button', () => {
  beforeAll(() => render(<LoginPage />));


  test('all fields should be required ', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  });
});