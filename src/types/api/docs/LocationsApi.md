# LocationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**locationsControllerCreate**](#locationscontrollercreate) | **POST** /location | Create a new location|
|[**locationsControllerDelete**](#locationscontrollerdelete) | **DELETE** /location/{id} | Delete location by id|
|[**locationsControllerFindAll**](#locationscontrollerfindall) | **GET** /location | Get list of locations|
|[**locationsControllerFindAllGuessed**](#locationscontrollerfindallguessed) | **GET** /location/guessed | Get list of guessed locations|
|[**locationsControllerFindMyUploaded**](#locationscontrollerfindmyuploaded) | **GET** /location/me | Get my added locations|
|[**locationsControllerFindOne**](#locationscontrollerfindone) | **GET** /location/{id} | Get a location by id|
|[**locationsControllerGetMyGuesses**](#locationscontrollergetmyguesses) | **GET** /location/guesses/me | Get my best guessed locations|
|[**locationsControllerGetRandom**](#locationscontrollergetrandom) | **GET** /location/random | Get a random location|
|[**locationsControllerGuess**](#locationscontrollerguess) | **POST** /location/guess/{id} | Guess the location|
|[**locationsControllerUpdate**](#locationscontrollerupdate) | **PATCH** /location/{id} | Update your own location|

# **locationsControllerCreate**
> locationsControllerCreate(createLocationDto)


### Example

```typescript
import {
    LocationsApi,
    Configuration,
    CreateLocationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let createLocationDto: CreateLocationDto; //

const { status, data } = await apiInstance.locationsControllerCreate(
    createLocationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLocationDto** | **CreateLocationDto**|  | |


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

# **locationsControllerDelete**
> locationsControllerDelete()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.locationsControllerDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **locationsControllerFindAll**
> PaginatedLocationResponseDto locationsControllerFindAll()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.locationsControllerFindAll(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedLocationResponseDto**

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

# **locationsControllerFindAllGuessed**
> PaginatedLocationResponseDto locationsControllerFindAllGuessed()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.locationsControllerFindAllGuessed(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedLocationResponseDto**

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

# **locationsControllerFindMyUploaded**
> PaginatedLocationResponseDto locationsControllerFindMyUploaded()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.locationsControllerFindMyUploaded(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedLocationResponseDto**

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

# **locationsControllerFindOne**
> LocationResponseDto locationsControllerFindOne()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.locationsControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LocationResponseDto**

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

# **locationsControllerGetMyGuesses**
> PaginatedLocationResponseDto locationsControllerGetMyGuesses()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.locationsControllerGetMyGuesses(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PaginatedLocationResponseDto**

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

# **locationsControllerGetRandom**
> LocationResponseDto locationsControllerGetRandom()


### Example

```typescript
import {
    LocationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

const { status, data } = await apiInstance.locationsControllerGetRandom();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LocationResponseDto**

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

# **locationsControllerGuess**
> GuessResultResponseDto locationsControllerGuess(guessLocationDto)


### Example

```typescript
import {
    LocationsApi,
    Configuration,
    GuessLocationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let id: string; // (default to undefined)
let guessLocationDto: GuessLocationDto; //

const { status, data } = await apiInstance.locationsControllerGuess(
    id,
    guessLocationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **guessLocationDto** | **GuessLocationDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GuessResultResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **locationsControllerUpdate**
> LocationResponseDto locationsControllerUpdate(updateLocationDto)


### Example

```typescript
import {
    LocationsApi,
    Configuration,
    UpdateLocationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationsApi(configuration);

let id: string; // (default to undefined)
let updateLocationDto: UpdateLocationDto; //

const { status, data } = await apiInstance.locationsControllerUpdate(
    id,
    updateLocationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateLocationDto** | **UpdateLocationDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**LocationResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

