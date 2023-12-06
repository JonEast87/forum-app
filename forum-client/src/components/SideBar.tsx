import React from "react";
import { useWindowDimensions } from "../hooks/useWindowDimensions";


const SideBar = () => {
    const { width } = useWindowDimensions();
    if (width <= 768) {
        return null;
    }
    return <main className="content">SideBar</main>;
};

export default SideBar;