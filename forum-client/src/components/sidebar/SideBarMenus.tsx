import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/AppState";
import React, { useEffect } from "react";
import { UserProfileSetType } from "../../store/user/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRegistered } from "@fortawesome/free-solid-svg-icons";

const SideBarMenus = () => {
    const user = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:UserProfileSetType,
            payload: {
                id: 1,
                userName: "testUser",
            },
        });
    }, [dispatch]);

    return (
        <React.Fragment>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="menu-name">
                        {user?.userName}
                    </span>
                </li>
                <li>
                    <FontAwesomeIcon icon={faRegistered} />
                    <span className="menu-name">register</span>
                </li>
            </ul>
        </React.Fragment>
    );
};

export default SideBarMenus;