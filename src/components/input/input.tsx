import React from 'react';
import { SignupField } from '../signup';
import './input.css';
import IconError from '../../images/icon-error.svg';

interface InputProps {
  field: SignupField;
  showError: boolean;
  setValue: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
}

export function Input({ field: { value, error, name, label, type, isValid }, showError, setValue, onBlur }: InputProps) {
  const isSupportedType = () => {
    if (type === 'text' || type === 'email' || type === 'password' || type === 'button') return true;

    return false;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target.value || '');
  };

  const showErrorTheme = () => showError && !isValid;

  return (
    <div>
      <div className="input-component">
        {isSupportedType() ? (
          <>
            <input
              className={`${showErrorTheme() ? 'red' : ''}`}
              name={name}
              type={type}
              placeholder={`${showErrorTheme() ? (type === 'email' ? 'email@example/com' : '') : label}`}
              value={value}
              onChange={onChange}
              onBlur={(event) => {
                if (onBlur) onBlur(event);
              }}
            />
            {showErrorTheme() ? <img className="icon-error" alt="" src={IconError} /> : null}
          </>
        ) : (
          <p>This Input Type '{type}' is not supported</p>
        )}
      </div>
      <p className={`error-message ${showErrorTheme() ? 'show-error' : ''}`}>{error}</p>
    </div>
  );
}
