import SearchBox from "../../InstagramCpn/SearchBox.jsx";
import { useDispatch } from "react-redux";
import React from "react";
import Manage from "../../InstagramCpn/Manage.jsx";

const Instagram = (props) => {
    const { isAuto = false, handleAddToWaitingList = () => {} } = props;

    return (
        <>
            {/* <h2 className='text-center text-red-500 uppercase font-bold text-base py-32'>Chức năng tạm bảo trì để nâng cấp vì quá tải người dùng! Rất mong nhận được sự kiên nhẫn của quý khách!</h2> */}
            <SearchBox />
            <Manage isSchedule={true} isAuto={isAuto} handleAddToWaitingList={handleAddToWaitingList} />
        </>
    );
};

export default Instagram;
