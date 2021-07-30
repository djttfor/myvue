import ReactReduxTest from '../../store/reactReduxTest'
import { connect } from 'react-redux'


const mapStateToProps = (state)=>{
    return {sum: state}
}

const mapDispatchToProps = (dispatch)=>{
    return {
        increment: num => dispatch({type: 'increment',data: num*1}),
        decrement: num => dispatch({type: 'decrement',data: num*1}),
        incrementAsync: (num,time) => {
            setTimeout(()=>{
                dispatch({type: 'increment',data: num*1})
            },time)
        }
    }
}

export const Count =  connect(mapStateToProps,mapDispatchToProps)(ReactReduxTest)


