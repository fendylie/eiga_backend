interface IResponse<T = any> {
  message: string;
  data: T;
}

export const useResponse = ({ message, data }): IResponse => {
  return {
    message: message,
    data: data,
  };
};
