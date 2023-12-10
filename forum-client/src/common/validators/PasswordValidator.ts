// creating interface that is used to return a true or false and message to the user depending on failure
export interface PasswordTestResult {
    message: string,
    isValid: boolean,
}

// length and regexp check to ensure password meets certain standards 
export const isPasswordValid = (password: string): PasswordTestResult => {
    const passwordTestResult: PasswordTestResult = {
        message: "",
        isValid: true
    };

    if (password.length < 8) {
        passwordTestResult.message = "Password must be at least eight characters or longer.";
        passwordTestResult.isValid = false;
        return passwordTestResult;
    }

    // regex to check that at least one special character, capital letter and number exist within
    const strongPassword = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongPassword.test(password)) {
        passwordTestResult.message = "Password must contain at least one special character, one capital letter and one number.";
        passwordTestResult.isValid = false;
    }

    return passwordTestResult;
}    


