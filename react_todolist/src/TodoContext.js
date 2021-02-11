import React, {createContext, useContext, useReducer, useRef} from 'react';

const initialTodos = [
    {
        id: 1,
        text: '첫 번째 todo',
        done: true
    },
    {
        id: 2,
        text: '두 번째 todo',
        done: true
    },
    {
        id: 3,
        text: '세 번째 todo',
        done: false
    },
    {
        id: 4,
        text: '네 번째 todo',
        done: false
    }
];

function todoReducer(state, action){
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            return state.fliter(todo => todo.id !== action.id);
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

//state 관리 컴포넌트 
export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

//해당 컴포넌트가 TodoPrivider 내부에 랜더링되어 있는지 확인 
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if (!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}