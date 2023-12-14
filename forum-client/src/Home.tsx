import React, { FC } from 'react';
import Nav from "./components/areas/nav/Nav";
import SideBar from "./components/areas/sidebar/SideBar";
import LeftMenu from "./components/areas/leftmenu/LeftMenu";
import RightMenu from "./components/areas/rightmenu/RightMenu";
import Main from "./components/areas/main/Main";
import "./Home.css";

const Home: FC = () => {
    return (
        <div className="screem-root-container home-container">
            <div className="navigation">
                <Nav />
            </div>
            <SideBar />
            <LeftMenu />
            <Main />
            <RightMenu />
        </div>
    );
};

export default Home;