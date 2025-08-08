import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import ContentComponent from "@/components/Content";
const Content = () => {
    return (
        <>
            <Helmet>
                <title>Content Ä‘Ã£ thÃ­ch</title>
            </Helmet>
            <ContentComponent />
        </>
    );
};

export default Content;
