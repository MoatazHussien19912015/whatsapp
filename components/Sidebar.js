import React from 'react'
import styled from 'styled-components';
import {Avatar, IconButton, Button} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as EmailValidator from 'email-validator';
import SearchIcon from '@material-ui/icons/Search';
import {auth, db} from './../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';
 function Sidebar ()  {
     const [user] = useAuthState(auth);
     const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
     const [chatsSnapshot] = useCollection(userChatRef);

     const chatAlreadyExists = (recipientEmail) => {
        return !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail));
     };

     const createChat = () => {
         const input = prompt('please enter the email address of the user you want to chat with');
         if (!input) return null;
         if (EmailValidator.validate(input) && (user.email !== input) && !chatAlreadyExists(input)) {
             console.log('hurraaaaaah');
             // add the chat in the db
             db.collection('chats').add({
                 users: [user.email, input]
             })
         }
     };
    return (
        <Container>
            <Header>
                <UserAvatar onClick={()=> auth.signOut()}/>
                <IconsContainer>
                    <IconButton><ChatIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search In Chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start New Chat</SidebarButton>
            {chatsSnapshot?.docs.map(chat=>(<Chat key={chat.id} id={chat.id} users={chat.data().users} />))}

            
        </Container>
    )
}
export default Sidebar;

const Container = styled.div`
height: 100vh;
min-width: 300px;
max-width: 300px;
overflow-y: scroll;
`;
const Search = styled.div`
display: flex;
padding: 20px;
`;
const SearchInput = styled.input`
outline: none;
border: none;
flex: 1;
`;
const SidebarButton = styled(Button)`
width: 100%;

`;
//const SearchIcon = styled.div``;
const Header = styled.div`
display: flex;
position: sticky;
background: white;
top: 0;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 3px solid yellow;
`;
const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity: 0.7;
}
`;
const IconsContainer = styled.div``;