// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./containers/PrivateRoute";
import Layout from "@/components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Home from "./pages/Home.jsx";
import CategoriesPage from "./pages/CategoriesPage";
import Fanpages from "./pages/Fanpages.jsx";
import Collections from "./pages/Collections.jsx";
import Editor from "./pages/createPost/Editor.jsx";
import CategoriesContent from "./components/CategoriesContent/index.jsx";
import Trendings from "./pages/Trendings.jsx";
import Schedules from "./pages/Schedules";
import Interactions from "./pages/Interactions";
import ContentLiked from "./pages/ContentLiked";
import SpecialFollow from "./pages/SpecialFollow";
import Content from "./pages/content/Content";
import RunningAds from "./pages/RunningAds";
import Tiktok from "./pages/Tiktok/Tiktok.jsx";
import Douyin from "./pages/Douyin/Douyin.jsx";
import Instagram from "./pages/Instagram/Instagram.jsx";
import FanpagesListPage from "./pages/fanpagesList";
import CreatePost from "./pages/createPost/CreatePost";
import CreateLabelAdmin from "./pages/createLabelAdmin";
import Account from "./pages/account";
import PhotoEditor from "./pages/createPost/components/photoeditor.jsx";
import noLoginPage from "./pages/noLoginPage";
import activationPage from "./pages/activationPage.jsx";
import Threads from "./pages/Threads/Threads.jsx";
import privacy from "./pages/privacy";
import termConditions from "./pages/termConditions";
import topFanPages from "./pages/topFanPages";
import TextToVideo from "./pages/TextToVldeo/TextToVideo.jsx";
import VideoList from "./pages/VideoEditor/VideoEditor";
import NoVip3Page from "./pages/NoVip3Page";
// import SuggestionsPopup from './components/Schedules/Popups/SuggestionsPopup';

class Routers extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/dang-nhap" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dang-xuat" component={Logout} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/chua-kich-hoat" component={noLoginPage} />
                    <Route exact path="/chua-kich-hoat-vip3" component={NoVip3Page} />
                    <Route exact path="/yeu-cau-kich-hoat" component={activationPage} />
                    <Route exact path="/chinh-sach-bao-mat" component={privacy} />
                    <Route exact path="/huong-dan-su-dung" component={termConditions} />
                    <Route exact path="/bang-xep-hang" component={topFanPages} />
                    <Layout>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/danh-muc/:slug/:id" component={CategoriesContent} />
                        <PrivateRoute exact path="/dang-thinh-hanh" component={Trendings} />
                        <PrivateRoute exact path="/nhieu-tuong-tac" component={Interactions} />
                        <PrivateRoute exact path="/lich-dang-bai" component={Schedules} />
                        <PrivateRoute exact path="/danh-muc-content" component={CategoriesPage} />
                        <PrivateRoute exact path="/danh-muc-fanpage" component={Fanpages} />
                        <PrivateRoute exact path="/bo-suu-tap-content" component={Collections} />
                        <PrivateRoute exact path="/tao-content" component={CreatePost} />
                        <PrivateRoute exact path="/tao-content-old" component={Editor} />
                        <PrivateRoute exact path="/y-tuong-da-luu" component={ContentLiked} />
                        <PrivateRoute exact path="/theo-doi-dac-biet" component={SpecialFollow} />
                        <PrivateRoute exact path="/content-da-thich" component={Content} />
                        <PrivateRoute exact path="/dang-chay-ads" component={RunningAds} />
                        <PrivateRoute exact path="/quan-ly-tiktok" component={Tiktok} />
                        <PrivateRoute exact path="/quan-ly-douyin" component={Douyin} />
                        <PrivateRoute exact path="/quan-ly-threads" component={Threads} />
                        <PrivateRoute exact path="/quan-ly-instagram" component={Instagram} />
                        <PrivateRoute exact path="/danh-sach-page" component={FanpagesListPage} />
                        <PrivateRoute exact path="/tao-bai-viet" component={CreatePost} />
                        <PrivateRoute exact path="/text-to-video" component={TextToVideo} />
                        <PrivateRoute exact path="/video-editor" component={VideoList} />
                        <PrivateRoute exact path="/admin/nhan-tao-san" component={CreateLabelAdmin} />
                        <PrivateRoute exact path="/chinh-sua-anh" component={PhotoEditor} />
                        <PrivateRoute exact path="/user-info" component={Account} />
                    </Layout>
                </Switch>
            </Router>
        );
    }
}

export default Routers;
