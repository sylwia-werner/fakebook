import { Chat, Message } from '@/types/chat';
import { fetchApi } from '../fetchApi';
import {
    transformChatData,
    transformChatsData,
} from '../transformers/transformChatsData';
import { ChatResponseDTO, MessageResponseDTO } from '../dto-types/chat';
import { transformMessagesData } from '../transformers/transformMessageData';

export const getChats = async (): Promise<{
    chats: Chat[];
}> => {
    const { data } = await fetchApi<ChatResponseDTO[]>({
        checkToken: true,
        path: '/chats/',
        method: 'GET',
        config: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    return {
        chats: transformChatsData(data),
    };
};

type ChatRequestData = {
    chat_id: string;
};

export const getChatById = async ({
    chat_id,
}: ChatRequestData): Promise<{
    chat: Chat;
}> => {
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/`,
        method: 'GET',
        config: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    return {
        chat: transformChatData(data),
    };
};

type MessagesRequestData = {
    chat_id: string;
};

export const getMessages = async ({
    chat_id,
}: MessagesRequestData): Promise<{
    messages: Message[];
}> => {
    const { data } = await fetchApi<MessageResponseDTO>({
        checkToken: false,
        path: `/chat/${chat_id}/get-messages/`,
        method: 'GET',
        config: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    return {
        messages: transformMessagesData(data),
    };
};

type CreateChatRequestData = {
    chat_name: string;
    user_ids: string[];
};

export const createChat = async ({
    chat_name,
    user_ids,
}: CreateChatRequestData): Promise<boolean> => {
    const requestBody = {
        chat_name,
        user_ids,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/create/`,
        method: 'POST',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulCreate = typeof data === 'object' && data !== null;

    return isSuccessfulCreate;
};

type DeleteChatRequestData = {
    chat_id: string;
};

export const deleteChat = async ({
    chat_id,
}: DeleteChatRequestData): Promise<boolean> => {
    const requestBody = {
        chat_id,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/create/`,
        method: 'DELETE',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulDelete = typeof data === 'object' && data !== null;

    return isSuccessfulDelete;
};

type RenameChatRequestData = {
    chat_name: string;
    chat_id: string;
};

export const renameChat = async ({
    chat_name,
    chat_id,
}: RenameChatRequestData): Promise<boolean> => {
    const requestBody = {
        chat_name,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/update-name/`,
        method: 'PATCH',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulRename = typeof data === 'object' && data !== null;

    return isSuccessfulRename;
};

type AddUserRequestData = {
    user_ids: string[];
    chat_id: string;
};

export const addUsersChat = async ({
    user_ids,
    chat_id,
}: AddUserRequestData): Promise<boolean> => {
    const requestBody = {
        user_ids,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/add-users/`,
        method: 'POST',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulAdd = typeof data === 'object' && data !== null;

    return isSuccessfulAdd;
};

type RemoveUserRequestData = {
    user_ids: string[];
    chat_id: string;
};

export const removeUsersChat = async ({
    user_ids,
    chat_id,
}: RemoveUserRequestData): Promise<boolean> => {
    const requestBody = {
        user_ids,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/remove-users/`,
        method: 'POST',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulRemove = typeof data === 'object' && data !== null;

    return isSuccessfulRemove;
};

type SendMessageRequestData = {
    content: string;
    chat_id: string;
    sender_id: string;
    timestamp: string;
};

export const sendMessageUsersChat = async ({
    content,
    chat_id,
    sender_id,
    timestamp,
}: SendMessageRequestData): Promise<boolean> => {
    const requestBody = {
        content,
        sender_id,
        timestamp,
    };
    const { data } = await fetchApi<ChatResponseDTO>({
        checkToken: true,
        path: `/chat/${chat_id}/send-message/`,
        method: 'POST',
        config: {
            body: JSON.stringify({ ...requestBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        },
    });

    const isSuccessfulSend = typeof data === 'object' && data !== null;

    return isSuccessfulSend;
};
