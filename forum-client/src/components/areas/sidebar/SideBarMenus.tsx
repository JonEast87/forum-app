import React, { useState } from "react";
import { AppState } from "../../../store/AppState";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRegistered, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";
import { Link } from "react-router-dom";

const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const user = useSelector((state: AppState) => state.user);

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    }

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    }

    return (
        <React.Fragment>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="menu-name">
                        <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
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