import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import AlertBox from '../displays/AlertBox';
import TextField from '../inputs/TextField';

interface LoginCardProps {
  className?: string;
  title: string;
  emailInputLabel: string;
  emailInputPlaceholder: string;
  passwordInputLabel: string;
  passwordInputPlaceholder: string;
  rememberMeLabel: string;
  loginBtn: string;
  passwordForgottenBtn: string;
  signupBtn: string;
  infoText?: string;
  fixEmailValue?: string;
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onOpenDialog: (dialog: 'passwordForgotten' | 'signup') => void;
}

const LoginCard: React.FC<LoginCardProps> = (props) => {
  const marginBottomClass = "mb-2";

  const [loginData, setLoginData] = useState({
    email: props.fixEmailValue ? props.fixEmailValue : '',
    password: '',
    rememberMe: true,
  });

  useEffect(() => {
    setLoginData(prev => {
      return {
        ...prev,
        email: props.fixEmailValue ? props.fixEmailValue : '',
      }
    })
  }, [props.fixEmailValue])

  const rememberMeCheckbox = <div
    className={clsx("form-check d-flex align-items-center m-0", marginBottomClass)}
  >
    <input
      className="form-check-input cursor-pointer me-2"
      type="checkbox"
      name="rememberMe"
      id={"optionKey"}
      // value={option.key}
      checked={loginData.rememberMe}
      onChange={(event) => {
        const checked = event.target.checked;
        setLoginData(prev => {
          return {
            ...prev,
            rememberMe: checked,
          }
        })
      }}
    />

    <label
      className="form-check-label cursor-pointer w-100"
      htmlFor={"optionKey"}>
      {props.rememberMeLabel}
    </label>
  </div>


  return (
    <div className={props.className}>
      <div className="bg-primary text-white px-3 py-2a">
        <h4 className="fw-bold m-0">{props.title}</h4>
      </div>
      <div className="bg-grey-1 px-3 py-3">
        {props.infoText && props.infoText.length > 0 ?
          <AlertBox
            type="info"
            className={marginBottomClass}
            content={props.infoText}
          /> : null}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit(loginData.email, loginData.password, loginData.rememberMe);
          }}
        >
          <TextField
            id="loginCardEmail"
            label={props.emailInputLabel}
            placeholder={props.emailInputPlaceholder}
            type="email"
            name="email"
            className={marginBottomClass}
            value={loginData.email}
            required={true}
            autoComplete="email"
            disabled={props.fixEmailValue !== undefined && props.fixEmailValue.length > 0}
            onChange={(event) => {
              const value = event.target.value;
              setLoginData(prev => { return { ...prev, email: value } })
            }}
          />
          <TextField
            id="loginCardPassword"
            label={props.passwordInputLabel}
            placeholder={props.passwordInputPlaceholder}
            type="password"
            name="password"
            className={marginBottomClass}
            value={loginData.password}
            required={true}
            autoComplete="off"
            onChange={(event) => {
              const value = event.target.value;
              setLoginData(prev => { return { ...prev, password: value } })
            }}
          />
          {rememberMeCheckbox}
          <div className={marginBottomClass}>
            <button
              className="btn btn-primary"
              disabled={loginData.email.length < 3 || loginData.password.length < 6}
            >{props.loginBtn}</button>
          </div>
          <div className={marginBottomClass}>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
              onClick={(event) => {
                event.preventDefault();
                props.onOpenDialog('passwordForgotten');
              }}
            >{props.passwordForgottenBtn}</button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none text-start text-uppercase"
              onClick={(event) => {
                event.preventDefault();
                props.onOpenDialog('signup');
              }}
            >{props.signupBtn}</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LoginCard;
