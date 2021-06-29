import styled from 'styled-components'

export const Container = styled.div`
    width: 500px;
    border: 1px solid red;
    margin: 0 auto;
    margin-top: 30px;
    height: 200px;
    .header{
        text-align: center;
        height: 50px;
        border: 1px solid red;
        font-size: 25px;
        line-height: 50px;
    }
    .sidebar{
        float: left;
        width: 29%;
        div{
            height: 75px;
            text-align: center;
            line-height: 75px;
        }
    }
    .main{
        float: left;
        border-left: 1px green solid;
        height: 150px;
        width: 70%;
        text-align: center;
        line-height: 150px;
    }
`