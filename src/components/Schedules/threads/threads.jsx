import React from "react";
import SearchBox from "../../Threads/SearchBox.jsx";
import Manage from "../../Threads/Manage.jsx";

const Threads = (props) => {
    const { isAuto = false, handleAddToWaitingList = () => {} } = props;

    return (
        <>
            <SearchBox isSchedule={true} />
            <Manage isSchedule={true} isAuto={isAuto} handleAddToWaitingList={handleAddToWaitingList} />
        </>
    );
};

export default Threads;
