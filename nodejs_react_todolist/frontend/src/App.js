import React, {useEffect, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/TodoTemplates';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import {TodoProvider} from './TodoContext';
import TodoChangeDate from './components/TodoChangeDate';
import styled from 'styled-components';

import Header from './components/Header';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const WrapAll = styled.div`
	display: flex;
	width: min-content; //min-content와 max-content의 차이? 
	margin:0 auto; //페이지 중앙에 오도록 설정
`;

function App() {
	const [showing, setShowing] = useState(false);
  	const [state, setState] = useState({
		//username: null
		initalList: [{
			id: 1,
			text: '가짜값',
			done: true
		}]
  });
  	useEffect(() => {
		console.log('start useEffect');
		fetch('http://localhost:3002/api').then(res=>res.json()).then(data=>{
		setState({initalList:data.initialTodos});
		setShowing(true)
    });
  },[]); //빈 배열을 넣어 반복 실행되지 않도록.. 

	console.log("App state:",state.initalList);
  //const _todos = state.initalList;
  //console.log("todos:",_todos);

  if (showing){
	return (
		<div>
			<Header>
			</Header>
			<TodoProvider initalTodos={state.initalList}>
		  	<GlobalStyle/>
		  	<WrapAll>
				<TodoChangeDate info="left">
				</TodoChangeDate>
				<TodoTemplate>
					<TodoHead></TodoHead>
					<TodoList></TodoList>
					<TodoCreate></TodoCreate>
				</TodoTemplate>
				<TodoChangeDate info="right">
				</TodoChangeDate>
			</WrapAll>
		</TodoProvider>
		</div>
		
	  );
  }
  else {
	  //로드중 페이지 나중에 꾸미기 
	  return(
		<div>
			페이지를 로드 중입니다 
		</div>
	  );
	  
  }
  
}
export default App;
