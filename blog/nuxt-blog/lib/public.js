import Cookies from "js-cookie";

const TokenKey = "hello-blog-token";
const Avatar = "Avatar";

export function getAvatar() {
    return Cookies.get(Avatar);
}

export function setAvatar(url) {
    return Cookies.set(Avatar, url);
}

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}
export const getTime = (time) => {
    const date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() <10 ? '0' + date.getDate() : date.getDate()) + ' ';
    return (Y + M + D)
};

export const getFullTime = (time) => {
    const date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() <10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() <10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return (Y + M + D + h + m + s)
};

const getUnix = () => {
    const date = new Date();
    return date.getTime();
};

const getTodayUnix = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

const getLastDate = (time) => {
    const date = new Date(time);
    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day;
};

export const getFormatTime = (timestamp) => {
    const now = getUnix(); // 当前时间戳
    const today = getTodayUnix(); // 今天0点的时间戳
    const timer = (now - timestamp) / 1000; // 转换为秒级时间戳
    let tip = '';

    if (timer <= 0) {
        tip = "刚刚";
    } else if (Math.floor(timer / 60) <= 0) {
        tip = "刚刚";
    } else if (timer < 3600) {
        tip = Math.floor(timer / 60) + "分钟前";
    } else if (timer >= 3600 && timestamp - today >= 0) {
        tip = Math.floor(timer / 3600) + "小时前";
    } else if (timer / 86400 <= 31) {
        tip = Math.ceil(timer / 86400) + "天前";
    } else {
        tip = getLastDate(timestamp);
    }
    return tip;
};

export const getrand = (m, n) => {
    return Math.floor(Math.random() * (n - m + 1)) + m;
};

export const getRandomNumArr = (m,n,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        let num;
        do{
            num = Math.floor(Math.random() * (n - m + 1)) + m;
        }while(data.indexOf(num)!==-1)
        data.push(num);
    }
    return data;
}


export const scrollAnimation = (currentY, targetY) => {
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY);
        } else {
            window.scrollTo(_currentY, targetY);
        }
    }, 1);
}

export const fixedLineStrLength = (str,length) =>{
    if(!str || str===''){
        return ''
    }
    let newStr = ''
    if(str.length>length){
        newStr = str.substring(0,length) + '\r\n';
        newStr += fixedLineStrLength(str.substring(length),length);
    }else{
        return str;
    }
    return newStr;
}