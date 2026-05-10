import axios, { type AxiosRequestConfig, type AxiosError } from "axios";

export const AXIOS_INSTANCE = axios.create({
  // 必要に応じて設定
});

// Orvalが期待する「キャンセル機能付きPromise」の型を定義
export type PromiseWithCancel<T> = Promise<T> & { cancel?: () => void };

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): PromiseWithCancel<T> => {
  const source = axios.CancelToken.source();

  // 1. まず普通のPromiseとして作成
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
    /**
     * GASへPOSTする際、
     * axiosが勝手にJSON化するので
     * stringへ変換して送る
     * GASはOPTIONSリクエストに弱いため、手動でtextとして送信
     */
    data:
      typeof config.data === "object"
        ? JSON.stringify(config.data)
        : config.data,
  }).then(({ data }) => data) as PromiseWithCancel<T>; // 2. 型をキャスト

  // 3. cancelメソッドを付与
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
