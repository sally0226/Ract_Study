import React, { Component } from 'react';

class TOC extends Component{
    render(){
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            //이렇게 여러개의 목록을 자동으로 생성할 때에는, key값을 등록해주어야한다. (각각의 목록을 식별할 수 있는 식별자)
            lists.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/"+data[i].id}
                        onClick={function(id,e){
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>);
            i = i + 1;
        }
        return (
        <nav>
            <ul>
                {lists}
            </ul>
            </nav>
        );
    }
}

export default TOC;