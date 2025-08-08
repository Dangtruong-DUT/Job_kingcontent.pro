
import style1 from '@/assets/images/art_styles/anime.png';
import style2 from '@/assets/images/art_styles/aztec.png';
import style3 from '@/assets/images/art_styles/chinese_donghua.png';
import style4 from '@/assets/images/art_styles/chinese_ink_painting.png';
import style5 from '@/assets/images/art_styles/cyberpunk.png';
import style6 from '@/assets/images/art_styles/disney_pixar.png';
import style7 from '@/assets/images/art_styles/dreamworks.png';
import style8 from '@/assets/images/art_styles/geometric_style.png';
import style9 from '@/assets/images/art_styles/ghibli.png';
import style10 from '@/assets/images/art_styles/illumination.png';
import style11 from '@/assets/images/art_styles/low_poly.png';
import style12 from '@/assets/images/art_styles/pencil_drawing.png';
import style13 from '@/assets/images/art_styles/pixel_art.png';
import style14 from '@/assets/images/art_styles/sketch.png';
import style15 from '@/assets/images/art_styles/steampunk.png';
import style16 from '@/assets/images/art_styles/synthwave.png';
import style17 from '@/assets/images/art_styles/watercolor.png';
import style18 from '@/assets/images/art_styles/realperson.png';

import VideoGen_Generative_Thumbnail from '@/assets/images/videogen_generative_thumbnail.png';
import VideoGen_IStock_Thumbnail from '@/assets/images/videogen_istock_thumbnail.png';
import { OK } from '@/../configs';
import { TextToVideoService } from '@/../services/TextToVideo';
import { setCompletedTotalCount, setCompletedTotalPage, setLoadingCompleted, setLoadingPending, setVideosCompleted, setVideosPending } from '@/store/actions/TextToVideo';

export const TABS = {
    GENERATE: "GENERATE",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED"
}

export const SCREEN_RATIO = {
    SQUARE: {
        value: 0,
        name: "VuÃ´ng",
    },
    LANDSCAPE: {
        value: 1,
        name: "Ngang",
    },
    PORTRAIT: {
        value: 2,
        name: "Dá»c",
    }
};

export const CLIP_PACE = {
    FAST: {
        value: 1,
        name: "Nhanh",
    },
    MEDIUM: {
        value: 2,
        name: "Vá»«a",
    },
    SLOW: {
        value: 3,
        name: "Cháº­m",
    },
    VERYSLOW: {
        value: 4,
        name: "Ráº¥t cháº­m",
    }
};
export const FONT_SIZE = {
    TINY: {
        value: 1,
        name: "Ráº¥t nhá»",
    },
    SMALL: {
        value: 2,
        name: "Nhá»",
    },
    MEDIUM: {
        value: 3,
        name: "Vá»«a",
    },
    LARGE: {
        value: 4,
        name: "Lá»›n",
    },
    VERYLARGE: {
        value: 5,
        name: "Ráº¥t lá»›n",
    },
}
export const VERTICAL_ALIGNMENT = {
    TOP: {
        value: 1,
        name: "TOP",
    },
    CENTER: {
        value: 2,
        name: "CENTER",
    },
    BOT: {
        value: 3,
        name: "BOT",
    }
}
export const HORIZONTAL_ALIGNMENT = {
    LEFT: {
        value: 1,
        name: "LEFT",
    },
    CENTER: {
        value: 2,
        name: "CENTER",
    },
    RIGHT: {
        value: 3,
        name: "RIGHT",
    }
}
export const MODE = {
    STANDARDSTOCK: {
        name: "ThÆ° viá»‡n iStock",
        value: 0,
        icon: VideoGen_IStock_Thumbnail
    },
    GENERATIVE: {
        name: "áº¢nh hoáº¡t hÃ¬nh AI",
        value: 1,
        icon: VideoGen_Generative_Thumbnail
    },
    // ISTOCK: {
    //   name: "ThÆ° viá»‡n iStock",
    //   value: 2,
    //   icon: VideoGen_IStock_Thumbnail
    // }
}

