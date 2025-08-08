import { useState, useEffect, useRef, useMemo } from 'react';
import React from 'react';
import Select from 'react-select';
import { TextToVideoService } from '@/services/TextToVideo';
import { confirmAlert } from 'react-confirm-alert';
import loadingIcon from '@/assets/images/loading/loading.gif';
import new_icon from '@/assets/images/icon/new_tag.png';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPrompt, setScriptLanguageCode, setScriptLength, setScriptStyle,
  setGenerateMode, setVideoStyle, setTitle, setScript, setClipPace, setScreenRatio,
  setVoiceName, setVoiceLanguage, setMusicTitle, setMusicCate, setIsCaptionVisible,
  setFontName, setFontSize, setFontBold, setFontColor, setVerticalAlignment, setHorizontalAlignment,
  setStrokeWeight, setStrokeColor, setCaptionBackgroundColor, setCaptionBackgroundOpacity, setCaptionBackgroundCorner,
  setLogoFile, setAudioFile, setLogoPosition, setOuttroFile, setOuttroDuration, setIsLoadingGenerateScript
} from '@/store/actions/TextToVideo';
import { setActiveTab } from '@/store/actions/TextToVideo';
import { MODE, STYLES, CLIP_PACE, SCREEN_RATIO, VERTICAL_ALIGNMENT, HORIZONTAL_ALIGNMENT, TABS, FONT_SIZE, LOGO_POSITION } from '@/Ultils';
import { Helmet } from 'react-helmet';
import { FiPlay, FiPause } from 'react-icons/fi';



