import {useUploadImagesMutation} from '../store/api/uploadApi';

export const useFileUpload = () => {
    const [upload] = useUploadImagesMutation();

    const uploadSingle = async (file: File): Promise<string> => {
        const result = await upload([file]).unwrap();
        return result.images[0];
    };

    const uploadMultiple = async (files: File[]): Promise<string[]> => {
        const result = await upload(files).unwrap();
        return result.images;
    };

    return {uploadSingle, uploadMultiple};
};