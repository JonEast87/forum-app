import React, { FC, useReducer, useState } from "react";
import { isPasswordValid, PasswordTestResult } from "../../common/validators/PasswordValidator";
import ReactModal from "react-modal";

const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "userName":
            return { ...state, userName: action.payload };
        case "password":
            return { ...state, password: action.payload };
        case "passwordConfirm":
            return { ...state, passwordConfirm: action.payload };
        case "email":
            return { ...state, email: action.payload };
        case "resultMag":
            return { ...state, resultMsg: action.payload };
        default:
            return { ...state, resultMag: "A failure has occured." };
    }
};

export interface RegistrationProps {
    isOpen: boolean;
    onClickToggle: (
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
     ) => void;
}

const Registration: FC<RegistrationProps> = ({ isOpen, onClickToggle }) => {
    const [isRegisterDisabled, setRegisterDisabled] = useState(true);

    const [ {userName, password, email, passwordConfirm, resultMsg }, dispatch, ] = useReducer(userReducer, {
        userName: "jone",
        password: "",
        email: "admin@jone.com",
        passwordConfirm: "",
        resultMsg: ""
    });

    const allowRegister = (msg: string, setDisabled: boolean) => {
        setRegisterDisabled(setDisabled);
        dispatch({ payload: msg, type: "resultMsg" });
    };

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "userName" });

        if (!e.target.value) allowRegister("Username cannot be empty", true);
        else allowRegister("", false);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "email" });

        if (!e.target.value) allowRegister("Email cannot be empty", true);
        else allowRegister("", false);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "password" });

        const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

        if (!passwordCheck.isValid) {
            allowRegister(passwordCheck.message, true);
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
            allowRegister("Password do not match!", true);
            return false;
        } else {
            allowRegister("", false);
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
            className="modal-name"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
        >
            <form>
                <div className="reg-inputs">
                    <div>
                        <label>username</label>
                        <input type="text" value={userName} onChange={onChangeUserName} />
                    </div>
                    <div>
                        <label>email</label>
                        <input type="text" value={userName} onChange={onChangeEmail} />
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
                </div>
            </form>
        </ReactModal>
    );
};

export default Registration;