import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() { //컴퍼넌트는 반드시 하나의 최상위 태그로 시작해야함 
    return (
      <header>
        <h1>WEB</h1>
        welcome!
    </header>
    );
  }
}
class TOC extends Component{
  render(){
    return (
      <nav>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">JS</a></li>
            <li><a href="3.html">CSS</a></li>
        </ul>
        </nav>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject></Subject>
        <TOC></TOC>
      </div>
    );
  }
}
class HTML extends Component {

}
export default App;