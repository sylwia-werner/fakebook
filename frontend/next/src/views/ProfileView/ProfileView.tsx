'use client';

import { useState, useEffect } from 'react';
import $ from './ProfileView.module.scss';
import { fetchApi } from '@/services/fetchApi';

interface UserProfile {
    first_name: string;
    last_name: string;
    email?: string;
    last_login?: string;
    created_at: string;
}

export const ProfileView = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserProfile() {
            setIsLoading(true);
            setError(null);

            try {
                const { data } = await fetchApi<UserProfile>({
                    path: '/userprofile',
                    method: 'GET',
                    config: {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                    checkToken: true,
                });

                setUserProfile(data);
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

        fetchUserProfile();
    }, []);

    if (isLoading) {
        return <div className={$.loading}>Loading...</div>;
    }

    if (error) {
        if (error === 'Session expired') {
            return (
                <div className={$.error}>
                    <p>Your session has expired. Please <a href="/login">log in</a> again.</p>
                </div>
            );
        }
        return <div className={$.error}>Error: {error}</div>;
    
    }

    if (!userProfile) {
        return <div className={$.error}>No user profile data available.</div>;
    }

    return (
        <section className={$.profileContainer}>
            <div className={$.coverPhoto}>
                <div className={$.profileImageWrapper}>
                    <img
                        alt="Profile Picture"
                        className={$.profileImage}
                    />
                </div>
            </div>
            <div className={$.profileContent}>
                <h1 className={$.profileName}>
                    {userProfile.first_name} {userProfile.last_name}
                </h1>
                <p className={$.email}>{userProfile.email || 'No email provided'}</p>
                <div className={$.details}>
                    <p>
                        <strong>Last Login:</strong>{' '}
                        {userProfile.last_login
                            ? new Date(userProfile.last_login).toLocaleString()
                            : 'Never logged in'}
                    </p>
                    <p>
                        <strong>Account Created:</strong>{' '}
                        {new Date(userProfile.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </section>
    );
};
