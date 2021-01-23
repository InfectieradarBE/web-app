import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
// import Error from '../alerts/Error';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  id?: string;
  name?: string;
  label?: string;
  hasError?: boolean;
  errorMsg?: string;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const { hasError, className, errorMsg, ...inputProps } = props;

  const errorOpen = props.hasError && errorMsg && errorMsg.length > 0;

  return (
    <div className={className}>
      {inputProps.label ?
        <label
          className={
            "form-label fw-bold w-100"
            //styles.inputLabel
          }
          htmlFor={inputProps.id}>
          {inputProps.label}
        </label>
        : null}
      <input
        {...inputProps}
        id={inputProps.id}
        className={clsx(
          "form-control border-2",
          {
            "border-danger": hasError && !props.disabled,
            "border-white": !hasError && !props.disabled,
            // "border-2 border-grey-2": props.disabled,

            // [styles.inputError]: hasError
          })}
        name={inputProps.name}
        required={inputProps.required}
        placeholder={inputProps.placeholder ? inputProps.placeholder + (inputProps.required ? ' *' : '') : inputProps.placeholder}
        autoComplete={inputProps.autoComplete}
        autoFocus={inputProps.autoFocus}
        value={inputProps.value}
        onChange={inputProps.onChange}
        disabled={inputProps.disabled}
      />

      {/* errorMsg ?
        <Error
          hide={!errorOpen}
          permanent={true} >
          {errorOpen ? errorMsg : null}
        </Error>
      : null */}
    </div>
  );
};

export default TextField;
