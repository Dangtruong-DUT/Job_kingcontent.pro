import { combineReducers } from 'redux';
import searchAndFilterReducer from '@/reducers/Contents/searchAndFilterReducer';
import contentsReducer from '@/reducers/Contents/contentReducer';
import createContentReducer from '@/reducers/editor/createContentReducer';
import editorReducer from '@/reducers/editor/editorReducer';
import PopupContentReducer from '@/reducers/PopupContent/popupContentReducer';
import userReducer from '@/reducers/user/userReducer';
import trendingReducer from '@/reducers/Contents/trendingReducer';
import specialReducer from '@/reducers/Contents/specialReducer';
import homepageReducer from '@/reducers/homepage/homepageReducer';
import SchedulesReducer from '@/reducers/Schedules';
import CategoriesReducer from '@/reducers/Categories';
import HashtagsReducer from '@/reducers/Hashtags';
import ContentUserLikeReducers from '@/reducers/contentUserLike';
import runningAdsReducers from '@/reducers/runningAds';
import tiktokReducers from '@/reducers/tiktok';
import fanpagesReducers from '@/reducers/Fanpages';
import createPostReducers from '@/reducers/createContent';
import loadingReducers from '@/reducers/loadingApp';
import instagramReducers from '@/reducers/instagram';
import douyinReducers from '@/reducers/douyin';
import threadsReducers from '@/reducers/threads/index';
import textToVideo from '@/reducers/textToVideo';
import videoEditorReducer from '@/reducers/videoEditor';

const rootReducer = combineReducers({
  editor: editorReducer,
  createContent: createContentReducer,
  popupContent: PopupContentReducer,
  contents: contentsReducer,
  searchAndFilterContent: searchAndFilterReducer,
  userReducer: userReducer,
  trendings: trendingReducer,
  specialContents: specialReducer,
  homepage: homepageReducer,
  schedules: SchedulesReducer,
  categories: CategoriesReducer,
  hashtags: HashtagsReducer,
  contentUserLike: ContentUserLikeReducers,
  adsRunning: runningAdsReducers,
  tiktoks: tiktokReducers,
  douyins: douyinReducers,
  fanpages: fanpagesReducers,
  createPost: createPostReducers,
  isLoadingApp: loadingReducers,
  instagram: instagramReducers,
  threads: threadsReducers,
  textToVideo: textToVideo,
  videoEditor: videoEditorReducer,
});

export default rootReducer;

