import React, { Component } from 'react';
import TOC from './components/TOC.js'
import './App.css';

class Subject1 extends Component { //props 예제
  render() { //컴퍼넌트는 반드시 하나의 최상위 태그로 시작해야함 
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
    </header>
    );
  }
}
class Subject2  extends Component { //state 예제
  render() { 
    return (
      <header>
        <h1><a href="/" onClick={function(e){
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
    </header>
    );
  }
}
class App extends Component {
  constructor(props){ //초기화 담당
    super(props);
    this.state = {
      mode:"main",
      selected_content_id : 2,
      main:{title:"Welcome", sub:"Hello React!"},
      subject2:{title:"WEB", sub:"Hello web"},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _sub = null;
    if (this.state.mode === "main") {
      _title = this.state.main.title;
      _sub = this.state.main.sub;
    } else if(this.state.mode === "read") {
      _title = this.state.contents[this.state.selected_content_id-1].title;
      _sub = this.state.contents[this.state.selected_content_id-1].desc;
    }
    return (
      <div className="App">
        
      {/* <Subject1 title="WEB" sub="welcome!"></Subject1> */}
      <Subject2
        title = {this.state.subject2.title}
        sub = {this.state.subject2.sub}
        onChangePage = {function(){ // 우리가 만든 이벤트 
          this.setState({mode:"main"})
        }.bind(this)}>
       
      </Subject2>
      <TOC 
        onChangePage = {function(id){
          alert('hihihihi');
          this.setState({
            mode:"read",
            selected_content_id:id
            });
        }.bind(this)}
        data={this.state.contents}
      ></TOC>
      <header> 
        <h1>{_title}</h1>
        {_sub}
      </header>
      </div>
    );
  }
}

export default App;