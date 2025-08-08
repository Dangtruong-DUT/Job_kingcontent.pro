import React, { useState } from "react";
import { FiVideo } from "react-icons/fi";
import Header from "@/components/Trendings/Header";
import SearchBox from "./SearchBox";
import Manage from "./Manage";

const InstagramCpn = (props) => {
    const [totalContents, setTotalContents] = useState(0);

    return (
        <div className="pb-10">
            <Header
                totalTrendingContents={totalContents}
                title="Quáº£n lÃ½ Instagram"
                icon={<FiVideo className="h-7 w-7 text-gray-50 font-semibold" />}
            />
            <SearchBox />
            <Manage />

            {/* <h2 className='text-center text-red-500 uppercase font-bold text-base py-60'>Chá»©c nÄƒng táº¡m báº£o trÃ¬ Ä‘á»ƒ nÃ¢ng cáº¥p vÃ¬ quÃ¡ táº£i ngÆ°á»i dÃ¹ng! Ráº¥t mong nháº­n Ä‘Æ°á»£c sá»± kiÃªn nháº«n cá»§a quÃ½ khÃ¡ch!</h2> */}
        </div>
    );
};

export default InstagramCpn;
