import { ErrorResponseType } from './errorHandlerTypes';

const dev = import.meta.env.VITE_APP_NODE_ENV !== 'production';

export const loginErrorHandler = (err: ErrorResponseType): string => {
  if (dev) console.log(err);

  if (err?.data?.message) return err.data.message;

  if (!err?.originalStatus) {
    // isLoading: true until the timeout occurs
    return 'No Server Response';
  } else if (err?.originalStatus === 400) {
    return 'Missing Username or Password';
  } else if (err?.originalStatus === 401) {
    return 'Unauthorized';
  } else {
    return 'Login Failed';
  }
};


