export class FetchError extends Error {
    constructor(
        public status: number,
        public error?: string,
    ) {
        super(error);
    }
}
