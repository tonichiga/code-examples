import { publicBaseQuery } from "@/07.shared/api";

import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseDataWithPagination } from "../types";
import { JSONPlaceholderPost } from "@/07.shared/types";

export const infiniteScrollQueryApi = createApi({
  reducerPath: "infinityScroll",
  baseQuery: publicBaseQuery,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<
      ResponseDataWithPagination<JSONPlaceholderPost>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `posts?_page=${page}&_limit=${limit}`,
        method: "GET",
      }),

      transformResponse: (response: JSONPlaceholderPost[]) => {
        return {
          hasNextPage: true,
          maximumPages: 10,
          data: response,
        };
      },

      providesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery } = infiniteScrollQueryApi;