export const STYLES = {
    REALPERSON: {
        name: "NgÆ°á»i tháº­t",
		prompt: "YÃªu cáº§u phong cÃ¡ch giá»‘ng ngÆ°á»i tháº­t 100%",
        picture: style18,
    },
    ANIME: {
        name: "Hoáº¡t hÃ¬nh Nháº­t Báº£n (Anime)",
		prompt: "Hoáº¡t hÃ¬nh Nháº­t Báº£n (Anime)",
        picture: style1,
    },
    AZTEC: {
        name: "Aztec",
		prompt: "Aztec",
        picture: style2,
    },
    CHINESE_DONGHUA: {
        name: "Hoáº¡t hÃ¬nh Trung Quá»‘c (Donghua)",
		prompt: "Hoáº¡t hÃ¬nh Trung Quá»‘c (Donghua)",
        picture: style3,
    },
    CHINESE_INK_PAINTING: {
        name: "Tranh thuá»· máº·c",
		prompt: "Tranh thuá»· máº·c",
        picture: style4,
    },
    CYBERPUNK: {
        name: "Cyberpunk",
		prompt: "Cyberpunk",
        picture: style5,
    },
    DISNEY_PIXAR: {
        name: "Hoáº¡t hÃ¬nh Disney/Pixar",
		prompt: "Hoáº¡t hÃ¬nh Disney/Pixar",
        picture: style6,
    },
    DREAMWORKS: {
        name: "Hoáº¡t hÃ¬nh DreamWorks",
		prompt: "Hoáº¡t hÃ¬nh DreamWorks",
        picture: style7,
    },
    GEOMETRIC_STYLE: {
        name: "HÃ¬nh há»c (Geometric Style)",
		prompt: "HÃ¬nh há»c (Geometric Style)",
        picture: style8,
    },
    GHIBLI: {
        name: "Hoáº¡t hÃ¬nh Ghibli",
		prompt: "Hoáº¡t hÃ¬nh Ghibli",
        picture: style9,
    },
    ILLUMINATION: {
        name: "Hoáº¡t hÃ¬nh Illumination",
		prompt: "Hoáº¡t hÃ¬nh Illumination",
        picture: style10,
    },
    LOW_POLY: {
        name: "Low Poly",
		prompt: "Low Poly",
        picture: style11,
    },
    PENCIL_DRAWING: {
        name: "Váº½ chÃ¬",
		prompt: "Váº½ chÃ¬",
        picture: style12,
    },
    PIXEL_ART: {
        name: "Nghá»‡ thuáº­t Pixel",
		prompt: "Nghá»‡ thuáº­t Pixel",
        picture: style13,
    },
    SKETCH: {
        name: "PhÃ¡c tháº£o",
		prompt: "PhÃ¡c tháº£o",
        picture: style14,
    },
    STEAMPUNK: {
        name: "Steampunk",
		prompt: "Steampunk",
        picture: style15,
    },
    SYNTHWAVE: {
        name: "Synthwave",
		prompt: "Synthwave",
        picture: style16,
    },
    WATERCOLOR: {
        name: "Tranh mÃ u nÆ°á»›c",
		prompt: "Tranh mÃ u nÆ°á»›c",
        picture: style17,
    },
};

export const LOGO_POSITION = {
    TOP_LEFT: {
        value: 1,
        name: "TrÃªn - TrÃ¡i",
    },
    TOP_RIGHT: {
        value: 2,
        name: "TrÃªn - Pháº£i",
    },
    BOT_LEFT: {
        value: 3,
        name: "DÆ°á»›i - TrÃ¡i",
    },
    BOT_RIGHT: {
        value: 4,
        name: "DÆ°á»›i - Pháº£i",
    }
}


export const parseVideoToPost = (video) => {
    var parsed = {
        post_id: video.id,
        post_text: video.setting.script,
        thumbnail: video.thumbnail_url,
        user_id: video.user_id,
        media_url: video.video_url,
        media_type: "video",
        source_type: "video_ai",
        content_id: video.id,
        videos: [
            video.video_url
        ],
        is_reels: (video.setting.screen_ratio == 2 && video.duration < 90 && video.duration > 0),
    }
    return parsed;
}

export const fetchCompletedVideos = async (dispatch, page, isLoadingEffect) => {
    if (isLoadingEffect) {
        dispatch(setLoadingCompleted(true));
    }
    try {
        const res_completed = await TextToVideoService.getCompletedVideos(page);
        if (res_completed.status == OK) {
            dispatch(setVideosCompleted(res_completed.data.data.data));
            dispatch(setCompletedTotalPage(res_completed.data.data.last_page));
            dispatch(setCompletedTotalCount(res_completed.data.data.total));
        }
    }
    finally {
        if (isLoadingEffect) {
            dispatch(setLoadingCompleted(false));
        }
    }
}


export const fetchPendingVideos = async (dispatch, isLoadingEffect) => {
    if (isLoadingEffect) {
        dispatch(setLoadingPending(true));
    }
    try {
        const res_pending = await TextToVideoService.getPendingVideos();
        if (res_pending.status == OK) {
            dispatch(setVideosPending(res_pending.data.data));
        }
    }
    finally {
        if (isLoadingEffect) {
            dispatch(setLoadingPending(false));
        }
    }
}




