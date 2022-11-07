import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';
const Chat = ({id, users}) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const recipientEmail = getRecipientEmail(users, user); 
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
    const recipientData = recipientSnapshot?.docs?.[0]?.data();
   
    const enterChat = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <Container onClick={enterChat}>
            {recipientData?<UserAvatar src={recipientData.photoURL}/> :<UserAvatar/>}
            
            {recipientEmail}
            
        </Container>
    )
}

export default Chat;

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
margin: 15px;
word-break: break-word;

:hover{
    background-color: lightgray;
}
`;
const UserAvatar = styled(Avatar)`
margin: 5px;
`;