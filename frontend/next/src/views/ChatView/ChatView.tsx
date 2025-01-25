'use client';

import TextInput from '@/components/Inputs/TextInput/TextInput';
import $ from './ChatView.module.scss';
import clsx from 'clsx';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Chat, Message } from '@/types/chat';
import { SendMessageApiType, useSendMessageAPI } from '@/hooks/useChatAPI';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { getMessages } from '@/services/api/chat';

interface ChatProps {
    currentUser: string;
    chat: Chat;
}

const ChatView: FC<ChatProps> = ({ chat, currentUser }) => {
    const [messageInput, setMessageInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { sendMessage, error } = useSendMessageAPI();
    const [isLoading, setIsLoading] = useState(true);
    const [errorGet, setErrorGet] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setErrorGet(null);

            try {
                const response = await getMessages({
                    chat_id: chat.id,
                });

                setMessages(await response.messages);
            } catch (err) {
                if (err instanceof Error) {
                    setErrorGet(err.message);
                } else {
                    setErrorGet('An unknown error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [chat.id]);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageInput(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage: SendMessageApiType = {
            sender_id: currentUser,
            content: messageInput.trim(),
            timestamp: new Date().toISOString(),
            chat_id: chat.id,
        };

        try {
            await sendMessage(newMessage);
            setMessages(prev => [...prev, { ...newMessage }]);
            setMessageInput('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    return (
        <section className={$.section}>
            <h1>Chat</h1>
            <div className={$.chatBox}>
                <div className={$.messages}>
                    {messages.map(message => (
                        <div
                            key={message.timestamp}
                            className={clsx(
                                $.message,
                                message.sender_id === currentUser
                                    ? $.sent
                                    : $.received,
                            )}
                        >
                            <p className={$.text}>{message.content}</p>
                            <span className={$.timestamp}>
                                {new Date(
                                    message.timestamp,
                                ).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>

                {isLoading && <LoadingSpinner />}
                {error && <p className={$.errorMessage}>{error}</p>}

                <form className={$.form} onSubmit={handleSubmit}>
                    <TextInput
                        type="text"
                        label="Message"
                        placeholder="Type a message..."
                        name="message"
                        value={messageInput}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className={clsx($.button, $.sendButton, 'btn')}
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ChatView;
