import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { saveProducts } from '../services/productServices';
import { CREATED_STATUS, ERROR_SERVER_STATUS } from '../consts/httpStatus';

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
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    validateForm(getFormValues({ name, size, type }));

    if (!name.value || !size.value || !type.value) {
      setErrorMessage('Unexpected error, please try again');
    };

    const response = await saveProducts(getFormValues({ name, size, type }));

    if (response.status === CREATED_STATUS) {
      e.target.reset();
      setSuccessMessage(true);
    }

    if (response.status === ERROR_SERVER_STATUS) {
      setErrorMessage('Unexpected error, please try again');
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