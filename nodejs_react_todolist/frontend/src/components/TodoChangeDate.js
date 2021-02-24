import React from 'react';
import styled from 'styled-components';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import {useTodoDispatch} from '../TodoContext';

const WrapArrow = styled.div`
    margin-top: 96px;
    margin-bottom: 32px;
    line-height: 768px;
    height: 768px;
    .Arrow {
        //position: absolute;
        //top: 600px;
        height: 100px;
        width : 80px;
        color: #868e96;
        vertical-align: middle;
        &:hover{
            color: #343a40;
        }
    }
`;
//const

//함수형 컴포넌트에서 첫 번째 parameter = props
function TodoChangeDate(props){
    
    console.log(props);
    if (props.info==="left")
        return (
            <WrapArrow>
                <MdKeyboardArrowLeft className="Arrow"/>
            </WrapArrow>
                
            
        );
    else 
        return (
            <WrapArrow>
                <MdKeyboardArrowRight className="Arrow"/>
            </WrapArrow>
        );

}

export default TodoChangeDate;