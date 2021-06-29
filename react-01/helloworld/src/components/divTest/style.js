import styled from "styled-components";

export const DivComponent = styled.div`
    border: 1px solid red;
    height: 35px;
    padding: 0 100px;
    background-color: #96B97D;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: center;
    }
    li {
        display: inline-block;       
    }
    a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
        color: #F8FFFF;  
        font-size: 14px;
        :hover{
            color: #1E1E1E
        }      
    }  
`;