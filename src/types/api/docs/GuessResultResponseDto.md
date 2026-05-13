# GuessResultResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**distanceMeters** | **number** | Distance from the target in meters | [default to undefined]
**pointsDeducted** | **number** | How many points were removed from user | [default to undefined]
**attemptNumber** | **number** | Current attempt number for this location | [default to undefined]
**remainingPoints** | **number** | User balance after this guess | [default to undefined]
**actualLatitude** | **number** |  | [optional] [default to undefined]
**actualLongitude** | **number** |  | [optional] [default to undefined]
**locationName** | **string** | City center | [optional] [default to undefined]

## Example

```typescript
import { GuessResultResponseDto } from './api';

const instance: GuessResultResponseDto = {
    distanceMeters,
    pointsDeducted,
    attemptNumber,
    remainingPoints,
    actualLatitude,
    actualLongitude,
    locationName,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
