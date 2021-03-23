import { Picture, Pictures } from "../types";

export type State = {
  user: string;
  error: string;
  picture: Picture;
  pictures: Array<Pictures>;
};

export const state: State = {
  user: "",
  error: "",
  picture: {
    img: "",
    name: ""
  },
  pictures: []
};
