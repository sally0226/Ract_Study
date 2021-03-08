import React, {createContext, useContext, useReducer, useRef, useEffect} from 'react';

const initialTodos = [
        {
            id: 1,
            text: '가짜 값',
            done: true
        },
];
function todoReducer(state, action){
    console.log("todoReducer",action.type);
    switch (action.type) {
        case 'RENEW': //setState와 동일한 기능을 하게 만들고 싶다. 
            return action.todo;
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

//state 관리 컴포넌트 
export function TodoProvider(props){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    useEffect(()=> {
        fetch('http://localhost:3002/api').then(res=>res.json()).then(data=>dispatch({
            type: 'RENEW',
            todo: data.initialTodos
        }));
    },[]);
    
   console.log("context :",state.length);
    //const nextId =useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={state.length+1}>
                    {props.children}
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