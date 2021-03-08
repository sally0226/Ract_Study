import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    width: parent;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color : #20c997;
    
`;

const LogInBtn = styled.a`
    font-color: red;
`;
  
const SignInBtn = styled.a`
    font-color: green;
`;
function Header(){
    return(
        <HeaderBlock>
            Header 입니다.
            <nav>
                <ul>
                    <ll><a href="">log in</a></ll>
                    <ll>    |    </ll>
                    <ll><a href="">join in</a></ll>
                </ul>
            </nav>
        </HeaderBlock>
    );    
}
export default Header;