# TrackerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**trackerControllerGetLogs**](#trackercontrollergetlogs) | **GET** /tracker/admin/logs | ADMIN ONLY: View last 100 tracking logs|
|[**trackerControllerLogAction**](#trackercontrollerlogaction) | **POST** /tracker | |

# **trackerControllerGetLogs**
> Array<ActionLogResponseDto> trackerControllerGetLogs()


### Example

```typescript
import {
    TrackerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrackerApi(configuration);

const { status, data } = await apiInstance.trackerControllerGetLogs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ActionLogResponseDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **trackerControllerLogAction**
> trackerControllerLogAction(createActionLogDto)


### Example

```typescript
import {
    TrackerApi,
    Configuration,
    CreateActionLogDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TrackerApi(configuration);

let createActionLogDto: CreateActionLogDto; //

const { status, data } = await apiInstance.trackerControllerLogAction(
    createActionLogDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createActionLogDto** | **CreateActionLogDto**|  | |


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

