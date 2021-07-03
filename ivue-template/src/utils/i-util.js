export function formatLocalDate(date) {
  if (!date) {
    return ''
  }
  const split = date.split('T')
  return split[0] + ' ' + split[1]
}

 //根据双方的id生成消息会话id
export function generateSessionKey(userId,friendId){
  if(userId>friendId){
    return friendId+'+'+userId
  }else{
    return userId+'+'+friendId
  }
}
function _strMapToObj(strMap){
  let obj= Object.create(null);
  for (let[k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

export function mapToJson(map) {
  return JSON.stringify(_strMapToObj(map));
}

function _objToStrMap(obj){
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k,obj[k]);
  }
  return strMap;
}

export function jsonToMap(jsonStr){
  return _objToStrMap(JSON.parse(jsonStr));
}

function vueChatMapToObj(map){
  let obj= Object.create(null);
  for (let[k,v] of map) {
    if(v && v instanceof Map){
      obj[k] = vueChatMapToObj(v)
    }else{
      obj[k] = v;
    }
  }
  return obj
}
export function vueChatMapToJson(map){
  return JSON.stringify(vueChatMapToObj(map))
}

function vueChatObjToMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    let temp = obj[k]
    if(temp && temp instanceof Array){
      strMap.set(k,temp);
    }else{
      strMap.set(k,vueChatObjToMap(temp))
    }
  }
  return strMap;
}
export function vueChatJsonToMap(jsonStr){
  return vueChatObjToMap(JSON.parse(jsonStr))
}

export function dateFormat(date){
  let dateTemp = new Date(date)
  let hours = dateTemp.getHours()+''
  let minutes = dateTemp.getMinutes()+''
  let seconds = dateTemp.getSeconds()+''
  let day = dateTemp.getDate()+''
  let month = (dateTemp.getMonth()+1)+''
  let fullYear = dateTemp.getFullYear()+''
  hours = hours.length<2?'0'+hours:hours
  minutes = minutes.length<2?'0'+minutes:minutes
  seconds = seconds.length<2?'0'+seconds:seconds
  day = day.length<2?'0'+day:day
  month = month.length<2?'0'+month:month
  return `${fullYear+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds}`;
}
