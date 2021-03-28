import React, {createContext, useContext, useReducer, useRef, useEffect, useState} from 'react';

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
            console.log("create: ",action.todo);
            fetch("http://localhost:3002/api/create",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo: action.todo,
                }),
            }).then(response => response.json());
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            fetch("http://localhost:3002/api/delete/"+action.id.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return state.filter(todo => todo.id !== action.id);
        default: 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
function dateReducer(state, action){
    console.log("dateReducer");
    switch (action.type) {
        case '-':
            //console.log(state);
            var newState = new Date(state.getTime()-1*24*60*60*1000);
            //newState.setDate(state.nows()-1);
            return newState;
        case '+':
            var newState = new Date(state.getTime()+1*24*60*60*1000);
            //newState.setDate(state.getDate()+1);
            return newState;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const NextIdStateContext = createContext();
const NextIdDispatchContext = createContext();
const DateDispatchContext = createContext();
const DateStateContext = createContext();

//state 관리 컴포넌트 
export function TodoProvider(props){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const [nextId, setNextId] = useState(1);
    console.log(nextId);
    const today = new Date();
    const [dateState, dateDispatch] = useReducer(dateReducer, today);
    useEffect(()=> {
        fetch('http://localhost:3002/api/todolist/'+dateState.toString(),{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res=>res.json()).then(data=>dispatch({ // res에 날짜 data 넣어서 보내야함 
            type: 'RENEW',
            todo: data.initialTodos
        }));
    },[dateState]);
    useEffect(()=> {
        fetch('http://localhost:3002/api/maxId',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res=> res.json()).then(data=>{
            //console.log(data.maxId);
            setNextId(data.maxId+1);
        })
    },[]);
    //console.log("context :",state.length);
    console.log(nextId);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <NextIdStateContext.Provider value={nextId}>
                    <NextIdDispatchContext.Provider value={setNextId}>
                        <DateStateContext.Provider value={dateState}>
                            <DateDispatchContext.Provider value = {dateDispatch}>
                                {props.children}
                            </DateDispatchContext.Provider>
                        </DateStateContext.Provider>
                    </NextIdDispatchContext.Provider>
                </NextIdStateContext.Provider>
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

export function useNextIdState(){
    const context = useContext(NextIdStateContext);
    if (!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useNextIdDispatch(){
    const context = useContext(NextIdDispatchContext);
    if (!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useDateDispatch() {
    const context = useContext(DateDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useDateState() {
    const context = useContext(DateStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}