import React, { useState } from "react";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
// forgot to import the correct sidebar oof
import SideBarMenus from "./../sidebar/SideBarMenus";
import "./Nav.css";

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { width } = useWindowDimensions();

    const getMobileMenu = () => {
        if (width <= 768) {
            return (
                <FontAwesomeIcon 
                    onClick={onClickToggle}
                    icon={faBars} 
                    size="lg" 
                    className="nav-mobile-menu" 
                />
            );
        }
        return null;
    };

    const onClickToggle = (e: React.MouseEvent<Element, MouseEvent>) => {
        setShowMenu(!showMenu);
    }

    const onRequestClose = (
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => {
        setShowMenu(false);
    };

    return (
        <React.Fragment>
            <ReactModal
                className="modal-menu"
                isOpen={showMenu}
                onRequestClose={onRequestClose}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                >
                    <SideBarMenus />
                </ReactModal>
                <nav>
                    {getMobileMenu()}
                    <strong>Forum</strong>
                </nav>
        </React.Fragment>
    );
};

export default Nav;