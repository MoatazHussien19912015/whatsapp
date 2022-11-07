import React from 'react'
import styled from 'styled-components';
import Head from 'next/head';
import {Button} from '@material-ui/core';
import {auth, provider} from '../firebase';

const Login = () => {
    const login = () => {
        auth.signInWithPopup(provider).catch(alert);
    };
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://logo-logos.com/wp-content/uploads/2016/10/WhatsApp_logo_icon.png"></Logo>
                <Button variant="outlined" onClick={login}>
                Sign IN With Google
                </Button>
            </LoginContainer>
            
        </Container>
    )
}

export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: lightblue;
`;
const LoginContainer = styled.div`
display: flex;
padding: 100px;
flex-direction: column;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Logo = styled.img`
width: 200px;
height: 200px;
margin-bottom: 50px;
`;