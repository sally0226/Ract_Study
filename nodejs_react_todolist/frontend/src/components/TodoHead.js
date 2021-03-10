import React from 'react';
import styled from 'styled-components';
import { useTodoState, useDateState } from '../TodoContext';

// 오늘의 날짜와 요일, 앞으로 남은 목록 개수 보여줌 
const TodoHeadBlock = styled.div`
    text-align: left;
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    
    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead(){
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo=>!todo.done);
    //const today = new Date();
    const date = useDateState();
    console.log("date in todohead :", date);
    const dateString = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = date.toLocaleDateString('ko-KR', {
        weekday: 'long'
    });
    console.log(todos);
    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1> 
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;