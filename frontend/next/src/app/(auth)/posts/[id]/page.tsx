'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PostForm from '../PostForm';
import { API } from '@/api/API'; //gdzie jet api?

const EditPostPage = () => {
	const router = useRouter();
	const { id } = useParams(); // Pobranie ID z parametru ścieżki
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setPostContent] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	// Pobranie danych posta po ID
	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const post = await API.POST.getPostById(id); // Funkcja API do pobierania danych
				if (post) {
					setPostTitle(post.title);
					setPostContent(post.content);
				}
			} catch (error) {
				console.error('Nie udało się pobrać danych posta:', error);
				router.push('/'); // Powrót na stronę główną w przypadku błędu
			} finally {
				setIsLoading(false);
			}
		};

		fetchPostData();
	}, [id, router]);

	// Aktualizacja posta
	const updatePost = async () => {
		try {
			const response = await API.POST.updatePost(id, {
				title: postTitle,
				content: postContent,
			});
			if (response) {
				router.push('/'); // Przekierowanie po udanej edycji
			}
		} catch (error) {
			console.error('Nie udało się zaktualizować posta:', error);
		}
	};

	// Wyświetlenie loadera podczas pobierania danych
	if (isLoading) {
		return <div className="text-center py-8">Ładowanie danych posta...</div>;
	}

	return (
		<PostForm
			pageTitle="Edytuj post"
			titleValue={postTitle}
			contentValue={postContent}
			onChangeTitle={setPostTitle}
			onChangeContent={setPostContent}
			handleSubmit={updatePost}
		/>
	);
};

export default EditPostPage;
