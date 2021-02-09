import React, { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  values?: Array<LanguageConfig>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  label?: string;
  hasError?: boolean;
}

interface LanguageConfig {
  code: string;
  label: string;
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { hasError, className, ...selectProps } = props;

  const renderOption = (optionValue: LanguageConfig) => {
    return (
      <option
        key={optionValue.code}
        value={optionValue.code}
        className="cursor-pointer"
      >
        {optionValue.label}
      </option>
    );
  };

  return (
    <div className={className}>
      {selectProps.label ?
        <label
          className={
            "form-label w-100"
            //styles.inputLabel
          }
          htmlFor={selectProps.id}>
          {selectProps.label}
        </label>
        : null}
      {selectProps.values && selectProps.values.length > 0 ?
        <select
          {...selectProps}
          id={selectProps.id}
          className={clsx(
            "form-select border-2 cursor-pointer",
            {
              "border-danger": hasError && !props.disabled,
              "border-0": !hasError,
              "input-padding-custom": !hasError,
            })}
          name={selectProps.name}
          required={selectProps.required}
          autoFocus={selectProps.autoFocus}
          value={selectProps.value}
          onChange={selectProps.onChange}
          disabled={selectProps.disabled}
        >
          {
            selectProps.values.map(value => renderOption(value))
          }
        </select>
        : null}
    </div>
  );
};

export default SelectField;
