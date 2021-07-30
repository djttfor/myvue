import {combineReducers} from 'redux-immutable';
import {reducer as headerReducer} from "../components/Header/store";
import {reducer as homeReducer} from '../pages/home/store';
import banner1 from '../statics/images/banner-1.png';
import banner2 from '../statics/images/banner-2.png';
import banner3 from '../statics/images/banner-3.png';
import banner4 from '../statics/images/banner-4.png';
import list01 from '../statics/images/list_01.png';
import list02 from '../statics/images/list_02.png';
import list03 from '../statics/images/list_03.png';
import list04 from '../statics/images/list_04.png';
import list05 from '../statics/images/list_05.png';
import list06 from '../statics/images/list_06.png';
import list07 from '../statics/images/list_07.png';
import list08 from '../statics/images/list_08.png';
import list09 from '../statics/images/list_09.png';
import list10 from '../statics/images/list_10.png';
import list11 from '../statics/images/list_11.png';
import list12 from '../statics/images/list_12.png';
import list13 from '../statics/images/list_13.png';
import list14 from '../statics/images/list_14.png';


const image = () => {
    return {
        //列表页随机封面图
        ListImg: [
            {img: list01},
            {img: list02},
            {img: list03},
            {img: list04},
            {img: list05},
            {img: list06},
            {img: list07},
            {img: list08},
            {img: list09},
            {img: list10},
            {img: list11},
            {img: list12},
            {img: list13},
            {img: list14},         
        ],
        //首页banner图和内页顶部头图
        bannerList: [
            {img: banner1},
            {img: banner2},
            {img: banner3},
            {img: banner4}    
        ],
    }
};

const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    image: image
});

export default reducer
