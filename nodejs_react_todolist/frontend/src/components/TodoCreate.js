import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import { useTodoDispatch, useTodoNextId, useDateState } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition 0.125s all ease-in;
    ${props =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }    
            &:active {
                background: #fa5252;
            }
            transform: translate(-50%, 50%) rotate(45deg);
        `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;

    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate(){
    // useState() : 상태의 기본 값을 파라미터로 넣어서 호출
    // return : [현재 상태, Setter 함수]
    // Setter 함수 : 파라미터로 전달받은 값을 최신 상태로 설정 
    const [open, setOpen] = useState(false); // 배열 비구조화 할당 
    const [value, setValue] = useState('');
    const dateState = useDateState();

    const dispatch = useTodoDispatch();
    const {nextId, setNextId} = useTodoNextId();
    console.log("nextId :",nextId);
    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault(); // 새로고침 방지
        dispatch({
            type: 'CREATE',
            todo: {
                id : nextId,
                text: value,
                date: dateState,
                done: false
            }
        });
        setValue('');
        setOpen(false);
        setNextId(nextId+1);
    };

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input 
                            autoFocus 
                            placeholder="할 일을 입력하고, Enter를 누르세요"
                            onChange = {onChange}
                            value = {value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd/>
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);
// 컴포넌트가 React.memo()로 렌더링될 때, React는 컴퍼넌트를 렌더링 후 결과를 메모이징 한다.
// 그리고 다음 렌더링이 일어날 때 props가 같다면, React는 메모이징 된 내용을 재사용한다
// https://ui.toast.com/weekly-pick/ko_20190731