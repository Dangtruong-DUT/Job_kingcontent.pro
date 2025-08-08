import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { Button, Checkbox, DatePicker, Input, Radio, RadioGroup } from 'rsuite';
// import 'rsuite/dist/styles/rsuite-default.min.css';
import './styles.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';
import AutoComments from '@/AutoComments';
import { CalendarLocaleVn } from '@/../../helpers/date';

const listTypeHasReels = ['tiktok', 'instagram', 'threads', 'douyin', 'user', 'video_editor', 'video_ai'];

const postPerDayOptions = [];
for (let index = 1; index <= 50; index++) {
  postPerDayOptions.push({
    label: index,
    value: index,
  });
}

const buildListHours = (max) => {
  const listHours = [];
  // each 0.5 hour (30 minutes)
  for (let index = 0.5; index <= max; index += 0.5) {
    const hours = Math.floor(index);
    const minutes = (index % 1) * 60;
    const label =
      minutes === 0
        ? `${hours} giá»`
        : `${hours > 0 ? hours + ' giá» ' : ''}${minutes} phÃºt`;
    listHours.push({
      label: label,
      value: index * 60, // value in minutes
    });
  }
  // add 15 minutes at first
  listHours.unshift({
    label: '15 phÃºt',
    value: 15,
  });
  return listHours;
};

