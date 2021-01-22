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

### Add Tag to PFE

end point 

```http
GET /pfe/:pfe_id/tag/:tag_id
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

### 

------



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
