import React from "react";
import { faLaughWink, faSadTear, faClock, faTextHeight } from "@fortawesome/free-solid-svg-icons";
import SelectCustom from "@/components/CategoriesContent/SelectCustom";

const FreqKeywordList = [
    {
        name: "DÆ°á»›i 20",
        value: "0-20",
        icon: faTextHeight,
    },
    {
        name: "20 - 50",
        value: "20-50",
        icon: faTextHeight,
    },
    {
        name: "50 - 100",
        value: "50-100",
        icon: faTextHeight,
    },
    {
        name: "100 - 200",
        value: "100-200",
        icon: faTextHeight,
    },
    {
        name: "Tá»« 200",
        value: "200-1000000",
        icon: faTextHeight,
    },
];

const initSelect = {
    name: "Sá»‘ tá»« trong bÃ i viáº¿t ...",
    value: "",
    icon: faTextHeight,
};

function FreqNumberKeywordSelect(props) {
    const { freqKeywordFilter, isDisabledFreqTime, setRelationShipFilter } = props;
    const handleSelected = (selected) => {
        setRelationShipFilter("SORT");
        freqKeywordFilter(selected.value);
    };

    return (
        <div className="flex-grow">
            <SelectCustom
                initSelect={initSelect}
                listSelect={FreqKeywordList}
                handleSelected={handleSelected}
                isDisabled={isDisabledFreqTime}
            />
        </div>
    );
}

export default FreqNumberKeywordSelect;