const Settings = (props) => {
  const { localSettings, onChangedLocalSettings } = props;

  const [isShowBody, setIsShowBody] = useState(false);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [postPerDay, setPostPerDay] = useState(null);
  const [timeSpace, setTimeSpace] = useState(120);
  const [sourceType, setSourceType] = useState('');
  console.log('ðŸš€ ~ Settings ~ sourceType:', sourceType)
  const [isReels, setIsReels] = useState(0);
  const [listSearchReplace, setListSearchReplace] = useState([]);
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [summaryMessage, setSummaryMessage] = useState('');
  const [canBeReels, setCanBeReels] = useState(false);

  // @ts-ignore
  const { autoWaitingList = null } = useSelector((state) => state.schedules);

  useEffect(() => {
    if(sourceType){
      let canBeReels = false;
      if(listTypeHasReels.includes(sourceType)){
        canBeReels = true;
      }
      // check all autoWaitingList?.contents has is_reels = 1
      if(sourceType === 'user' && autoWaitingList?.contents){
        const isReels = autoWaitingList?.contents?.every(content => content?.is_reels === 1 || content?.is_reels === true);
        if(isReels){
          canBeReels = true;
        }else{
          canBeReels = false;
        }
      }
      setCanBeReels(canBeReels);
    }else{
      setCanBeReels(false);
    }
  }, [sourceType, autoWaitingList.contents]);

  const onClickShowBody = () => {
    setIsShowBody((state) => !state);
  };

  const onChangeBeforeAfter = (type, value) => {
    switch (type) {
      case 'before':
        onChangedLocalSettings('before_content', value);
        break;

      case 'after':
        onChangedLocalSettings('after_content', value);
        break;
    }
  };

  const onDateChanged = (type, date) => {
    // change to update localSettings
    onChangedLocalSettings(type, moment(date).format('YYYY-MM-DD'));
  };

  const onTimeChanged = (date) => {
    onChangedLocalSettings('start_time', moment(date).format('HH:mm'));
  };

  const onChangePostPerDay = (value) => {
    onChangedLocalSettings('post_per_day', value);
  };

  const onChangeTimeSpace = (value) => {
    onChangedLocalSettings('time_space', value);
  };

  const onChangeVideoType = (value) => {
    onChangedLocalSettings('is_reels', value);
  };

  const onChangeRandom = (type, checked) => {
    switch (type) {
      case 'emoji':
        onChangedLocalSettings('is_random_emojies', checked);
        break;

      case 'character':
        onChangedLocalSettings('is_random_characters', checked);
        break;

      case 'text':
        onChangedLocalSettings('is_remove_contents', checked);
        break;

      case 'hashtag':
        onChangedLocalSettings('remove_all_hashtags', checked);
        break;

      case 'isAddSource':
        onChangedLocalSettings('is_add_source', checked);
        break;

      case 'isRandomCharactersComment':
        onChangedLocalSettings('is_random_characters_comment', checked);
        break;

      case 'isRandomEmojisComment':
        onChangedLocalSettings('is_random_emojies_comment', checked);
        break;

      case 'isAutoComment':
        onChangedLocalSettings('is_auto_comment', checked);
        break;
    }
  };

  const onChangeSearchReplace = (type, value) => {
    if (type === 'search') setSearch(value);
    else setReplace(value);
  };

  const onAddSearchReplace = () => {
    if (!search || !replace) {
      toast.error('Vui lÃ²ng nháº­p tá»« khoÃ¡ tÃ¬m kiáº¿m vÃ  thay tháº¿');
    } else {
      // push to list
      listSearchReplace.push({
        search: search,
        replace: replace,
      });
      onChangedLocalSettings('search_replace', listSearchReplace);
      //reset
      setSearch('');
      setReplace('');
    }
  };

  const onRemoveSearchReplace = (index) => {
    // push to list
    const newList = listSearchReplace.reduce((acc, item, key) => {
      if (key !== index) acc.push(item);
      return acc;
    }, []);
    onChangedLocalSettings('search_replace', newList);
  };

  useEffect(() => {
    if (localSettings) {
      const {
        start_date = new Date(),
        start_time = new Date(),
        post_per_day = null,
        time_space = 120,
        source_type = '',
        is_reels = 0,
        search_replace = [],
      } = localSettings;

      const startDate = new Date(start_date);
      // @ts-ignore
      setStartDate(startDate);
      setStartTime(start_time);
      setPostPerDay(post_per_day);
      setTimeSpace(time_space);
      setSourceType(source_type);
      setIsReels(is_reels);
      setListSearchReplace(search_replace);
    } else {
      // @ts-ignore
      setStartDate(new Date());
      // @ts-ignore
      setStartTime(new Date());
      setPostPerDay(null);
      setTimeSpace(120);
      setSourceType('');
      setIsReels(0);
      setListSearchReplace([]);
    }
  }, [localSettings]);

  useEffect(() => {
    if (
      autoWaitingList?.contents?.length > 0 &&
      postPerDay &&
      startDate &&
      startTime
    ) {
      const totalContents = autoWaitingList?.contents?.length || 0;
      const totalDays = Math.ceil(totalContents / postPerDay);
      const endDate = moment(startDate).add(totalDays, 'days');
      const summaryMessage = `Há»‡ thá»‘ng sáº½ Ä‘Äƒng liÃªn tá»¥c ${totalContents} bÃ i viáº¿t trong ${totalDays} ngÃ y, báº¯t Ä‘áº§u tá»« ngÃ y ${moment(
        startDate
      ).format('DD-MM-YYYY')} Ä‘áº¿n ngÃ y ${endDate.format('DD-MM-YYYY')}`;
      setSummaryMessage(summaryMessage);
    } else {
      setSummaryMessage('');
    }
  }, [autoWaitingList, postPerDay, startDate, startTime]);

  return (
    <div className="settingsContainer overflow-hidden text-black  text-sm">
      <div
        className="title p-3 font-bold text-base uppercase mb-2 cursor-pointer border rounded-md flex items-center"
        onClick={() => onClickShowBody()}
      >
        <h5>LÃªn thá»i khoÃ¡ biá»ƒu</h5>
        {isShowBody ? (
          <FaAngleUp className="ml-auto" />
        ) : (
          <FaAngleDown className="ml-auto" />
        )}
      </div>
      <div
        className={`body transition-all duration-300 ease-in-out space-y-5 ${
          isShowBody ? 'h-auto p-3 border' : 'h-0'
        }`}
      >
        <div className="summary my-2">
          <span>Sá»‘ bÃ i viáº¿t Ä‘Ã£ chá»n: </span>
          <span className="font-bold">
            {autoWaitingList?.contents?.length || 0}
          </span>
        </div>
        {/* ROW day range */}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">Chá»n ngÃ y:</h5>
          <div className="w-2/3 my-2 grid grid-cols-2">
            <div className="startDate flex items-center gap-2">
              <Label htmlFor="startDate" className="whitespace-nowrap">
                NgÃ y báº¯t Ä‘áº§u:
              </Label>
              <DatePicker
                format="DD-MM-YYYY"
                defaultValue={new Date()}
                locale={CalendarLocaleVn}
                isoWeek={true}
                className="w-1/2"
                value={startDate}
                onChange={(date) => onDateChanged('start_date', date)}
              />
            </div>
            <div className="flex gap-2 items-center flex-nowrap">
              <Label className="whitespace-nowrap">
                Thá»i gian báº¯t Ä‘áº§u Ä‘Äƒng má»—i ngÃ y:
              </Label>
              <DatePicker
                format="HH:mm"
                ranges={[]}
                style={{ width: 160 }}
                className="w-2/3"
                defaultValue={startTime}
                onChange={(date) => onTimeChanged(date)}
              />
            </div>
          </div>
        </div>

        {/* ROW post per day */}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">Chá»n sá»‘ lÆ°á»£ng bÃ i viáº¿t má»—i ngÃ y:</h5>
          <Select
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4"
            onChange={(selected) => onChangePostPerDay(selected.value)}
            options={postPerDayOptions}
            placeholder="--- Chá»n sá»‘ lÆ°á»£ng ---"
            defaultValue={postPerDay}
          />
        </div>

        {/* ROW temp summary */}
        {summaryMessage ? (
          <div className="settingRow my-2 flex gap-2 items-center">
            <h5 className="font-bold w-1/3">Thá»‘ng kÃª táº¡m thá»i:</h5>
            <p className="text-black font-bold">{summaryMessage}</p>
          </div>
        ) : null}

        {/* ROW time space */}
        <div className="settingRow my-2">
          <div className="flex gap-2 flex-nowrap items-center">
            <h5 className="font-bold w-1/3">Thá»i gian Ä‘Äƒng giÃ£n cÃ¡ch:</h5>
            <Select
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4"
              // @ts-ignore
              onChange={(selected) => onChangeTimeSpace(selected.value)}
              // @ts-ignore
              options={buildListHours(24)}
              placeholder="--- Chá»n thá»i gian ---"
              defaultValue={timeSpace}
            />
            <p className="notice text-red-500 w-1/3 ml-auto">
              Khuyáº¿n cÃ¡o: Chá»‰ nÃªn Ä‘Äƒng 3-4 bÃ i / ngÃ y, má»—i bÃ i cÃ¡ch nhau 3-4 giá»
              Ä‘á»ƒ cÃ³ hiá»‡u quáº£ tá»‘t nháº¥t
            </p>
          </div>
        </div>

        {/* ROW is add Source from when publish */}
        <div className="rowIsAddSource settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">
            Chá»n Ä‘á»ƒ tá»± Ä‘á»™ng thÃªm Nguá»“n bÃ i viáº¿t á»Ÿ cuá»‘i
          </h5>
          <div className="w-2/3 grid items-center">
            <Checkbox
              name="isAddSource"
              value={1}
              defaultChecked={true}
              // @ts-ignore
              onChange={(value, checked) =>
                onChangeRandom('isAddSource', checked)
              }
            >
              KÃ­ch hoáº¡t
            </Checkbox>
          </div>
        </div>

        {canBeReels && (
          <div className="rowIsReels settingRow my-2 flex gap-2 items-center">
            <h5 className="font-bold w-1/3">
              HÃ¬nh thá»©c Ä‘Äƒng: (chá»‰ dÃ nh cho bÃ i viáº¿t dáº¡ng video)
            </h5>
            <RadioGroup
              name="isReels"
              className="flex flex-nowrap gap-2 justify-between items-center w-1/3"
              onChange={(value) => onChangeVideoType(value)}
              value={isReels}
            >
              <Radio value={0} className="w-full whitespace-nowrap">
                ÄÄƒng thÆ°á»ng
              </Radio>
              <Radio value={1} className="w-full whitespace-nowrap">
                ÄÄƒng Reels
              </Radio>
            </RadioGroup>
          </div>
        )}

        {/* ROW random character and emoji*/}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">
            ThÃªm ngáº«u nhiÃªn vÃ o cuá»‘i bÃ i viáº¿t:
          </h5>
          <div className="w-1/3 grid grid-cols-2 items-center">
            <Checkbox
              name="randomCharacters"
              value={1}
              defaultChecked={true}
              // @ts-ignore
              onChange={(value, checked) =>
                onChangeRandom('character', checked)
              }
            >
              3-5 KÃ½ tá»±
            </Checkbox>
            <Checkbox
              name="randomEmojies"
              defaultChecked={true}
              value={1}
              // @ts-ignore
              onChange={(value, checked) => onChangeRandom('emoji', checked)}
            >
              3-5 Biá»ƒu tÆ°á»£ng
            </Checkbox>
          </div>
        </div>

        {/* ROW before content */}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">
            ThÃªm ná»™i dung vÃ o Ä‘áº§u cá»§a toÃ n bá»™ bÃ i viáº¿t:
          </h5>
          <div className="w-2/3 grid grid-cols-2 items-center">
            <Input
              componentClass="textarea"
              rows={3}
              placeholder="Ná»™i dung Ä‘áº§u bÃ i viáº¿t...."
              onChange={(value) => onChangeBeforeAfter('before', value)}
            />
          </div>
        </div>

        {/* ROW after content */}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">
            ThÃªm ná»™i dung vÃ o cuá»‘i cá»§a toÃ n bá»™ bÃ i viáº¿t:
          </h5>
          <div className="w-2/3 grid grid-cols-2 items-center">
            <Input
              componentClass="textarea"
              rows={3}
              placeholder="Ná»™i dung cuá»‘i bÃ i viáº¿t...."
              onChange={(value) => onChangeBeforeAfter('after', value)}
            />
          </div>
        </div>

        {/* ROW advance settings */}
        <div className="settingRow my-2 flex gap-2 items-center">
          <h5 className="font-bold w-1/3">XoÃ¡ ná»™i dung gá»‘c:</h5>
          <div className="w-2/3 grid grid-cols-2 items-center">
            <Checkbox
              name="removeOldContent"
              value={1}
              // @ts-ignore
              onChange={(value, checked) => onChangeRandom('text', checked)}
            >
              Chá»n Ä‘á»ƒ xoÃ¡ toÃ n bá»™ ná»™i dung á»Ÿ bÃ i gá»‘c
            </Checkbox>
            <Checkbox
              name="removeHashtag"
              value={1}
              // @ts-ignore
              onChange={(value, checked) => onChangeRandom('hashtag', checked)}
            >
              Chá»n Ä‘á»ƒ xoÃ¡ toÃ n bá»™ hashtag á»Ÿ bÃ i gá»‘c
            </Checkbox>
          </div>
        </div>

        {/* ROW search and replace */}
        <div className="settingRow my-2 flex gap-2">
          <div className="w-1/3">
            <h5>
              <span className="font-bold">TÃ¬m kiáº¿m vÃ  thay tháº¿:</span> (Thay tháº¿
              tá»« cÃ³ sáºµn á»Ÿ bÃ i viáº¿t gá»‘c thÃ nh tá»« má»›i cá»§a báº¡n)
            </h5>
            <p className="italic">
              VÃ­ dá»¥: BÃ i viáº¿t gá»‘c cÃ³ SÄT lÃ  A, báº¡n cÃ³ thá»ƒ sá»­a tá»± Ä‘á»™ng thÃ nh B
              trÃªn hÃ ng loáº¡t bÃ i viáº¿t gá»‘c
            </p>
          </div>

          <div className="inputs w-1/3">
            <Input
              name="search"
              className="w-full mb-2"
              placeholder="TÃ¬m kiáº¿m ..."
              value={search}
              onChange={(value) => onChangeSearchReplace('search', value)}
            />
            <Input
              name="replace"
              className="w-full mb-2"
              placeholder="Thay tháº¿ ..."
              value={replace}
              onChange={(value) => onChangeSearchReplace('replace', value)}
            />
            <Button
              className="bg-blue-700 text-white rounded-lg p-2"
              onClick={onAddSearchReplace}
            >
              ThÃªm vÃ o danh sÃ¡ch
            </Button>
          </div>
          {listSearchReplace && listSearchReplace.length > 0 && (
            <div className="results w-1/3 max-h-24 overflow-y-auto">
              <h6>Danh sÃ¡ch tá»« khoÃ¡ tÃ¬m kiáº¿m / thay tháº¿:</h6>
              {listSearchReplace.map((item, idx) => {
                const { search = '', replace = '' } = item;
                return (
                  <div
                    key={idx}
                    className="flex gap-2 flex-nowrap items-center"
                  >
                    <span className="w-1/12">{`-`}</span>
                    <span className="w-5/12 line-through">{search}</span>
                    <span className="w-1/12">{`-->`}</span>
                    <span className="w-5/12 font-bold">{replace}</span>
                    <span className="w-1/12 cursor-pointer text-center">
                      <FiX
                        size={25}
                        color="red"
                        onClick={() => onRemoveSearchReplace(idx)}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* ROW auto comments */}
        <AutoComments
          onChangeRandom={onChangeRandom}
          localSettings={localSettings}
          onChangedLocalSettings={onChangedLocalSettings}
        />
      </div>
    </div>
  );
};

export default Settings;

