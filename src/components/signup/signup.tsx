import React from 'react';
import { Input } from '../input';
import './signup.css';

export interface SignupField {
  value?: string;
  isValid: boolean;
  error: string;
  name: string;
  label?: string;
  type: React.HTMLInputTypeAttribute | undefined;
}

export function Signup() {
  const isEmptyError = (label: string) => `${label} cannot be empty`;
  const isEmailError = () => `Looks like this is not an email`;

  const [state, dispatch] = React.useState<{ firstName: SignupField; lastName: SignupField; email: SignupField; password: SignupField; showError: boolean }>({
    firstName: { name: 'firstName', label: 'First Name', type: 'text', value: '', isValid: false, error: isEmptyError('First Name') },
    lastName: { name: 'lastName', label: 'Last Name', type: 'text', value: '', isValid: false, error: isEmptyError('Last Name') },
    email: { name: 'email', label: 'Email Address', type: 'email', value: '', isValid: false, error: isEmailError() },
    password: { name: 'password', label: 'Password', type: 'text', value: '', isValid: false, error: isEmptyError('Password') },
    showError: false,
  });

  const setValue = (field: SignupField) => {
    return (value: string) => dispatch((prevState) => ({ ...prevState, [field.name]: { ...field, value } }));
  };

  const onBlur = (field: SignupField) => {
    return (event: React.FocusEvent<HTMLInputElement> | undefined) => {
      if (field.type === 'text') {
        validateText(field, event?.target.value || '');
      }

      if (field.type === 'email') {
        validateEmail(field, event?.target.value || '');
      }
    };
  };

  const validateText = (field: SignupField, value?: string) => {
    const isValid = value && value.trim().length > 0 ? true : false;

    if (isValid) dispatch((prevState) => ({ ...prevState, [field.name]: { ...field, error: '', isValid } }));
    else dispatch((prevState) => ({ ...prevState, [field.name]: { ...field, error: isEmptyError(field.label || ''), isValid } }));
  };

  const validateEmail = (field: SignupField, value?: string) => {
    const regex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );

    const isValid = value && regex.test(value) ? true : false;

    if (isValid) dispatch((prevState) => ({ ...prevState, [field.name]: { ...field, error: '', isValid } }));
    else dispatch((prevState) => ({ ...prevState, [field.name]: { ...field, error: isEmailError(), isValid } }));
  };

  const onClick = () => {
    dispatch((prevState) => ({ ...prevState, showError: true }));
  };
  return (
    <div className={`signup-component ${state.showError ? 'show-error-message' : ''}`}>
      <Input field={state.firstName} showError={state.showError} setValue={setValue(state.firstName)} onBlur={onBlur(state.firstName)} />
      <Input field={state.lastName} showError={state.showError} setValue={setValue(state.lastName)} onBlur={onBlur(state.lastName)} />
      <Input field={state.email} showError={state.showError} setValue={setValue(state.email)} onBlur={onBlur(state.email)} />
      <Input field={state.password} showError={state.showError} setValue={setValue(state.password)} onBlur={onBlur(state.password)} />
      <input type="button" value="claim your free trial" onClick={onClick} />
      <p className="signup-disclaimer">
        By clicking the button, you are agreeing to our <a href="#">Terms and Services</a>
      </p>
    </div>
  );
}
