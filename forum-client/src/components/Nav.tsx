import React from "react";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Nav = () => {
    const { width } = useWindowDimensions();
    if (width <= 768) {
        return null;
    }
    return <main className="content">Nav</main>;
};

export default Nav;