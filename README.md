# Created BY  NOTJS Team 


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# Documentation

## End point

```sh
https://notjs-backend.herokuapp.com/
```



# Users

### Get All User

end point 

```http
GET /users
```

 Response example


```json
[
  {
        "_id": "5fe500a29998225f224d9d96",
        "name": "kobe",
        "email": "kobe@gmail.com",
        "password": "$2b$10$YyHlpygguUSmMTDwTxGy3usCzGUIxie4FgoZHw0HarCVcexqlebUO",
        "role": "student",
        "__v": 0
}
  ]
```

### 

## Documents

### Generate Signed Link

end point 
```http
POST /documents/upload
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
    "fileName":"document.pdf"
}
```

### Upload File

end point 
```http
PUT signedUrl
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/pdf` |
| `x-ms-blob-type`  | `BlockBlob` |
| `Content-Length`  | `********` |

# Sessions

### Create Session

end point 

```http
POST /pfe-session
```

| headers        | value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

 body example


```json
{
    "name":"Janvier 2020",
    "start":"2020-01-01T09:43:49.000+00:00"
}
```

### Get All Session

end point 

```http
GET /pfe-session
```

 Response example


```json
[
    {
        "_id": "600b1d088acf98de11babb5d",
        "name": "october 2020",
        "start": "2020-10-01T09:43:49.000Z",
        "__v": 0
    },
]
```

### 

# Tags

### Create Tag

end point 

```http
POST /tag
```

| headers        | value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

 body example


```json
{
    "name":"Engineering",
}
```



### Get All Tags

end point 

```http
GET /tag
```

 Response example


```json
[
    {
        "_id": "600b2a97a3a19ae36d373f01",
        "name": "Engineering",
        "__v": 0
    },
    {
        "_id": "600b2aaea3a19ae36d373f02",
        "name": "Flutter",
        "__v": 0
    }
]
```

### 

# PFE

### Create PFE

end point 

```http
POST /pfe
```

| headers        | value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

 body example


```json
{
    "student":"5fe500a29998225f224d9d96",  
    "session":"600b1d088acf98de11babb5d"
}
```

### Update PFE

end point 

```http
Put /pfe/:pfe_id
```

| headers        | value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

 body example


```json
{
    "title":"5fe500a29998225f224d9d96",  
    "fileUrl":"600b1d088acf98de11babb5d",

}
```

### 

### Get All PFE

end point 

```http
GET /pfe
```

 Response example


```json
[
    {
        "status": 0,
        "tags": [],
        "_id": "600b26f04314b5e1bc0c773a",
        "student": "5fe500a29998225f224d9d96",
        "session": "600b1d088acf98de11babb5d",
        "__v": 0
    },
]
```
### Get PFE By Session

end point 

```http
GET /pfe/session
```
body example
```json

    {
        "session": "600b1d088acf98de11babb5d"
    }
```

 Response example


```json
[
    {
        "status": 0,
        "tags": [],
        "_id": "600b26f04314b5e1bc0c773a",
        "student": "5fe500a29998225f224d9d96",
        "session": "600b1d088acf98de11babb5d",
        "__v": 0
    },
]
```
### Add Tag to PFE

end point 

```http
PUT /pfe/:pfe_id/tag/:tag_id
```

 Response example


```json
{
    "status": 0,
    "tags": [
        "600b2a97a3a19ae36d373f01"
    ],
    "_id": "600b26f04314b5e1bc0c773a",
    "student": "5fe500a29998225f224d9d96",
    "session": "600b1d088acf98de11babb5d",
    "__v": 1
}
```

### Search PFE by tag:
end point
```http
GET /pfe/search
```

Expected input:
body:
```
json
{
  "tags": [
      "a","b"  // list of the ids of the tags to be used in search
      ]
}
```

Return:
List of the PFEs containing the mentionned tags.
```
json
[
    {
        ...
        "tags": [
            "a"
        ],
        ...
    },
    {
        ...
        "tags": [
            "a", "b"
        ],
        ...
    }
    
]

```


### Assign Supervisor

end point 

```http
PUT /pfe/:pfe_id/supervisor/:supervisor_id
```

 

### Update Status

end point 

```http
PUT /pfe/:pfe_id/status/:status
```

 

# Reservations

``url/reservations``

### get all reservations
```http
GET /reservations/all
```
return a list of all reservations in the following format
```
json
[
{
        "_id": "6012dab1b6c85941d6eb0c0c",
        "duration": 30,
        "date": "2008-11-11T09:39:00.000Z",
        "subject": "600b26f04314b5e1bc0c773a
    },
    ...
]
```

### get my reservations
```http
GET /reservations
```
return a list of the reservations made by the current user.
(same format as '/all')


### Create a new reservation:
```http
POST reservations
```
expected body of json request:
```
json
{
    "duration": 30,
    "date": "2009-11-11T09:39:00.000+00:00",
    "subject": "600b26f04314b5e1bc0c773a"
}
```

The user sending the request will be added to the reservation.
return:
"date reserved for duration for user"
or
"A reservation was already made for this date" 

------

### Update reservation 
```http
PUT reservations
```
expected body of json request:
```
json
{
    "_id": "6012e1fb6f244e4901d15032", // mandatory
    "duration": 30, // optional
    "date": "2009-11-11T09:39:00.000+00:00", // optional
    "subject": "600b26f04314b5e1bc0c773a" // optional
}
```
return:`Success` or `Failed`

### Delete reservation
```http
DELETE reservations
```
expected body of json request:
```
json
{
 "_id": "6012e1fb6f244e4901d15032"
}
```

The user must own the reservations to be delete.
------------------
# Get all reservations before / after a certain date:
```
http
GET reservations/date
```

```
json
{
 "before": "2018-11-11T00:00:00.000Z",
 "after": "2020-11-11T00:00:00.000Z"
}
```

return :
list of all reservations between those dates.

Api returns the following status codes in its API:

> We should change these values

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 202 | `UPDATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
