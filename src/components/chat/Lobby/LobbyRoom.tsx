import React, { useState } from "react";
import styled from "styled-components";

import { Chat } from '@/interface/chat';

import Textarea from "@/components/ui/Textarea";
import Message from '../Message';

// @ts-ignore
const LobbyRoom = ({ chatList, value, onChange, onChat }) => {
  return (
    <LobbyRoomWrapper>
      <Lobby>
        {chatList.map((chat: Chat) => (
          <Message
            isSystem={chat.userName === 'system'}
            message={chat.message}
            userName={chat.userName}
          />
        ))}
      </Lobby>
      <LobbyRoomInput>
        <Textarea
          width="100%"
          value={value}
          onChange={onChange}
          onKeyDown={onChat}
        />
        <button type="button">채팅</button>
      </LobbyRoomInput>
    </LobbyRoomWrapper>
  );
};

const LobbyRoomWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-right: auto;
  margin-left: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 700px;
`;

const Lobby = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #000000;
  min-height: 150px;
`;

const LobbyRoomInput = styled.div`
  position: relative;
  margin-top: 0.5rem;
  padding-top: 0.5rem; 
  padding-right: 4.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  border: 1px solid #000000;
  border-radius: 2px;

  button {
    position: absolute;
    width: 50px;
    height: 28px;
    right: 0.5rem;
    bottom: 0.5rem;
  }
`;

export default LobbyRoom;
