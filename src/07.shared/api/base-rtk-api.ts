import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { HASH } from "../const";
import { authApi } from "./auth";
import cookie from "../lib/cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
  prepareHeaders: (headers) => {
    const token = cookie.getCookie("token");
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const nextBaseQuery = fetchBaseQuery({
  fetchFn: fetch,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const _privateBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const hash = window.Telegram.WebApp.initData || HASH;
    const token = await authApi.refresh(hash);
    if (token) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      //   api.dispatch(userOperations.logout());
    }
  }
  return result;
};

const _nextBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await nextBaseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   const token = await authApi.refresh();
  //   if (token) {
  //     result = await nextBaseQuery(args, api, extraOptions);
  //   } else {
  //     //   api.dispatch(userOperations.logout());
  //   }
  // }
  return result;
};

const publicBaseQuery = fetchBaseQuery({
  fetchFn: fetch,
  baseUrl: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
});

const privateBaseQuery = _privateBaseQuery;
const nextProtectedBaseQuery = _nextBaseQuery;

export { nextProtectedBaseQuery, privateBaseQuery, publicBaseQuery };
