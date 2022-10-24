import { screen, render, fireEvent } from '@testing-library/react';

import LoginPage from './LoginPage';

beforeEach(() => render(<LoginPage />));

describe('When the login page is mounted', () => {
  test('should have a form with the following fieldls: email, password and a submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
});

describe('When the user leaves empty fields and clicks the submit button', () => {
  test('all fields should be required ', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  });
});

describe('when the user fills the fields and clicks the submit button', () => {
  test('should no display a required messages ', () => {
    screen.getByLabelText(/email/i).value = 'john.doe@test.com'
    screen.getByLabelText(/password/i).value = 'Aa123456789!@#'

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/the password is required/i),
    ).not.toBeInTheDocument()
  });
});