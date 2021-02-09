import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
//여러 개의 할 일 항목을 보여주는 부분

//일단 사이즈에 관한 설정만 
const TodoListBlock = styled.div`
    text-align: left;
    flex: 1; //자신이 차지할 수 있는 영역을 꽉 채우도록
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList(){
    return (
        <TodoListBlock>
            <TodoItem text="React 공부하기" done={true} />
            <TodoItem text="모두의 네트워크 읽기" done={false} />
            <TodoItem text="github 커밋하기" done={true} />
            <TodoItem text="알고리즘 문제 풀기" done={false} />
        </TodoListBlock>
    );
}

export default TodoList;