import React from "react";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SelectCustom from "@/components/CategoriesContent/SelectCustom";

const ByCommentList = [
    {
        name: "DÆ°á»›i 20",
        value: "0-20",
        icon: faComment,
    },
    {
        name: "Tá»« 21 - 50",
        value: "21-50",
        icon: faComment,
    },
    {
        name: "Tá»« 50 - 100",
        value: "50-100",
        icon: faComment,
    },
    {
        name: "Tá»« 100 - 300",
        value: "100-300",
        icon: faComment,
    },
    {
        name: "Tá»« 300 - 1000",
        value: "300-1000",
        icon: faComment,
    },
    {
        name: "TrÃªn 1000",
        value: "1000-10000000",
        icon: faComment,
    },
];

const initSelect = {
    name: "Chá»n sá»‘ lÆ°á»£t comment ...",
    value: "",
    icon: faComment,
};

function ByCommentSelect(props) {
    const { numsCommentToFilter, setRelationShipFilter } = props;
    const handleSelected = (selected) => {
        setRelationShipFilter("FILTER");
        numsCommentToFilter(selected.value);
    };

    return (
        <div className="flex-grow">
            <SelectCustom initSelect={initSelect} listSelect={ByCommentList} handleSelected={handleSelected} />
        </div>
    );
}

export default ByCommentSelect;
