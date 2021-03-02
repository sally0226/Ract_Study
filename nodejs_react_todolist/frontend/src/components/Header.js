import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
    width: parent;
    height: 100px;

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