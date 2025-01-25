'use client';
import { getChatById } from '@/services/api/chat';
import { Chat } from '@/types/chat';
import ChatView from '@/views/ChatView/ChatView';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Register() {
    //toDo getUser
    const params = useParams<{ id: string }>();
    const [chat, setChat] = useState<Chat>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getChatById({
                    chat_id: params.id,
                });

                setChat(await response.chat);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [params.id]);

    return chat != null ? (
        <ChatView currentUser={'admin'} chat={chat} />
    ) : (
        <div>Błąd pobierania czatu</div>
    );
}
