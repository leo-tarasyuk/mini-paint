export type State = {
  user: string;
  error: string;
  picture: Record<string, string>;
  pictures: Array<Record<string, string>>;
};

export const state: State = {
  user: "",
  error: "",
  picture: {},
  pictures: []
};
