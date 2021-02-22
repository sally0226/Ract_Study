import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/Todo Template';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import {TodoProvider} from './TodoContext';
import TodoChangeDate from './components/TodoChangeDate';
import styled, {css} from 'styled-components';
// global style을 추가하고 싶을 때 이용. 
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
  return (
    <TodoProvider>
		<GlobalStyle></GlobalStyle>
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
  );
}

export default App;
