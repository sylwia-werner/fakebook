import { Chat } from '@/types/chat';
import { ChatResponseDTO } from '../dto-types/chat';

export const transformChatsData = (response: ChatResponseDTO[]): Chat[] => {
    return response.map(
        (item: { id: string; chatName: string; users: string[] }) => ({
            id: item.id,
            chatName: item.chatName,
            users: item.users,
        }),
    );
};

export const transformChatData = (response: ChatResponseDTO): Chat => {
    return {
        id: response.id,
        chatName: response.chatName,
        users: response.users,
    };
};
