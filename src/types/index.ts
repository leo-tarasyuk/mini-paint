export type User = {
    email: string;
    password: string;
}

export type Pictures = {
    img: string;
    name: string;
    user?: string;
};