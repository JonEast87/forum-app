import React, { FC, useReducer, useState } from "react";
import { isPasswordValid, PasswordTestResult } from "../../common/validators/PasswordValidator";
import ReactModal from "react-modal";
import { ModalProps } from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import "./Registration.css";

const Registration: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
    const [isRegisterDisabled, setRegisterDisabled] = useState(true);

    const [ {userName, password, email, passwordConfirm, resultMsg }, dispatch, ] = useReducer(userReducer, {
        userName: "jone",
        password: "",
        email: "admin@jone.com",
        passwordConfirm: "",
        resultMsg: ""
    });

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "userName" });

        if (!e.target.value) allowSubmit(dispatch, "Username cannot be empty", true);
        else allowSubmit(dispatch, "", false);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "email" });

        if (!e.target.value) allowSubmit(dispatch, "Email cannot be empty", true);
        else allowSubmit(dispatch, "", false);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "password" });

        const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

        if (!passwordCheck.isValid) {
            allowSubmit(dispatch, passwordCheck.message, true);
            return;
        }
        passwordsSame(passwordConfirm, e.target.value);
    };

    // this is to validate if the registration is allowed or not based on password input
    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "passwordConfirm" });
        passwordsSame(password, e.target.value);
    };

    // this compares the first password entry and checks it against the second password entry for veracity
    const passwordsSame = (passwordVal: string, passwordConfirmVal: string) => {
        if (passwordVal !== passwordConfirmVal) {
            allowSubmit(dispatch, "Password do not match!", true);
            return false;
        } else {
            allowSubmit(dispatch, "", false);
            return true
        }
    };

    const onClickRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // this is a SPA so the default needs to be prevented or else it breaks the app
        e.preventDefault();
        onClickToggle(e);
    };

    const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClickToggle(e);
    };

    return (
        <ReactModal
            className="modal-menu"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <form>
                <div className="reg-inputs">
                    <div>
                        <label>username</label>
                        <input type="text" value={userName} onChange={onChangeUserName} />
                    </div>
                    <div>
                        <label>email</label>
                        <input type="text" value={email} onChange={onChangeEmail} />
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" placeholder="Password" value={password} onChange={onChangePassword} />
                    </div>
                    <div>
                        <label>password confirm</label>
                        <input type="password" placeholder="Password Confirmation" value={passwordConfirm} onChange={onChangePasswordConfirm} />
                    </div>
                    <div className="reg-buttons">
                        <div className="reg-btn-left">
                            <button style={{ marginLeft: ".5em" }} className="action-btn" disabled={isRegisterDisabled} onClick={onClickRegister}>
                                Register
                            </button>
                            <button style={{ marginLeft: ".5em" }} className="cancel-btn" onClick={onClickCancel}>
                                Close
                            </button>
                        </div>
                    </div>
                    <span className="form-btn-right">
                        <strong>{resultMsg}</strong>
                    </span>
                </div>
            </form>
        </ReactModal>
    );
};

export default Registration;