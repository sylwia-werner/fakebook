import { getMessages, sendMessageUsersChat } from '@/services/api/chat';
import { FetchError } from '@/services/types';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type SendMessageApiType = {
    content: string;
    sender_id: string;
    timestamp: string;
    chat_id: string;
};

export const useSendMessageAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const sendMessage = async ({
        content,
        sender_id,
        timestamp,
        chat_id,
    }: SendMessageApiType) => {
        setIsLoading(true);
        setError(null);

        try {
            const successful = await sendMessageUsersChat({
                content,
                sender_id,
                timestamp,
                chat_id,
            });
        } catch (error) {
            if (error instanceof FetchError && error.status === 401) {
                setError('Invalid .');
                return;
            }
            setError('Something went wrong. Try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return { sendMessage, error };
};

export type GetMessageApiType = {
    chat_id: string;
};

export const useGetMessageAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorGet, setError] = useState<string | null>(null);

    const getMessagesFunc = async ({ chat_id }: GetMessageApiType) => {
        setIsLoading(true);
        setError(null);

        try {
            const successful = await getMessages({
                chat_id,
            });
        } catch (error) {
            if (error instanceof FetchError && error.status === 401) {
                setError('Invalid .');
                return;
            }
            setError('Something went wrong. Try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return { getMessagesFunc, isLoading, errorGet };
};
