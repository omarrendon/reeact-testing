import React, { useState } from 'react';
import { CREATED_STATUS, ERROR_SERVER_STATUS, INVALID_REQUEST_STATUS } from '../consts/httpStatus';
import { saveProducts } from '../services/productServices';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = ({ name, value }) => {
    setFormErrors(prevState => ({
      ...prevState,
      [name]: value.length ? '' : `The ${name} is required`,
    }));
  }

  const validateForm = ({ name, size, type }) => {
    validateField({ name: 'name', value: name });
    validateField({ name: 'size', value: size });
    validateField({ name: 'type', value: type });
  }

  const getFormValues = ({ name, size, type }) => ({
    name: name.value,
    size: size.value,
    type: type.value,
  });

  const handleFetchErrors = async (error) => {
    if (error.status === ERROR_SERVER_STATUS) {
      setErrorMessage('Unexpected error, please try again');
    };

    if (error.status === INVALID_REQUEST_STATUS) {
      const data = await response.json();
      setErrorMessage(data?.message);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    validateForm(getFormValues({ name, size, type }));

    if (!name.value || !size.value || !type.value) {
      setErrorMessage('Unexpected error, please try again');
    };

    try {
      const response = await saveProducts(getFormValues({ name, size, type }));

      if (!response.ok) {
        throw response;
      };

      if (response.status === CREATED_STATUS) {
        e.target.reset();
        setSuccessMessage(true);
      }
    } catch (error) {
      handleFetchErrors(error);
    }
    setIsSaving(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField({ name, value });
  };

  return (
    <>
      <h1>Create product</h1>
      {successMessage && <p>Product Stored</p>}

      <p>{errorMessage}</p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="name"
          id="name"
          name="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />

        <TextField
          label="size"
          id="size"
          onBlur={handleBlur}
          name='size'
          helperText={formErrors.size}
        />

        <InputLabel htmlFor="type">Type</InputLabel>

        <Select
          native
          value=""
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <option aria-label="None" value="" />
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="clothing">Clothing</option>
        </Select>

        {formErrors.type.length && <p>{formErrors.type}</p>}

        <Button
          type="submit"
          disabled={isSaving}
        >
          Submit
        </Button>
        <Typography>{successMessage}</Typography>
      </form>
    </>
  )
}

export default Form