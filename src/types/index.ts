export interface FirebaseConfig {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly databaseURL: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
};

export type User = {
    email: string;
    password: string;
}

export type Pictures = {
    img: string;
    name: string;
    user?: string;
};