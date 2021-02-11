import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/Todo Template';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import {TodoProvider} from './TodoContext';

// global style을 추가하고 싶을 때 이용. 
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle></GlobalStyle>
      <TodoTemplate>
        <TodoHead></TodoHead>
        <TodoList></TodoList>
        <TodoCreate></TodoCreate>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
