import React, { Component } from 'react';

class CreateContent extends Component { //props 예제
    render() { //컴퍼넌트는 반드시 하나의 최상위 태그로 시작해야함 
      return (
        <article>
            <h2>Create</h2>
            <form action="/create_process" method="post"
                onSubmit={function(e){ //submit버튼 클릭했을 때 실행되는 함수 
                    e.preventDefault();
                    this.props.onSubmit(
                        e.target.title.value,
                        e.target.desc.value
                    );
                    alert('Submit!');
                }.bind(this)}>
                <p>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="title"
                  ></input> 
                </p>
                <p>
                    <textarea 
                    name="desc" 
                    placeholder="description"></textarea>
                </p>
                <p><input type="submit" ></input></p>
            </form>
      </article>
      );
    }
  }

export default CreateContent;