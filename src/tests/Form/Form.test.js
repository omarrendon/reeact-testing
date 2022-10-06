import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { rest } from 'msw'
import { CREATED_STATUS } from "../../consts/httpStatus";
import Form from "../../form/Form";

const server = setupServer(
  rest.post('/products', (req, res, ctx) => res(ctx.status(CREATED_STATUS))),
)
// const server = setupServer(
//   rest.post('/products', (req, res, ctx) => {
//     const {name, size, type} = req.body
//     if (name && size && type) {
//       return res(ctx.status(CREATED_STATUS))
//     }
//     return res(ctx.status(ERROR_SERVER_STATUS))
//   })
// )
beforeAll(() => server.listen())

afterAll(() => server.close())


beforeEach(() => render(<Form />));

describe('Should mounted Form component', () => {
  test('should exists the fields: name, size, type (electronic, furniture, clothing)', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  });

  test('should existet the submit button', () => {
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  });
});

describe('when the user submits the form without values', () => {
  it('should display validation messages', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
});

describe('When the user blurs an empty field', () => {
  test('should display a validation error message for the input name', () => {
    expect(screen.queryByText('The name is required')).not.toBeInTheDocument();

    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: '' }
    });

    expect(screen.queryByText('The name is required')).toBeInTheDocument();
  });

  test('should display a validation error message for the input size', () => {
    expect(screen.queryByText('The size is required')).not.toBeInTheDocument();

    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: { name: 'size', value: '' }
    });

    expect(screen.queryByText('The size is required')).toBeInTheDocument();
  });
});

describe('When the user submits the form correctly', () => {
  test('should the submit button be disable until the request is done ', async () => {
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('the form page must display the success message and clean the fields values.', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const sizeInput = screen.getByLabelText(/size/i);
    const typeSelect = screen.getByLabelText(/type/i);

    fireEvent.change(nameInput, { target: { name: 'name', value: 'my product' } });
    fireEvent.change(sizeInput, { target: { name: 'size', value: '10' } });
    fireEvent.change(typeSelect, { target: { name: 'type', value: 'Electronic' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/product stored/i)).toBeInTheDocument()
    });

    expect(nameInput).toHaveValue('');
    expect(sizeInput).toHaveValue('');
    expect(typeSelect).toHaveValue('');
  });
});

describe('when the user submits the form and the server returns an unexpected error', () => {
  it('the form page must display the error message "Unexpected error, please try again"', async () => {
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(
        screen.getByText(/unexpected error, please try again/i),
      ).toBeInTheDocument(),
    )
  })
})