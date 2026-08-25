# UploadsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**uploadsControllerUploadImage**](#uploadscontrolleruploadimage) | **POST** /uploads/images | Upload image for location|

# **uploadsControllerUploadImage**
> UploadResponseDto uploadsControllerUploadImage()


### Example

```typescript
import {
    UploadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UploadsApi(configuration);

let images: Array<File>; //Upload location image (default to undefined)

const { status, data } = await apiInstance.uploadsControllerUploadImage(
    images
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **images** | **Array&lt;File&gt;** | Upload location image | defaults to undefined|


### Return type

**UploadResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**201** | The image have been successfully uploaded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

