import Categories from "@/components/KCEditor/SelectCategories";
import FormularForm from "@/components/KCEditor/FormularPopup/FormularForm";
import { connect } from "react-redux";

const FormularPopup = ({ isShowFormularPopupForm }) => {
    const ShowStateFormularPopupForm = () => {
        return isShowFormularPopupForm && <FormularForm />;
    };

    return <>{ShowStateFormularPopupForm()}</>;
};

const mapStateToProps = (state) => {
    return {
        isShowFormularPopupForm: state.createContent.isShowFormularPopupForm,
    };
};

export default connect(mapStateToProps, {})(FormularPopup);
