import { UserParameters } from "./../../../types";

export type UserState = {
    user: string;
    userParams: UserParameters | null;
};