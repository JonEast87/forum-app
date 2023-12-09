import React, { FC } from 'react';
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";
import LeftMenu from "./components/LeftMenu";
import RightMenu from "./components/RightMenu";
import Main from "./components/Main";
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