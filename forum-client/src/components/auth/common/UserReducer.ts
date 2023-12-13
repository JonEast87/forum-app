// because multiple uses of this reducer will be needed beyond registration the old reducer has been removed from registration.tsx and moved to here with an addition
const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "userName":
            return { ...state, userName: action.payload };
        case "password":
            return { ...state, password: action.payload };
        case "passwordConfirm":
            return { ...state, passwordWord: action.payload };
        case "email":
            return { ...state, email: action.payload };
        case "resultMsg":
            return { ...state, resultMsg: action.payload };
        case "isSubmitDisabled":
            return { ...state, isSubmitDisabled: action.payload };
        default:
            return { ...state, resultMsg: "A failure has occured." };
    }
};

export default userReducer;