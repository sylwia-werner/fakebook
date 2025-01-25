import { User } from '../transformers/transformLoginData';

export type ChatResponseDTO = {
    id: string;
    chatName: string;
    users: string[];
};

export type MessageResponseDTO = {
    sender: string;
    content: string;
    timestamp: string;
}[];
