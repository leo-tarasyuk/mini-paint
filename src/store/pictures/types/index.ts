import { Pictures, UserParameters } from "./../../../types";

export type PicturesState = {
  pictures: Array<Pictures>;
  user: UserParameters | null;
};