import { Message } from '@/types/chat';
import { MessageResponseDTO } from '../dto-types/chat';

export const transformMessagesData = (
    response: MessageResponseDTO,
): Message[] => {
    return response.map(
        (item: { content: string; sender: string; timestamp: string }) => ({
            content: item.content,
            sender_id: item.sender,
            timestamp: item.timestamp,
        }),
    );
};
