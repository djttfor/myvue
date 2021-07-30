
const initState = 10086
function countReduces (preState=initState,action) {
    const {type,data} = action
    switch(type){
        case 'increment': 
            return preState + data
        case 'decrement':
            return preState - data
        default:
            return preState
    }
}

export default countReduces