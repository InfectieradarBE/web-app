import clsx from 'clsx';
import React from 'react';
import AlertBox from '../displays/AlertBox';
import TextField from '../inputs/TextField';

interface LoginCardProps {
    className?: string;
    title: string;
    loginBtn: string;
    infoText?: string;
}
/*
.dialogHeader {
  font-weight: bold;
  min-width: 200px;
  display: flex;
  height: 68px;
  background-color: theme-color("primary");
  color: theme-color("textColorPrimary");
}*/

const LoginCard: React.FC<LoginCardProps> = (props) => {
    const marginBottomClass = "mb-2"

    const rememberMeCheckbox = <div
        className={clsx("form-check d-flex align-items-center m-0", marginBottomClass)}
    >

        <input
            className="form-check-input cursor-pointer me-2"
            type="checkbox"
            // name={props.parentKey}
            id={"optionKey"}
        // value={option.key}
        // checked={isChecked(option.key ? option.key : 'no key found')}
        // disabled={isDisabled(option)}
        // onChange={handleSelectionChange}
        />

        <label
            className="form-check-label cursor-pointer w-100"
            htmlFor={"optionKey"}>
            {'TODO'}
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
                        type="danger"
                        className={marginBottomClass}
                        content={props.infoText}
                    /> : null}


                <form>
                    <TextField
                        id="test"
                        label="Email"
                        type="email"
                        hasError={true}
                        className={marginBottomClass}
                        placeholder="TODO"
                    />
                    <TextField
                        id="test"
                        label="Email"
                        type="password"
                        className={marginBottomClass}
                        hasError={false}

                    />
                    {rememberMeCheckbox}
                    <div className={marginBottomClass}>
                        <button className="btn btn-primary" >{props.loginBtn}</button>
                    </div>
                    <div className={marginBottomClass}>
                        <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none text-uppercase">{props.loginBtn}</button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none text-uppercase">{props.loginBtn}</button>
                    </div>
                </form>

            </div>

            {/*<div className={clsx(styles.dialogHeader, "px-2 px-sm-3")}>
                <div className={styles.dialogTitle}>

                </div>
            </div>
            <div className={styles.dialogContent}>
                {props.children}
    </div>*/}
        </div>
    );
};

export default LoginCard;
