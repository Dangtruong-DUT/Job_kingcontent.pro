import React from "react";
import { faLaughWink, faSadTear, faClock } from "@fortawesome/free-solid-svg-icons";
import SelectCustom from "./SelectCustom";

const FreqTimeList = [
    {
        name: "Mới nhất",
        value: "2",
        icon: faLaughWink,
    },
    {
        name: "CÅ© nháº¥t",
        value: "1",
        icon: faSadTear,
    },
];

const initSelect = {
    name: "Chá»n thá»i gian ...",
    value: "",
    icon: faClock,
};

function FreqTimeSelect(props) {
    const { freqTimeToFilter, isDisabledFreqTime, setRelationShipFilter } = props;
    const handleSelected = (selected) => {
        setRelationShipFilter("SORT");
        freqTimeToFilter(selected.value);
    };

    return (
        <div className="flex-grow">
            <SelectCustom
                initSelect={initSelect}
                listSelect={FreqTimeList}
                handleSelected={handleSelected}
                isDisabled={isDisabledFreqTime}
            />
        </div>
    );
}

export default FreqTimeSelect;
