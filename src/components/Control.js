import React, { Component } from 'react';

class Control extends Component { //props 예제
    render() { //컴퍼넌트는 반드시 하나의 최상위 태그로 시작해야함 
      return (
        <ul>
            <li><a href="/create" onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('create');
            }.bind(this)}>create</a></li>
            <li><a href="/update" onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('update');
            }.bind(this)}>update</a></li>
            <li><input onClick={function(e){
                e.preventDefault();
                this.props.onChangeMode('delete');
            }.bind(this)} type="button" value="delete" ></input></li>
        </ul>
      );
    }
  }

export default Control;