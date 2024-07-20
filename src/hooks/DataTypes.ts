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
    createdAt: string; // ISO 8601 string
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    updatedAt: string; // ISO 8601 string
    username: string;
    __v: number;
    _id: string; // ObjectId as a string
  };
  message: string;
};