const TabCreateVideo = ({ handleFetchPendingCompletedVideos, dataVoices, dataFonts, dataLanguages, dataMusics, dataMusicCates, importFonts }) => {
  const dispatch = useDispatch();

  // Web state
  const [isLoadingGenerateVideo, setIsLoadingGenrateVideo] = useState(false);
  const [previewWidth, setpreviewWidth] = useState(150);
  const [previewHeight, setpreviewHeight] = useState(150);
  const [previewClassName, setPreviewClassName] = useState("");
  const [previewStyle, setPreviewStyle] = useState({});
  const [previewBackgroundStyle, setPreviewBackgroundStyle] = useState({});
  const [previewBackgroundImage, setPreviewBackgroundImage] = useState(null);
  const [titleWordCount, setTitleWordCount] = useState(0);
  const [scriptWordCount, setScripWordCount] = useState(0);
  const [audioUrlPlay, setAudioUrlPlay] = useState(null);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const voiceAudioRef = useRef(null);

  const textToVideoState = useSelector((state) => state.textToVideo);

  const {
    isLoadingGenerateScript,
    prompt,
    scriptLanguageCode,
    scriptLength,
    scriptStyle,
    generateMode,
    videoStyle,
    title,
    script,
    clipPace,
    screenRatio,
    voiceName,
    voiceLanguage,
    musicTitle,
    musicCate,
    isCaptionVisible,
    fontName,
    fontSize,
    fontBold,
    fontColor,
    verticalAlignment,
    horizontalAlignment,
    strokeWeight,
    strokeColor,
    captionBackgroundColor,
    captionBackgroundOpacity,
    captionBackgroundCorner,
    logoFile,
    audioFile,
    logoPosition,
    outtroFile,
    outtroDuration,
  } = textToVideoState;

  const handlePromptToScript = async (replaceScriptConfirmed) => {
    if (!prompt) {
      toast.error("Vui lÃ²ng nháº­p Ã½ tÆ°á»Ÿng");
      return;
    }
    if (script && !replaceScriptConfirmed) {
      confirmAlert({
        title: 'Báº¡n sáº½ máº¥t lá»i thoáº¡i bÃªn dÆ°á»›i',
        message: 'Lá»i thoáº¡i má»›i sáº½ Ä‘Æ°á»£c tá»± Ä‘á»™ng thay vÃ o Ã´ nháº­p lá»i thoáº¡i bÃªn dÆ°á»›i, báº¡n cÃ³ muá»‘n tiáº¿p tá»¥c khÃ´ng ?',
        buttons: [
          {
            label: 'CÃ³, tiáº¿p tá»¥c',
            color: 'green',
            onClick: () => handlePromptToScript(true),
          },
          {
            label: 'HUá»¶',
            onClick: () => { },
          },
        ],
        overlayClassName: 'large-confirmation',
      });
    }
    else {
      dispatch(setIsLoadingGenerateScript(true));
      try {
        var res = await TextToVideoService.PromptToScript(prompt, scriptStyle, scriptLength, scriptLanguageCode);
        var new_script = res.data.data.answer;
        dispatch(setScript(new_script));
      }
      finally {
        dispatch(setIsLoadingGenerateScript(false));
      }
    }
  }
  const handleScriptToVideo = async () => {
    if (!script) {
      toast.error("Vui lÃ²ng nháº­p lá»i thoáº¡i");
      return;
    }
    if (scriptWordCount > 1000) {
      toast.error("Há»‡ thá»‘ng chá»‰ nháº­n ká»‹ch báº£n tá»‘i Ä‘a 1,000 tá»«.");
      return;
    }
    setIsLoadingGenrateVideo(true);
    try {

      const settings = {
        "prompt": prompt,
        "style": scriptStyle,
        "clip_source": generateMode,
        "clip_style": videoStyle,
        "title": title,
        "script": script,
        "clip_pace": clipPace,
        "screen_ratio": screenRatio,
        "voice": {
          "name": voiceName,
          "language": voiceLanguage,
          "volume": 100,
        },
        "music": {
          "name": musicTitle,
          "cate": musicCate,
          "volume": 100,
        },
        "caption_visible": isCaptionVisible,
        "font": {
          "name": fontName,
          "size": fontSize,
          "bold": fontBold,
          "color": fontColor,
        },
        "align": {
          "vertical": verticalAlignment,
          "horizontal": horizontalAlignment,
        },
        "stroke": {
          "weight": strokeWeight,
          "color": strokeColor
        },
        "background": {
          "color": captionBackgroundColor,
          "opacity": captionBackgroundOpacity,
          "corner": captionBackgroundCorner
        },
        "logo_position": logoPosition,
        "outtro_duration": outtroDuration,
      };
      const formData = new FormData();
      formData.append("settings", JSON.stringify(settings))
      formData.append("logo", logoFile);
      formData.append("audio", audioFile);
      formData.append("outtro", outtroFile);
      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      };
      var res = await TextToVideoService.RequestGenerateVideo(formData, onUploadProgress);
      if (res.data.success) {
        dispatch(setActiveTab(TABS.PENDING));
        handleFetchPendingCompletedVideos(true);
      }
      else {
        toast.error(res.data.message);
      }
    }
    finally {
      setIsLoadingGenrateVideo(false);
    }
  }
  const handleUploadOuttroFile = async e => {
    if (e.target.files.length <= 0)
      return;

    // Náº¿u lÃ  video thÃ¬ kiá»ƒm tra duration
    const file = e.target.files[0];
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video báº¡n chá»n cÃ³ dung lÆ°á»£ng quÃ¡ lá»›n, vui lÃ²ng chá»n video khÃ¡c dÆ°á»›i 50MB.");
      return;
    }
    if (file.type.startsWith("video")) {
      const url = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");
      let duration = 0;
      try {
        tempVideo.preload = "metadata";
        tempVideo.src = url;
        tempVideo.load();
        while (tempVideo.readyState < 1)
          await new Promise(resolve => setTimeout(resolve, 100));
        duration = tempVideo.duration;
      }
      finally {
        URL.revokeObjectURL(url);
        tempVideo.remove();
      }

      // console.log("Video duration: ", duration);
      // if (duration > 3) {
      //   toast.error(`Video báº¡n chá»n cÃ³ thá»i lÆ°á»£ng ${duration.toFixed(2)} giÃ¢y, vÆ°á»£t quÃ¡ giá»›i háº¡n 3 giÃ¢y.`);
      // }
      // else {
      dispatch(setOuttroDuration(duration));
      dispatch(setOuttroFile(file));
      // }
    }
    // Náº¿u lÃ  hÃ¬nh áº£nh thÃ¬ cháº¥p nháº­n luÃ´n
    else if (file.type.startsWith("image")) {
      dispatch(setOuttroDuration(5));
      dispatch(setOuttroFile(file));
    }
  }

  useEffect(() => {
    handleVoiceChange(voiceName);
  }, [dataVoices])

  /* Xem trÆ°á»›c style caption */
  useEffect(() => {
    setPreviewClassName(`${"text-" + (["xs", "sm", "base", "lg", "xl"])[fontSize - 1]} ${fontBold ? "font-bold " : ""}`);
    setPreviewStyle({
      color: "#" + fontColor,
      fontFamily: fontName,
      WebkitTextStroke: `${strokeWeight * 0.1}px #${strokeColor}`, // Viá»n chá»¯: 2px mÃ u Ä‘en
    });
  }, [fontName, fontSize, fontBold, fontColor, strokeColor, strokeWeight]);

  /* Xem trÆ°á»›c style background */
  useEffect(() => {
    function hexToRgba(hex, opacity) {
      // Loáº¡i bá» kÃ½ tá»± # náº¿u cÃ³
      hex = hex.replace(/^#/, "");

      // TrÆ°á»ng há»£p mÃ£ hex ngáº¯n (3 kÃ½ tá»±) -> Chuyá»ƒn sang dáº¡ng Ä‘áº§y Ä‘á»§ (6 kÃ½ tá»±)
      if (hex.length === 3) {
        hex = hex.split("").map((char) => char + char).join("");
      }

      // Chuyá»ƒn Ä‘á»•i tá»«ng cáº·p kÃ½ tá»± thÃ nh giÃ¡ trá»‹ RGB
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    setPreviewBackgroundStyle({
      borderRadius: ((captionBackgroundCorner - 1) * 25) + "%",
      backgroundColor: hexToRgba(captionBackgroundColor, (captionBackgroundOpacity - 1) / 4),
    })
  }, [captionBackgroundColor, captionBackgroundCorner, captionBackgroundOpacity]);

  /* Xem trÆ°á»›c screen ratio */
  useEffect(() => {
    var base = 16;
    if (screenRatio == SCREEN_RATIO.LANDSCAPE.value) {
      setpreviewHeight(9 * base);
      setpreviewWidth(16 * base);
    } else if (screenRatio == SCREEN_RATIO.PORTRAIT.value) {
      setpreviewHeight(16 * base);
      setpreviewWidth(9 * base);
    }
    else {
      setpreviewHeight(Math.floor((16 + 9) * base / 2));
      setpreviewWidth(Math.floor((16 + 9)) * base / 2);
    }
  }, [screenRatio]);

  /* Äá»•i hÃ¬nh áº£nh ná»n trÃªn vÃ¹ng xem trÆ°á»›c khi Ä‘á»•i cháº¿ Ä‘á»™ Ä‘á»‹nh dáº¡ng video */
  useEffect(() => {
    setPreviewBackgroundImage(Object.values(MODE).filter(x => x.value == generateMode)[0].icon)
  }, [generateMode]);

  /* TÃ­nh sá»‘ tá»« cá»§a script vÃ  title */
  useEffect(() => {
    setScripWordCount((script).split(/\s+/).filter(x => x != '').length);
  }, [script]);
  useEffect(() => {
    setTitleWordCount((title).split(/\s+/).filter(x => x != '').length);
  }, [title]);

  // Chá»n nguá»“n phÃ¡t cho trÃ¬nh phÃ¡t audio
  useEffect(() => {
    let audio_url;
    if (audioFile) {
      audio_url = URL.createObjectURL(audioFile);
    }
    else if (musicTitle) {
      audio_url = dataMusics.filter((music) => music.title == musicTitle)[0]?.url;
    }
    else {
      audio_url = null;
    }
    setAudioUrlPlay(audio_url);
    return () => {
      if (audio_url) {
        URL.revokeObjectURL(audio_url);
      }
    };
  }, [musicCate, musicTitle, audioFile])

  // Reload trÃ¬nh phÃ¡t audio khi dá»¯ liá»‡u audio thay Ä‘á»•i
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrlPlay]);

  const outtroFileURL = useMemo(() => {
    return outtroFile ? URL.createObjectURL(outtroFile) : null;
  }, [outtroFile]);

  // Xá»­ lÃ½ khi chá»n voice má»›i
  const handleVoiceChange = (selectedName) => {
    dispatch(setVoiceName(selectedName));
    const selectedVoice = dataVoices.find(x => x.name === selectedName);
    dispatch(setVoiceLanguage(selectedVoice?.language));
    // Clear object url cÅ© náº¿u cÃ³
    if (voiceAudioUrl) {
      URL.revokeObjectURL(voiceAudioUrl);
      setVoiceAudioUrl(null);
    }
    // Náº¿u cÃ³ audio_url thÃ¬ táº¡o object url má»›i
    if (selectedVoice?.audio_url) {
      setVoiceAudioUrl(selectedVoice.audio_url); // audio_url lÃ  link trá»±c tiáº¿p, khÃ´ng cáº§n createObjectURL
    }
    setIsVoicePlaying(false);
  };

  // Play/Stop voice audio
  const handlePlayVoiceAudio = () => {
    if (!voiceAudioRef.current) return;
    if (isVoicePlaying) {
      voiceAudioRef.current.pause();
      setIsVoicePlaying(false);
    } else {
      voiceAudioRef.current.play();
      setIsVoicePlaying(true);
    }
  };

  // Khi audio káº¿t thÃºc thÃ¬ reset tráº¡ng thÃ¡i
  useEffect(() => {
    if (!voiceAudioRef.current) return;
    const handleEnded = () => setIsVoicePlaying(false);
    voiceAudioRef.current.addEventListener("ended", handleEnded);
    return () => {
      if (voiceAudioRef?.current)
        voiceAudioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [voiceAudioUrl]);

  // Khi Ä‘á»•i voice thÃ¬ stop audio
  useEffect(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
      setIsVoicePlaying(false);
    }
  }, [voiceAudioUrl]);

  return (
    <div>
      <Helmet>
        <link href={importFonts} rel="stylesheet" />
      </Helmet>
      <div className="rounded-lg p-2 mb-4" style={{ background: "#FF9B9B" }}>
        <span className="text-xl font-bold">Vui lÃ²ng háº¡n cháº¿ táº¡o ká»‹ch báº£n vá» má»™t nhÃ¢n váº­t cá»¥ thá»ƒ, sáº£n pháº©m cá»¥ thá»ƒ hay bá»‘i cáº£nh cá»¥ thá»ƒ cÃ³ tháº­t nÃ o Ä‘Ã³, vÃ¬ AI cÃ³ thá»ƒ lÃ m sai lá»‡ch hÃ¬nh áº£nh vá»›i thá»±c táº¿!</span>
      </div>
      {/* BÆ°á»›c 1 - Ã tÆ°á»Ÿng viáº¿t lá»i thoáº¡i */}
      <div className="flex gap-4 items-center">
        <div className="w-2/3">
          <span className="text-2xl font-semibold mb-4">BÆ°á»›c 1 : Táº¡o lá»i thoáº¡i tá»« Ã½ tÆ°á»Ÿng</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-3">
        <div className="flex flex-col col-span-4 justify-end">
          <span className="text-base font-semibold">Ã tÆ°á»Ÿng</span>
          <input
            className="h-10 mt-2 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ã tÆ°á»Ÿng..."
            type="text"
            onChange={(e) => dispatch(setPrompt(e.target.value))}
            value={prompt}
          ></input>
        </div>
        <div className="flex flex-col col-span-2 justify-end">
          <span className="text-base font-semibold">NgÃ´n ngá»¯ lá»i thoáº¡i</span>
          <select className="h-10 mt-2 border rounded-md p-2 text-small"
            value={scriptLanguageCode}
            onChange={(e) => dispatch(setScriptLanguageCode(e.target.value))}>
            {dataLanguages.map((item) => {
              return <option value={item.code}>{`${item.language} (${item.code})`}</option>;
            })}
          </select>
        </div>
        <div className="flex flex-col col-span-2 justify-end">
          <span className="text-base font-semibold">Thá»i lÆ°á»£ng</span>
          <select className="h-10 mt-2 border rounded-md p-2 text-small" onChange={(e) => dispatch(setScriptLength(Math.round(Number(e.target.value))))} value={scriptLength}>
            <option value="50">ngáº¯n hÆ¡n 30 giÃ¢y</option>
            <option value="100">30 - 60 giÃ¢y</option>
            <option value="150">60 - 90 giÃ¢y</option>
          </select>
        </div>
        <div className="flex flex-col col-span-2 justify-end">
          <span className="text-base font-semibold">Phong cÃ¡ch lá»i thoáº¡i</span>
          <select className="h-10 mt-2 border rounded-md p-2 text-small" onChange={(e) => dispatch(setScriptStyle(e.target.value))} value={scriptStyle}>
            <option value="Ká»‹ch tÃ­nh">Ká»‹ch tÃ­nh</option>
            <option value="Buá»“n/Cáº£m Ä‘á»™ng">Buá»“n/Cáº£m Ä‘á»™ng</option>
            <option value="HÃ i hÆ°á»›c">HÃ i hÆ°á»›c</option>
            <option value="BÃ­ áº©n/RÃ¹ng rá»£n">BÃ­ áº©n/RÃ¹ng rá»£n</option>
            <option value="Tá»©c giáº­n/Bá»©c xÃºc">Tá»©c giáº­n/Bá»©c xÃºc</option>
            <option value="Sá»‘c/Báº¥t ngá»">Sá»‘c/Báº¥t ngá»</option>
            <option value="GÃ¢y tranh cÃ£i">GÃ¢y tranh cÃ£i</option>
          </select>
        </div>
        {/* CLICK : Prompt to Script */}
        <div className="flex flex-col col-span-2 justify-end">
          <span className="text-base font-semibold"></span>
          {isLoadingGenerateScript
            ?
            <div className="py-1 px-1 rounded-md bg-blue-500 text-white flex flex-col items-center">
              <img className="h-10 w-16" src={loadingIcon} />
            </div>
            :
            <button className="h-10 text-center text-lg font-bold py-2 px-4 rounded-md cursor-pointer mx-2 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition duration-100" onClick={() => handlePromptToScript()}>
              Táº¡o lá»i thoáº¡i
            </button>
          }
        </div>
      </div>

      {/* BÆ°á»›c 2 - Táº¡o video tá»« script */}
      <div className="mt-6 flex gap-4 items-center w-full">
        {/* Cá»™t 1 */}
        <div className="flex-1 pr-4">
          {/* DÃ²ng 1 */}
          <div className="flex justify-between items-center">
            <div className="w-2/4">
              <span className="text-2xl font-semibold mb-4">BÆ°á»›c 2 : Táº¡o video tá»« lá»i thoáº¡i</span>
            </div>
          </div>
          {/* DÃ²ng 2 */}
          <div className="mt-3">
            <div className="mt-3 flex gap-4 items-center h-12">
              {/* TiÃªu Ä‘á» */}
              <input
                className="w-1/2 border rounded-md p-3 h-full focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="TiÃªu Ä‘á»..."
                type="text"
                onChange={(e) => dispatch(setTitle(e.target.value))}
                value={title}
              ></input>
              <div className="w-1/4 text-left">
                <span className={`text-base font-semibold mb-4 ${titleWordCount > 130 && 'text-red-500'}`}>{titleWordCount > 130 && 'Há»‡ thá»‘ng chá»‰ nháº­n tiÃªu Ä‘á» tá»‘i Ä‘a 130 tá»«. Äá»™ dÃ i hiá»‡n táº¡i : '} {titleWordCount}/130</span>
              </div>
              <div className="w-1/4 text-right">
                <span className={`text-base font-semibold mb-4 ${scriptWordCount > 1000 && 'text-red-500'}`}>{scriptWordCount > 1000 && 'Há»‡ thá»‘ng chá»‰ nháº­n ká»‹ch báº£n tá»‘i Ä‘a 1,000 tá»«. Äá»™ dÃ i hiá»‡n táº¡i : '} {scriptWordCount}/1000</span>
              </div>
            </div>
            {/* Lá»i thoáº¡i */}
            <div className="mt-3 flex gap-4 items-center h-48 relative">
              <textarea
                className="w-full border rounded-md p-3 h-full focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ná»™i dung ká»‹ch báº£n..."
                onChange={(e) => dispatch(setScript(e.target.value))}
                value={script}
                disabled={isLoadingGenerateScript}
              ></textarea>
              {isLoadingGenerateScript && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-md z-10">
                  <img src={loadingIcon} alt="loading" className="h-24" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Cá»™t 2 */}
        <div className="flex-shrink-0 w-auto flex flex-col justify-start">
          {/* DÃ²ng 1 */}
          <div className="text-center mb-4">
            <span className="text-base font-semibold">Tá»‰ lá»‡ vÃ  bá»‘ cá»¥c</span>
          </div>
          {/* DÃ²ng 2 */}
          <div className="w-full h-64 flex items-center">
            {/* Xem trÆ°á»›c */}
            <div className="flex items-center justify-center border border-gray-500">
              <div className={`border border-gray-500 flex ${horizontalAlignment == HORIZONTAL_ALIGNMENT.LEFT.value ? "justify-start"
                : horizontalAlignment == HORIZONTAL_ALIGNMENT.CENTER.value ? "justify-center"
                  : horizontalAlignment == HORIZONTAL_ALIGNMENT.RIGHT.value ? "justify-end" : ""}
                ${verticalAlignment == VERTICAL_ALIGNMENT.TOP.value ? "items-start"
                  : verticalAlignment == VERTICAL_ALIGNMENT.CENTER.value ? "items-center"
                    : verticalAlignment == VERTICAL_ALIGNMENT.BOT.value ? "items-end" : ""}`}
                style={{
                  width: previewWidth + "px",
                  height: previewHeight + "px",
                  backgroundImage: `url(${previewBackgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="p-0.5"
                  style={previewBackgroundStyle}
                >
                  <span
                    className={previewClassName}
                    style={previewStyle}
                  >Phá»¥ Ä‘á»</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6 flex flex-col gap-4 p-5 rounded-md">
        <div className="mt-1 grid grid-cols-5 gap-5 flex flex-col">
          {/* Cá»™t 1 */}
          {/* CÃ i Ä‘áº·t khÃ¡c */}
          <div className="flex flex-col gap-6 col-span-2">
            {/* DÃ²ng 1 */}
            {/* Äá»‹nh dáº¡ng video - Giá»ng Ä‘á»c */}
            <div className="flex gap-4">
              {/* Äá»‹nh dáº¡ng video */}
              <div className="w-1/3">
                <span className="text-base font-semibold">Äá»‹nh dáº¡ng video</span>
                <div className="flex items-center gap-4">
                  <select
                    className="w-64 border rounded-md p-2"
                    onChange={(e) => dispatch(setGenerateMode(Number(e.target.value)))}
                    value={generateMode}
                  >
                    {Object.values(MODE).map((option) => (
                      <option key={option.name} value={option.value}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Giá»ng Ä‘á»c */}
              <div className="w-2/3">
                <span className="text-base font-semibold">Giá»ng Ä‘á»c</span>
                <div className="flex gap-2 items-center w-full">
                  <Select className="w-full"
                    options={dataVoices.map((item) => ({
                      value: item.name,
                      label: item.name,
                      data: item
                    }))}
                    value={dataVoices.find(v => v.name === voiceName) ? {
                      value: voiceName,
                      label: voiceName,
                      data: dataVoices.find(v => v.name === voiceName)
                    } : null}
                    onChange={option => handleVoiceChange(option.value)}
                    formatOptionLabel={option => (
                      <div className="flex items-center hover:bg-gray-300 rounded p-2">
                        <span className="font-semibold">
                          {option.data.language_code === 'vi-VN' ? 'Tiáº¿ng Viá»‡t' : `(${option.data.language})`}
                        </span>
                        <span className="">: {option.data.gender === "MALE" ? "Nam" : "Ná»¯"}</span>
                        <span className="font-normal">- {option.data.name}</span>
                        {option.data.is_new === true && <img src={new_icon} alt="icon" className="inline-block ml-1 w-8 h-4" />}
                      </div>
                    )}
                    styles={{
                      control: (base) => ({ ...base, minHeight: 40, fontSize: 14 }),
                      option: (base, state) => ({ ...base, fontSize: 14, backgroundColor: state.isSelected ? '#e0e7ff' : '#fff', color: '#222' }),
                      singleValue: (base) => ({ ...base, fontSize: 14 })
                    }}
                    placeholder="Chá»n giá»ng Ä‘á»c..."
                    isSearchable={false}
                  />
                  {voiceAudioUrl &&
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 shadow"
                      onClick={handlePlayVoiceAudio}
                      type="button"
                      title={isVoicePlaying ? "Dá»«ng" : "Nghe thá»­"}
                    >
                      {isVoicePlaying ? (
                        <FiPause className="w-8 h-8 text-red-500" />
                      ) : (
                        <FiPlay className="w-8 h-8 text-green-500" />
                      )}
                    </button>
                  }
                  <audio
                    ref={voiceAudioRef}
                    src={voiceAudioUrl}
                    style={{ display: "none" }}
                    onEnded={() => setIsVoicePlaying(false)}
                  />
                </div>
              </div>
            </div>

            {/* DÃ²ng 2 */}
            {/* Tá»‘c Ä‘á»™ chuyá»ƒn cáº£nh - Tá»· lá»‡ khung hÃ¬nh */}
            <div className="flex gap-4">

              {/* Tá»‘c Ä‘á»™ chuyá»ƒn cáº£nh */}
              <div className="w-1/2">
                <span className="text-base font-semibold">Tá»‘c Ä‘á»™ chuyá»ƒn cáº£nh</span>
                <div className="flex gap-4 items-center">
                  <select
                    className="w-64 border rounded-md p-2 text-small"
                    onChange={(e) => dispatch(setClipPace(Number(e.target.value)))}
                    value={clipPace}
                  >
                    {Object.values(CLIP_PACE).map((option) => (
                      <option key={option.value} value={option.value}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tá»· lá»‡ khung hÃ¬nh */}
              <div className="w-1/2">
                <span className="text-base font-semibold">Tá»‰ lá»‡ khung hÃ¬nh</span>
                <div className="flex items-center gap-4">
                  <select
                    className="w-64 border rounded-md p-2"
                    onChange={(e) => dispatch(setScreenRatio(Number(e.target.value)))}
                    value={screenRatio}
                  >
                    {Object.values(SCREEN_RATIO).map((option) => (
                      <option key={option.value} value={option.value}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* DÃ²ng 3 */}
            {/* Hiá»ƒn thá»‹ phá»¥ Ä‘á» */}
            <div className="flex gap-4">
              <div className="flex items-end w-64">
                <div className="w-full border rounded-md p-2 flex items-center">
                  <input type="checkbox" className="form-checkbox w-6 h-6 rounded-md mr-3" onChange={(e) => dispatch(setIsCaptionVisible(Boolean(e.target.checked)))} checked={isCaptionVisible} />
                  <label className="text-gray-700 text-base font-bold mb-1">Hiá»ƒn thá»‹ phá»¥ Ä‘á»</label>
                </div>
              </div>
            </div>

            {/* DÃ²ng 4 */}
            {/* Vá»‹ trÃ­ phá»¥ Ä‘á» - Viá»n phá»¥ Ä‘á» */}
            {isCaptionVisible === true &&
              <div className="flex gap-4">
                {/* Vá»‹ trÃ­ phá»¥ Ä‘á» */}
                <div>
                  {/* <label className="block text-gray-700 font-medium mb-1 text-base">Vá»‹ trÃ­ phá»¥ Ä‘á»</label> */}
                  <span className="text-base font-semibold">Vá»‹ trÃ­ phá»¥ Ä‘á»</span>
                  <div className="flex items-center gap-4">
                    {/* Vertical Alignment */}
                    <select
                      className="pr-8 border rounded-md p-2"
                      onChange={(e) => dispatch(setVerticalAlignment(Number(e.target.value)))}
                      value={verticalAlignment}
                    >
                      <option value={VERTICAL_ALIGNMENT.TOP.value}>Dá»c : TrÃªn</option>
                      <option value={VERTICAL_ALIGNMENT.CENTER.value}>Dá»c : Giá»¯a</option>
                      <option value={VERTICAL_ALIGNMENT.BOT.value}>Dá»c : DÆ°á»›i</option>
                    </select>

                    {/* Horizontal Alignment */}
                    <select
                      className="pr-8 border rounded-md p-2"
                      onChange={(e) => dispatch(setHorizontalAlignment(Number(e.target.value)))}
                      value={horizontalAlignment}
                    >
                      <option value={HORIZONTAL_ALIGNMENT.LEFT.value}>Ngang : TrÃ¡i</option>
                      <option value={HORIZONTAL_ALIGNMENT.CENTER.value}>Ngang : Giá»¯a</option>
                      <option value={HORIZONTAL_ALIGNMENT.RIGHT.value}>Ngang : Pháº£i</option>
                    </select>
                  </div>
                </div>

                {/* Viá»n phá»¥ Ä‘á» */}
                <div>
                  <span className="text-base font-semibold">Viá»n chá»¯ phá»¥ Ä‘á»</span>
                  <div className="flex gap-4 items-center">
                    <span className="text-gray-700 text-base mb-1">Äá»™ dÃ y</span>
                    <select className="w-12 border rounded-md p-2 text-small pl-1" onChange={(e) => dispatch(setStrokeWeight(Number(e.target.value)))} value={strokeWeight}>
                      {Array.from({ length: 9 }, (_, i) => i).map((size) => {
                        return <option key={size} value={size}>{size}</option>;
                      })}
                    </select>
                    {/* <input type="range" min='0' max='8' step='1' className="w-16 border rounded-md p-2" onChange={(e) => dispatch(setStrokeWeight(Number(e.target.value)))} value={strokeWeight} /> */}
                    <span className="text-gray-700 text-base mb-1">MÃ u</span>
                    <input type="color" className="w-10 h-10 border rounded-md pl-1" onChange={(e) => dispatch(setStrokeColor(e.target.value.replace("#", "")))} value={"#" + strokeColor} />
                  </div>
                </div>
              </div>
            }


            {/* DÃ²ng 5 */}
            {/* Font phá»¥ Ä‘á» */}
            {isCaptionVisible === true &&
              <div>
                <span className="text-base font-semibold">Font chá»¯ phá»¥ Ä‘á»</span>
                <div className="flex gap-4 items-center">
                  <select className="w-32 border rounded-md p-2 text-small" onChange={(e) => dispatch(setFontName(e.target.value))} value={fontName}>
                    {dataFonts.map((item) => {
                      return <option key={item} style={{ fontFamily: item }} value={item}>{item}</option>;
                    })}
                  </select>

                  <select className="w-24 border rounded-md p-2 text-small" onChange={(e) => dispatch(setFontSize(Number(e.target.value)))} value={fontSize} >
                    {Object.values(FONT_SIZE).map((option) => (
                      <option key={option.value} value={option.value}>{option.name}</option>
                    ))}
                  </select>
                  <div className="w-32 border rounded-md p-2 flex items-center">
                    <input type="checkbox" className="form-checkbox mr-3 w-6 h-6 rounded-md" onChange={(e) => dispatch(setFontBold(Boolean(e.target.checked)))} checked={fontBold} />
                    <span className="text-gray-700 text-base font-bold mb-1">In Ä‘áº­m</span>
                  </div>
                  <span className="w-8 text-gray-700 text-base mb-1">MÃ u</span>
                  <input type="color" className="w-10 h-10 border rounded-md" onChange={(e) => dispatch(setFontColor(e.target.value.replace("#", "")))} value={"#" + fontColor} />
                </div>
              </div>
            }


            {/* DÃ²ng 6 */}
            {/* Background phá»¥ Ä‘á» */}
            {isCaptionVisible === true &&
              <div className="col-span-3">
                <span className="text-base font-semibold">Background phá»¥ Ä‘á»</span>
                <div className="flex gap-4 items-center">
                  <span className="w-8 text-gray-700 text-base mb-1">MÃ u</span>
                  <input type="color" className="w-10 h-10 border rounded-md" onChange={(e) => dispatch(setCaptionBackgroundColor(e.target.value.replace("#", "")))} value={"#" + captionBackgroundColor} />
                  <span className="text-gray-700 text-base mb-1">Äá»™ Ä‘áº­m</span>
                  <select className="w-20 border rounded-md p-2 text-small pl-1" onChange={(e) => dispatch(setCaptionBackgroundOpacity(Number(e.target.value)))} value={captionBackgroundOpacity}>
                    {Array.from({ length: 5 }, (_, i) => (i + 1)).map((value) => {
                      return <option key={value} value={value}>{(value - 1) * 25}%</option>;
                    })}
                  </select>
                  <span className="text-gray-700 text-base mb-1">Bo trÃ²n</span>
                  <select className="w-20 border rounded-md p-2 text-small pl-1" onChange={(e) => dispatch(setCaptionBackgroundCorner(Number(e.target.value)))} value={captionBackgroundCorner}>
                    {Array.from({ length: 5 }, (_, i) => (i + 1)).map((value) => {
                      return <option key={value} value={value}>{(value - 1) * 25}%</option>;
                    })}
                  </select>
                </div>
              </div>
            }

            {/* DÃ²ng 7 */}
            {/* Upload Logo - Vá»‹ trÃ­ Logo */}
            <div className="flex gap-4">
              {/* Upload Logo */}
              <div className="col-span-3">
                <span className="text-base font-semibold">Upload Logo</span>
                {/* Input file áº©n */}
                <input type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload-logo"
                  onChange={async (e) => {
                    if (e.target.files.length > 0) {
                      dispatch(setLogoFile(e.target.files[0]))
                    }
                  }}
                />
                <div
                  className="relative w-32 h-24 flex items-center rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-200"
                  onClick={() => { if (logoFile != null) dispatch(setLogoFile(null)); else document.getElementById('upload-logo').click() }}
                >
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                    {logoFile ?
                      <img
                        src={URL.createObjectURL(logoFile)}
                        className="w-32 h-24 object-cover"
                      />
                      : <div className="absolute inset-0 bg-gray-400 hover:bg-gray-800 bg-opacity-50 flex items-center justify-center text-black font-bold text-lg rounded-lg">
                        ThÃªm logo
                      </div>
                    }
                  </div>
                  {/* Hiá»‡u á»©ng hover */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gray-800 bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded-lg">
                    {logoFile ? ("Gá»¡ logo") : ("ThÃªm logo")}
                  </div>
                </div>
              </div>
              {/* Vá»‹ trÃ­ Logo */}
              <div>
                {/* <label className="block text-gray-700 font-medium mb-1 text-base">Vá»‹ trÃ­ phá»¥ Ä‘á»</label> */}
                <span className="text-base font-semibold">Vá»‹ trÃ­ Logo</span>
                <div className="flex items-center gap-4">
                  {/* Vertical Alignment */}
                  <select
                    className="pr-8 border rounded-md p-2"
                    onChange={(e) => dispatch(setLogoPosition(Number(e.target.value)))}
                    value={logoPosition}
                  >
                    {Object.values(LOGO_POSITION).map((option) => {
                      return <option value={option.value}>{option.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>


          {/* Cá»™t 2 */}
          {/* Chá»n nháº¡c */}
          <div className="flex flex-col col-span-2">
            {/* Title */}
            <div className="flex">
              <span className="text-base font-semibold">Chá»n nháº¡c ná»n - </span>
              {audioFile ?
                (<div className="ml-3 flex">
                  <h3 className="font-semibold text-base text-green-700">{audioFile.name}</h3>
                  <p className="ml-3 text-base text-gray-500">file upload</p>
                </div>)
                : musicTitle ?
                  (<div className="ml-3 flex">
                    <h3 className="font-semibold text-base">{musicTitle}</h3>
                    <p className="ml-3 text-base text-gray-500">{musicCate}</p>
                  </div>)
                  : (<h3 className="ml-3 font-semibold text-base">ChÆ°a chá»n</h3>)
              }
            </div>

            {/* Audio player */}
            {audioUrlPlay && (
              <div className="mt-3 flex items-center max-w-lg">
                <audio ref={audioRef} controls className="w-3/4 h-8 ml-3 mr-3">
                  <source src={audioUrlPlay} type="audio/mpeg" />
                  TrÃ¬nh duyá»‡t cá»§a báº¡n khÃ´ng há»— trá»£ audio.
                </audio>

                <button
                  className="w-24 h-full text-center text-base font-bold py-2 px-3 rounded-md cursor-pointer mx-2 bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition duration-100"
                  onClick={() => { dispatch(setMusicTitle(null)); dispatch(setMusicCate(null)); dispatch(setAudioFile(null)); }}
                >
                  XoÃ¡
                </button>
              </div>
            )}
            {/* Chá»n danh má»¥c nháº¡c */}
            <div className="mt-3 flex items-center max-w-lg">
              {/* Danh má»¥c nháº¡c */}
              <span className="w-3/12 text-gray-700 text-base text-center mb-1">Danh má»¥c :</span>

              <select className="w-4/12 border rounded-md text-small ml-3 mr-3" onChange={(e) => dispatch(setMusicCate(e.target.value))} value={musicCate} >
                <option value="">Táº¥t cáº£</option>
                {dataMusicCates.map((cate) => (
                  <option value={cate.cate}>{cate.cate_vi}</option>
                ))}
              </select>

              {/* NÃºt upload file nháº¡c */}
              <button
                className="w-5/12 h-full text-center text-base font-bold py-2 px-3 rounded-md cursor-pointer mx-2 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transition duration-100"
                onClick={() => document.getElementById('upload-audio').click()}
              >
                Upload nháº¡c ná»n/MP3
                <input type="file" accept="audio/*" className="hidden" id="upload-audio"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      dispatch(setAudioFile(e.target.files[0]));
                    }
                  }}
                />
              </button>
            </div>

            {/* Danh sÃ¡ch nháº¡c */}
            <div className="mt-3 w-full max-w-lg bg-white shadow-lg rounded-lg p-4 max-h-96 overflow-y-auto">
              {(!musicCate ? dataMusics : dataMusics.filter((music) => music.cate == musicCate)).map((music) => (
                <div className="p-2 w-full flex items-center">
                  <img
                    src={music.thumbnail}
                    alt={music.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="">
                    <div className="ml-3 flex">
                      <h3 className="font-semibold text-base">{music.title}</h3>
                      <p className="ml-3 text-base text-gray-500">{music.cate}</p>
                    </div>
                    <audio controls className="ml-3 mr-3 h-8">
                      <source src={music.url} type="audio/mpeg" />
                      TrÃ¬nh duyá»‡t cá»§a báº¡n khÃ´ng há»— trá»£ audio.
                    </audio>
                  </div>
                  <button
                    className="w-24 h-full text-center text-base font-bold py-2 px-3 rounded-md cursor-pointer mx-2 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition duration-100"
                    onClick={() => { dispatch(setMusicTitle(music.title)); dispatch(setMusicCate(music.cate)); dispatch(setAudioFile(null)); }}
                  >
                    Chá»n
                  </button>
                </div>
              ))}
            </div>

            {/* Upload video hoáº·c áº£nh dÆ°á»›i 50MB */}
            <div className="mt-6 w-full max-w-lg flex flex-col">
              <span className="text-base font-semibold">Upload clip quáº£ng cÃ¡o cá»§a báº¡n cuá»‘i video (tá»‘i Ä‘a 50MB)</span>
              {outtroFile && (
                <div className="mt-3 flex items-center">
                  <span className="w-3/4 text-base text-green-700 font-semibold pr-1">{outtroFile.name} - {outtroDuration?.toFixed(1)}s - {(outtroFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <button
                    className="w-1/4 px-3 py-2 bg-red-500 text-white rounded text-base font-semibold hover:bg-red-600 transition duration-200"
                    onClick={e => { e.stopPropagation(); dispatch(setOuttroFile(null)); }}
                  >XoÃ¡</button>
                </div>
              )}
              <input
                type="file"
                accept="video/*,image/*"
                className="hidden"
                id="upload-outtro"
                onChange={(e) => { handleUploadOuttroFile(e) }}
              />
              <div
                className="mt-3 w-fit h-full flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-200 mt-2 border border-dashed border-gray-400"
                onClick={() => document.getElementById('upload-outtro').click()}
              >
                {outtroFile ?
                  (outtroFile.type.startsWith("video") ? (
                    <video
                      id="outtro-video"
                      src={outtroFileURL}
                      controls
                      style={{ maxHeight: "16rem", maxWidth: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <img
                      src={outtroFileURL}
                      alt={outtroFile.name}
                      style={{ maxHeight: "16rem", maxWidth: "100%", objectFit: "contain" }}
                    />
                  ))
                  : (
                    <span className="text-gray-500 text-sm w-full text-center p-3">Nháº¥n Ä‘á»ƒ chá»n file video hoáº·c áº£nh</span>
                  )}
              </div>
            </div>
          </div>


          {/* Cá»™t 3 */}
          {/* Chá»n phong cÃ¡ch video */}
          <div className="flex flex-col col-span-1">
            {generateMode == MODE.STANDARDSTOCK.value
              ?
              <span className="text-base font-bold text-red-500 italic">
                Phong cÃ¡ch video chá»‰ kháº£ dá»¥ng vá»›i Äá»‹nh dáº¡ng video: áº¢nh hoáº¡t hÃ¬nh AI<br />
                Vui lÃ²ng chá»n láº¡i Ä‘á»ƒ sá»­ dá»¥ng!
              </span>
              :
              <span className="text-base font-semibold text-black">
                Phong cÃ¡ch Video - {!videoStyle ? "ChÆ°a chá»n" : videoStyle}
              </span>
            }
            {/* Danh sÃ¡ch Phong cÃ¡ch */}
            <div
              style={{ maxHeight: "500px" }}
              className={`mt-3 w-full bg-white shadow-lg rounded-lg overflow-y-auto relative ${generateMode === MODE.STANDARDSTOCK.value ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
            >
              {Object.values(STYLES).map((style) => (
                <div className="p-2">
                  <div
                    className={`relative w-full flex items-center rounded-lg cursor-pointer transition-all duration-200 ${videoStyle === style.prompt ? "border-4 border-double border-green-500" : "hover:bg-gray-200"
                      }`}
                    onClick={() => generateMode !== MODE.STANDARDSTOCK.value && dispatch(setVideoStyle(videoStyle === style.prompt ? null : style.prompt))}
                  >
                    {/* áº¢nh phong cÃ¡ch */}
                    <div className="relative w-full h-24 rounded-lg overflow-hidden">
                      <img
                        src={style.picture}
                        alt={style.name}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    {/* TÃªn phong cÃ¡ch */}
                    <div className={`absolute bottom-1 left-1 ${videoStyle == style.prompt ? "bg-green-500" : "bg-black bg-opacity-50"} text-white text-sm px-2 py-1 rounded`}>
                      {style.name}
                    </div>
                    {/* Hiá»‡u á»©ng hover */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gray-800 bg-opacity-50 flex items-center justify-center text-white font-bold text-lg rounded-lg">
                      {videoStyle === style.prompt ? ("Bá» chá»n") : ("Click Ä‘á»ƒ chá»n")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* CLICK : Script to Video */}
        <div className="mt-6 flex justify-between items-center">
          {isLoadingGenerateVideo
            ?
            <div className="w-full h-full flex flex-col items-center py-1 px-1 rounded-md mx-2 bg-blue-500 text-white">
              {progress != 100
                ?
                <span className="mt-2 text-lg font-bold">
                  Äang táº£i dá»¯ liá»‡u lÃªn... {progress}%
                </span>
                :
                <div className="flex items-center">
                  <span className="text-lg font-bold">
                    Äang xá»­ lÃ½...
                  </span>
                  <img className="max-h-16" src={loadingIcon} alt="Loading icon"></img>
                </div>
              }

            </div>
            : <button
              className="w-full h-full text-center text-lg font-bold py-4 rounded-md cursor-pointer mx-2 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transition duration-100"
              onClick={() => handleScriptToVideo()}
            >
              Táº¡o video
            </button>
          }
        </div>
      </div>
    </div>
  );
}
export default TabCreateVideo;




