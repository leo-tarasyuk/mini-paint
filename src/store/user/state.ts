import { Pictures } from "../../types";

export type State = {
  user: string;
  pictures: Array<Pictures>;
};

export const state: State = {
  user: "",
  pictures: []
};
