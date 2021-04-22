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

export type UserParameters = {
    name: string;
    surname: string;
    birthday: string
    gender: string;
    telephone: string;
    city: string;
    email: string;
    status: string;
    job: {
        status: string;
        organization: string;
        position: string;
    }
    biography: string;
    image: string;
}