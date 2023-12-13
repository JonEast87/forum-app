import { Dispatch } from "react";

// same as UserReducer.ts this is moving to so that it can be utilized in multiple end points
export const allowSubmit = (
    dispatch: Dispatch<any>,
    msg: string,
    setDisabled: boolean
    ) => {
    dispatch({ type: "isSubmitDisabled", payload: setDisabled });
    dispatch({ type: "resultMsg", payload: msg });
};
