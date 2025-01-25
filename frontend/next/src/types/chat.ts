export interface Message {
    content: string;
    sender_id: string;
    timestamp: string;
    chat_id?: string;
}

export interface Chat {
    id: string;
    chatName: string;
    users: string[];
}

type InputFieldType = {
    value: string;
};

export type MessageFormType = {
    content: InputFieldType;
};
