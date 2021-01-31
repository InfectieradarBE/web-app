import React, { ButtonHTMLAttributes } from 'react';

interface EditBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const EditBtn: React.FC<EditBtnProps> = (props) => {
  return (
    <button
      className="btn btn-primary d-flex align-items-center"
      {...props}
    >
      {props.children}
      <span className="material-icons ms-1" style={{ fontSize: 'inherit' }}>edit</span>
    </button>
  );
};

export default EditBtn;
