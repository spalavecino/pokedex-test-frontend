import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const initAxios = () => {
  Axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';
  const unexpetedErrorCodes = [0, 500];
  const logoutErrorCodes = [401];

  const responseHandler = (response: AxiosResponse) => {
    /* response = dateInterceptor(response);
    if (!(response.config as any).background) dispatch(loadingOff()); */
    return response;
  };

  const errorHandler = (error: any) => {
    const response = responseHandler(error.response);

    if (logoutErrorCodes.includes(response.status)) {
      /* dispatch(fullLoadingOff());
      return logout(); */
    }
    if (!response.status || unexpetedErrorCodes.includes(response.status)) {
      /* dispatch(setUnexpectedError()) */
    }
    return Promise.reject(error);
  };

  const requestHandler = async (request: AxiosRequestConfig) => {
    /* const token = await onRequest();
    request.headers["Authorization"] = token;
    request.headers[HEADER_CORRELATION_ID] = uuidv4();
    if (!(request as any).background) dispatch(loadingOn()); */
    return request;
  };

  /* Axios.interceptors.request.use(requestHandler); */
  Axios.interceptors.response.use(responseHandler, errorHandler);
};
