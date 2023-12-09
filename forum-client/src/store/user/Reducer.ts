// this allows UserProfileReducer to distinguish between from other reducers
export const UserProfileSetType = "USER_PROFILE_SET";

// this is data that will available in our actions later
export interface UserProfilePayload {
    id: string;
    userName: string;
}

// this action type is needed to help distinguish from other action types
export interface UserProfileAction {
    type: string;
    payload: UserProfilePayload | null;
}

// performs filtering based on our desire user type
export const UserProfileReducer = (
    state: any = null,
    action: UserProfileAction
): UserProfilePayload | null => {
    switch (action.type) {
        case UserProfileSetType: 
            return action.payload;
        default:
            return state;
    }
};