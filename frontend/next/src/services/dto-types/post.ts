// JUST EXAMPLES so that api wrapper works as expected

export type DeletePostResponseDTO = {
    id: string;
};

export type GetPostResponseDTO = {
    id: string;
    title: string;
    content: string;
};

export type UpdatePostRequest = {
    title?: string;
    content?: string;
};

export type UpdatePostResponse = {
    id: string;
    title: string;
    content: string;
};
