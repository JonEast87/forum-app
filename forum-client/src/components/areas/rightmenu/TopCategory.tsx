import React, { FC, useState, useEffect } from "react";
import CategoryThread from "../../../models/CategoryThread";
import "./TopCategory.css";

// stores all of our top categories
interface TopCategoryProps {
    topCategories: Array<CategoryThread>
}

const TopCategory: FC<TopCategoryProps> = ({ topCategories }) => {
    // JSX element will be stored when ready
    const [threads, setThreads] = useState<JSX.Element | undefined>();

    // us getTopCatgories to retrieve them from our array that holds them
    useEffect(() => {
        if (topCategories && topCategories.length > 0) {
            const newThreadElements = topCategories.map(top => 
                <li key={top.threadId}>
                    <span className="clickable-span">
                        {top.title}
                    </span>
                </li>
            );

            setThreads(<ul className="topical-threads">
                {newThreadElements}
            </ul>)
        }
    }, [topCategories]);

    return (
        <div className="topcat-item-container">
            <div>
                <strong>{topCategories[0].category}</strong>
            </div>
            {threads}
        </div>
    );
};

export default TopCategory;