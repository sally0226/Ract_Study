import React, { Component } from 'react';
import TOC from './components/TOC.js'
import Subject1 from './components/Subject1.js'
import Control from './components/Control.js'
import CreateContent from './components/CreateContent.js';
import UpdateContent from './components/UpdateContent.js';
import './App.css';

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
    this.max_content_id = 3; //UI영향을 주지 않기 때문에 state값으로 안해도됨. 그냥 value로 만들어 이용하기 
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
  getReadContent(){
    var data = this.state.contents[this.state.selected_content_id-1];
    return data;
  }
  getContent(){
    var _title, _sub, _article, _content= null;
    if (this.state.mode === "main") {
      _title = this.state.main.title;
      _sub = this.state.main.sub;
      _article = <Subject1 title={_title} sub={_sub}></Subject1>
    } else if(this.state.mode === "read") {
      _content = this.getReadContent();
      _article = <Subject1 title={_content.title} sub={_content.desc}></Subject1>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title,_desc){
          //add content to this.state.contents
          this.max_content_id +=1;
          // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc}) // 이렇게 state값을 직젒 수정하면 React가 알지 못해서 아무 일도 안일어남
          // this.setState({
          //   contents:this.state.contents
          // }); //React의 성능을 개선하려고 할 때 까다로운 방법.. 
          // push : 원본을 바꿈 , concat : 원본을 변경한 새로운 배열이 return됨 
          var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
          this.setState({
            contents:_contents,
            mode:'read',
            selected_content_id:this.max_content_id
          });
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === "update"){
      _content = this.getReadContent();
      console.log(_content);
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title,_desc){
          var _contents = Array.from(this.state.contents);
          _contents[_id-1] = {id:_id, title:_title, desc:_desc};
          this.setState({
            contents:_contents,
            mode : "read"
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
     
      <Subject2
        title = {this.state.subject2.title}
        sub = {this.state.subject2.sub}
        onChangePage = {function(){ // 우리가 만든 이벤트 
          this.setState({mode:"main"})
        }.bind(this)}>
       
      </Subject2>
      <TOC 
        onChangePage = {function(id){
          this.setState({
            mode:"read",
            selected_content_id:id
            });
        }.bind(this)}
        data={this.state.contents}
      ></TOC>
      <Control onChangeMode={function(_mode){
        //이벤트 핸들러
        if (_mode === "delete"){
            if(window.confirm()){
              var _contents = Array.from(this.state.contents);
              console.log("this.selected_content_id",this.state.selected_content_id);
              _contents.splice(this.state.selected_content_id-1,1);
              for (var i=0;i<_contents.length;i++){
                _contents[i].id = i+1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              })
              this.max_content_id--;
            }
        } else {

        }
        console.log(_mode);
        this.setState({
          mode:_mode
        });
      }.bind(this)}></Control>
      {this.getContent()}
      </div>
    );
  }
}

export default App;