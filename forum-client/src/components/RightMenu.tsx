import React from "react";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const RightMenu = () => {
    const { width } = useWindowDimensions();
    if (width <= 768) {
        return null;
    }
    return <main className="content">RightMenu</main>;
};

export default RightMenu;