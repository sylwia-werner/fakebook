'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../PostForm';
import { API } from '@/api/API'; //Zmienić gdzie będzie api

const CreatePostPage = () => {
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setPostContent] = useState('');
	const router = useRouter();

	const submitPost = async () => {
		try {
			// Dodanie nowego posta (obraz obecnie nieobsługiwany)
			const response = await API.POST.createPost({
				title: postTitle,
				content: postContent,
				image: null,
			});

			if (response) {
				router.push('/'); // Przejście do listy postów po zapisaniu
			}
		} catch (error) {
			console.error('Wystąpił problem podczas tworzenia posta:', error);
		}
	};

	return (
		<PostForm
			pageTitle="Dodaj nowy post"
			titleValue={postTitle}
			contentValue={postContent}
			onChangeTitle={setPostTitle}
			onChangeContent={setPostContent}
			handleSubmit={submitPost}
		/>
	);
};

export default CreatePostPage;
