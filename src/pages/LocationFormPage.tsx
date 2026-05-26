import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {locationSchema, type LocationFields} from '../lib/validations';
import {useCreateLocationMutation, useGetLocationQuery, useUpdateLocationMutation} from '../store/api/locationApi';
import {useFileUpload} from '../hooks/useFileUpload';

import {Input} from '../components/ui/Input';
import Button from '../components/ui/Button';
import {GoogleMap} from '../components/ui/GoogleMap';
import {ImageUpload} from "../components/ui/ImagUpload.tsx";

const LocationFormPage = () => {
    const {id} = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const {uploadSingle} = useFileUpload();

    const [isUploading, setIsUploading] = useState(false);
    const [createLocation, {isLoading: isCreating}] = useCreateLocationMutation();
    const [updateLocation, {isLoading: isUpdating}] = useUpdateLocationMutation();

    const {data: existingData, isLoading: isFetching} = useGetLocationQuery(id!, {skip: !isEditMode});

    const {register, handleSubmit, setValue, reset, control, formState: {errors}} = useForm<LocationFields>({
        resolver: zodResolver(locationSchema),
        defaultValues: {name: '', imageUrl: '', latitude: 46.0569, longitude: 14.5058}
    });

    const imageUrl = useWatch({ control, name: 'imageUrl' });
    const lat = useWatch({ control, name: 'latitude' });
    const lng = useWatch({ control, name: 'longitude' });

    const markerPosition = lat && lng ? { lat: Number(lat), lng: Number(lng) } : null;

        useEffect(() => {
        if (existingData) {
            reset({
                name: existingData.name || '',
                imageUrl: existingData.imageUrl,
                latitude: existingData.latitude,
                longitude: existingData.longitude,
            });
        }
    }, [existingData, reset]);

    const handleFileChange = async (file: File | null) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await uploadSingle(file);
            setValue('imageUrl', url, {shouldValidate: true});
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data: LocationFields) => {
        try {
            if (isEditMode) {
                await updateLocation({id: id!, dto: data}).unwrap();
            } else {
                await createLocation(data).unwrap();
            }
            navigate('/profile');
        } catch { /* empty */
        }
    };

    const handleMapSelection = (lat: number, lng: number, address?: string) => {
        setValue('latitude', lat);
        setValue('longitude', lng);

        if (address) {
            setValue('name', address, {shouldValidate: true});
        }
    };

    if (isFetching) return <div className="p-5 text-center">Loading...</div>;

    return (
        <div className="location-form-page">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column gap-4">

                <h2 className="fw-black text-secondary text-center">
                    {isEditMode ? 'Edit' : 'Add a new'} <span className="text-primary">location.</span>
                </h2>

                <ImageUpload
                    value={imageUrl}
                    isLoading={isUploading}
                    onChange={handleFileChange}
                    onRemove={() => setValue('imageUrl', '')}
                    error={errors.imageUrl?.message}
                />

                {!isEditMode && (<div className="space-y-2">
                    <GoogleMap
                        className="h-60 rounded-3"
                        marker={markerPosition}
                        onLocationSelect={handleMapSelection}
                    />
                    <div className="d-flex justify-content-between px-1">
                        <small className="text-muted">Lat: {lat.toFixed(4)}</small>
                        <small className="text-muted">Lng: {lng.toFixed(4)}</small>
                    </div>
                </div>)}


                <Input
                    label="Location"
                    disabled
                    error={errors.name?.message}
                    {...register('name')}
                />


                {!isEditMode ? (
                    <div className="d-flex gap-3 mt-2 align-items-center justify-content-end">
                        <Button variant="primary" type="submit" isLoading={isCreating || isUpdating}>
                            Add new
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex gap-3 mt-2 align-items-center">
                        <Button variant="primary" type="submit"
                                isLoading={isCreating || isUpdating}>
                            Save
                        </Button>
                        <Button variant="link" type="button" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                )}

            </form>
        </div>
    );
};

export default LocationFormPage;