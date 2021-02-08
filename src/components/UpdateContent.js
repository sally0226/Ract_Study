import React, { Component } from 'react';

class UpdateContent extends Component { //props 예제
  constructor(props){
    super(props);
    console.log(this.props.data);
    this.state = {
      id : this.props.data.id,
      title : this.props.data.title,
      desc : this.props.data.desc
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }
    render() { //컴퍼넌트는 반드시 하나의 최상위 태그로 시작해야함 
      console.log('UpdateContent render')
      return (
        <article>
            <h2>Update</h2>
            <form 
              action="/update_process" 
              method="post"
              onSubmit={function(e){ //submit버튼 클릭했을 때 실행되는 함수 
                  e.preventDefault();
                  this.props.onSubmit(
                    this.state.id,
                    this.state.title,
                    this.state.desc
                  );
                  alert('Submit!');
              }.bind(this)}
            >
              <input type="hidden" name="id" value={this.state.id}></input>
              <p>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="title"
                  value={this.state.title}
                  onChange = {this.inputFormHandler}
                ></input> </p>
              <p>
                <textarea 
                  name="desc" 
                  placeholder="description"
                  onChange = {this.inputFormHandler}
                  value = {this.state.desc}
                ></textarea>
              </p>
              <p><input type="submit" ></input></p>
            </form>
      </article>
      );
    }
  }

export default UpdateContent;