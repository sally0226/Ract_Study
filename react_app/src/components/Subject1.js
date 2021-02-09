import React, { Component } from 'react';

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

export default Subject1;