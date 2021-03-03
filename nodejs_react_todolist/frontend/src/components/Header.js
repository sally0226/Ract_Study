import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    width: parent;
    height: 100px;
    disppay: flex;
    align-items: center;
    justify-content: space-between;

    
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
                    <ll><a href="">join in</a></ll>
                </ul>
            </nav>
            <LogInBtn href=''>
                로그인
            </LogInBtn>
            <SignInBtn href=''>
                회원가입
            </SignInBtn>
        </HeaderBlock>
    );    
}
export default Header;