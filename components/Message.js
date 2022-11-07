import React from 'react';
import { auth, db } from '../firebase';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
const Message = ({user, message}) => {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email? Sender : Receiver;
    return (
        <Container>
            <TypeOfMessage>{message.message}</TypeOfMessage>
        </Container>
    )
}

export default Message;

const Container = styled.div``;
const MessageElement = styled.p`
width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom: 26px;
position: relative;
//text-align: right;
`;

const Sender = styled(MessageElement)`
margin-left: auto;
background-color: lightblue;
`;

const Receiver = styled(MessageElement)`
background-color: whitesmoke;

`;