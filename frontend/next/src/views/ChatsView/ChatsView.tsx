'use client';

import $ from './ChatsView.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Chat } from '@/types/chat';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { getChats } from '@/services/api/chat';

export const ChatsView = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getChats();

                setChats(await response.chats);
            } catch (err) {
                setError('An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <section className={$.section}>
            <h1>Chats</h1>
            <div className={$.chatBox}>
                <div className={$.chats}>
                    {chats.map(chat => (
                        <div key={chat.id} className={clsx($.chat)}>
                            <p className={$.text}>{chat.chatName}</p>
                        </div>
                    ))}
                </div>

                {isLoading && <LoadingSpinner />}
                {error && <p className={$.errorMessage}>{error}</p>}
            </div>
        </section>
    );
};
