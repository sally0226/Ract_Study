import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import {useTodoState} from '../TodoContext';
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
    const todos = useTodoState();
    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}  
        </TodoListBlock>
    );
}

export default TodoList;