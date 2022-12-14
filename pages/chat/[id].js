import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import { db, auth } from '../../firebase';
import  getRecipientEmail from '../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatScreen from '../../components/ChatScreen';

const Chat = ({chat, messages}) => { 
    //console.log(chat, messages);
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Chat With {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}  />
                
            </ChatContainer>
            
        </Container>
    )
}

export default Chat;
export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.query.id);
    // preparing the messages
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messagesRes.docs.map(doc=>({id: doc.id, ...doc.data()}))
    .map(message=>({...message, timestamp: message.timestamp.toDate().getTime()}));

    // preparing the chat
    const chatRes =  await ref.get();
    const chat = {id: chatRes.id, ...chatRes.data()};
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    };

}

const Container = styled.div`
display: flex;
`;
const ChatContainer = styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
`;