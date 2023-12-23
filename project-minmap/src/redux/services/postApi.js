import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { usePathname } from "next/navigation";
const pathName = usePathname();

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${pathName}`,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
    }),
    addPost: builder.mutation({
      query: (data) => {
        return {
          url: `/posts`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
