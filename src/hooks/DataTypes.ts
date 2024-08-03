export type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

export type OTPFormData = {
  email: string;
  otp: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type USERTypes = {
  user: {
    email: string;
    username: string;
    _id: string;
  };
  message: string;
};

export type MovieTypes = {
  Actors: string[];
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Title: string;
  Writer: string[];
  Year: number;
  imdbID: string;
  imdbRating: number;
  imdbVotes: string;
  response: boolean;
  type: string;
  __v: number;
  _id: string;
};
