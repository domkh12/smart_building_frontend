import { apiSlice } from "../../app/api/apiSlice";

export const uploadImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/files",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApiSlice;
