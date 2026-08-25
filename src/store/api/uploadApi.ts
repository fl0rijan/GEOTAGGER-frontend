import {baseApi} from './baseApi';
import type {UploadResponseDto} from "../../types/api";

export const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadImages: builder.mutation<UploadResponseDto, File[]>({
            query: (files) => {
                const formData = new FormData();

                files.forEach((file) => {
                    formData.append('images', file);
                });

                return {
                    url: '/uploads/images',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {useUploadImagesMutation} = uploadApi;