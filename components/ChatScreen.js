import React from 'react';
import styled from 'styled-components';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar, IconButton } from '@material-ui/core';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import  getRecipientEmail  from '../utils/getRecipientEmail';
import { useState } from 'react';
import Message from './Message';
import TimeAgo from 'timeago-react';
import { useRef } from 'react';

const ChatScreen = ({chat, messages}) => {
    const EndOfMessageRef = useRef(null);
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState('');
    const recipientEmail = getRecipientEmail(chat.users, user);
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==', recipientEmail));
    const showMessages = () => { 
        if (messagesSnapshot) { 
            return messagesSnapshot.docs.map(message => (
                <Message key={message.id} user={message.data().user} 
                message={{...message.data(), timestamp: message.data().timestamp?.toDate().getTime()}} />
            ));  
        } else {  
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message} />
            ));
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        // updating the last seen of the sender
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },{merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL 
        });
        setInput('');
        scrollToBottom();
    };

    const scrollToBottom = () => {
        EndOfMessageRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    

    return (
        <Container>
            <Header>
    {recipient?<Avatar src={recipient.photoURL}/>:<Avatar>{recipientEmail}</Avatar>}
                
                <HeaderInformation>
                <h3>{recipientEmail}</h3>
    {recipientSnapshot?<p>Last Active: {' '} {recipient?.lastSeen?.toDate()?(
    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />):"Unavailable"}</p>:<p>Loading Last Active...</p>}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={EndOfMessageRef} />
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon/>
                <Input value={input} onChange={e=>setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} ></button>
                <MicIcon/>
            </InputContainer>
            

        </Container>
    )
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 1;
top: 0;
display: flex;
padding: 10px;
//border: solid 1px red;
align-items: center;
border-bottom: solid 1px blue;
height: 80px;
`;
const HeaderInformation = styled.div`
margin-left: 15px;
flex: 1;

> h3 {
    margin-bottom: 3px;
}

> p {
    color: gray;
    font-size: 14px;
}

`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
padding: 30px;
background-color: gray;
min-height: 90vh;
`;
const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: yellow;
z-index: 5;
`;
const Input = styled.input`
flex: 1;
outline: 0;
border: none;
background-color: whitesmoke;
padding: 20px;
margin-left: 15px;
margin-right: 15px;
`;
const EndOfMessage = styled.div``;