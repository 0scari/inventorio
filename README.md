## RESTful APIs

#### Requirements:

- NodeJS runtime

#### To run:

- `npm install`
- `npm start`

## API Examples

####`POST /store`

**Request**  'Content-Type', 'application/json'
``` json
{
        "StoreId": 99305,
        "Sale": [
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 2
            }
        ],
        "Refund": [
            {
                "ItemName": "Shorts",
                "ItemId": 364422297782,
                "Quantity": 1
            }
        ],
        "Delivery": [
            {
                "ItemName": "Polo-shirt",
                "ItemId": 464368907499,
                "Quantity": 100
            },
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 75

            }
        ]
    }
```

**Response** Status Code: 201 Created
 
#### `GET /store/99305`

**Response**  Status Code: 200 OK

``` json
{
   "_id":"5fc4d7e3cfefeabdb45ab4d2",
   "StoreId":99305,
   "Polo-shirt":{
      "ItemId":464368907499,
      "Quantity":100
   },
   "Shorts":{
      "ItemId":364422297782,
      "Quantity":1
   },
   "T-shirt":{
      "ItemId":728392017342,
      "Quantity":73
   }
}
```

#### `PUT /stores`
**Request**  'Content-Type', 'application/json'
``` json
[{
        "StoreId": 99305,
        "Sale": [
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 2
            }
        ],
        "Refund": [
            {
                "ItemName": "Shorts",
                "ItemId": 364422297782,
                "Quantity": 1
            }
        ],
        "Delivery": [
            {
                "ItemName": "Polo-shirt",
                "ItemId": 464368907499,
                "Quantity": 100
            },
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 75

            }
        ]
    },
{
        "StoreId": 99306,
        "Sale": [
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 2
            }
        ],
        "Refund": [
            {
                "ItemName": "Shorts",
                "ItemId": 364422297782,
                "Quantity": 1
            }
        ],
        "Delivery": [
            {
                "ItemName": "Polo-shirt",
                "ItemId": 464368907499,
                "Quantity": 100
            },
            {
                "ItemName": "T-shirt",
                "ItemId": 728392017342,
                "Quantity": 75

            }
        ]
    }]
```

**Response**  Status Code: 200 OK

``` json
{"ok":[99305],"errors":[{"id":99306,"reason":"NOT_FOUND"}]}
```

#### `DELETE /store/99305`
**Response**  Status Code: 200 OK
