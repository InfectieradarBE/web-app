import clsx from 'clsx';
import React from 'react';

interface CheckboxProps {
  id: string;
  className?: string;
  name: string;
  checked: boolean;
  label?: string;
  onChange: (value: boolean) => void;
  onClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <div
      className={clsx(
        "form-check d-flex align-items-center m-0",
        props.className
      )}
      onClick={props.onClick}
    >
      <input
        className="form-check-input cursor-pointer me-2"
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={props.checked}
        onChange={(event) => {
          const checked = event.target.checked;
          props.onChange(checked);
        }}
      />

      <label
        className="form-check-label cursor-pointer w-100"
        htmlFor={props.id}>
        {props.label}
        {props.children}
      </label>
    </div >
  );
};

export default Checkbox;
