export interface IAPIError {
  message?: string;
}

export interface Response<T> {
  title?: any;
  properties?: any;
  id?: any;
  data: T;
  status: string;
  error: {
    message: string;
    code: string;
  } | null;
}
