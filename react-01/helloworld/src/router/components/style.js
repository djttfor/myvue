import styled from 'styled-components'

export const Container = styled.div`
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
    height: 200px;
    border-bottom: 1px solid #E6E8EE;
    .header{
        text-align: center;
        height: 50px;
        font-size: 25px;
        line-height: 50px;
        border-bottom: 1px solid #E6E8EE;
    }
    .sidebar{
        float: left;
        width: 29%;
        div{
            height: 75px;
            text-align: center;
            line-height: 75px;        
            a{                
                text-decoration: none;
                display: block;
                border: 1px solid #E6E8EE;
                border-radius: 5px;
                color: black;
            }
        }
        .clckho{
            :hover{
                background-color: #E6E8EE;
            }         
        }   
        .clicked{  
            background-color: #416EF0;
            color:white; 
            :hover{
                background-color: #416EF0;
            }                 
         }
         
    }
    .main{
        float: left;
        height: 150px;
        width: 70%;
        text-align: center;
        line-height: 150px;
    }
`