import React from "react";
import { faLevelUpAlt, faLevelDownAlt, faRandom, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import SelectCustom from "@/components/CategoriesContent/SelectCustom";

const FreqLikeList = [
    {
        name: "Like TÄƒng dáº§n",
        value: "1",
        icon: faLevelUpAlt,
    },
    {
        name: "Like Giáº£m dáº§n",
        value: "2",
        icon: faLevelDownAlt,
    },
    // {
    //   name: "Ngáº«u nhiÃªn",
    //   value: "3",
    //   icon: faRandom,
    // },
];

const initSelect = {
    name: "Chá»n táº§n suáº¥t like ...",
    value: "",
    icon: faThumbsUp,
};

function FreqLikeSelect(props) {
    const { freqLikeToFilter, isDisabledFreqLike, setRelationShipFilter } = props;
    const handleSelected = (selected) => {
        setRelationShipFilter("SORT");
        freqLikeToFilter(selected.value);
    };

    return (
        <div className="flex-grow">
            <SelectCustom
                initSelect={initSelect}
                listSelect={FreqLikeList}
                handleSelected={handleSelected}
                isDisabled={isDisabledFreqLike}
            />
        </div>
    );
}

export default FreqLikeSelect;
