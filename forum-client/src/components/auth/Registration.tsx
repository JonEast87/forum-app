import React, { FC, useReducer, useState } from "react";
import { isPasswordValid } from "../../common/validators/PasswordValidator";


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
    const [isRegisterDisable, setRegisterDisabled] = useState(true);

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

        if (!passwordCheck.message, true) {
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

    
}