import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";
import React, { useEffect, useState } from "react";
import { UserProfileSetType } from "../../../store/user/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRegistered, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";

const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const user = useSelector((state: AppState) => state.user);

    const dispatch = useDispatch();

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    }

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    }

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
                    <span onClick={onClickToggleRegister} className="menu-name">
                        register
                    </span>
                    <Registration isOpen={showRegister} onClickToggle={onClickToggleRegister} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span onClick={onClickToggleLogin} className="menu-name">
                        login
                    </span>
                    <Login isOpen={showLogin} onClickToggle={onClickToggleLogin} />
                </li>
            </ul>
        </React.Fragment>
    );
};

export default SideBarMenus;