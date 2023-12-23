import React, { FC } from "react";
import { allowSubmit } from "./Helpers";
import {
    isPasswordValid,
    PasswordTestResult,
} from "../../../common/validators/PasswordValidator";

interface PasswordComparisonProps {
    dispatch: React.Dispatch<any>;
    password: string;
    passwordConfirm: string;
}

const PasswordComparison: FC<PasswordComparisonProps> = ({
    dispatch,
    password,
    passwordConfirm
}) => {
    // removed this section of password helpers from Registration since this will be reused outside of registration
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

    return (
        <React.Fragment>
            <div>
                <label>password</label>
                <input type="password" placeholder="Password" value={password}/>
            </div>
            <div>
                <label>password confirmation</label>
                <input type="password" placeholder="Password Confirmation" value={passwordConfirm} onChange={onChangePasswordConfirm}/>
            </div>
        </React.Fragment>
    );
};

export default PasswordComparison;