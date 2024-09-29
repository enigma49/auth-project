# Auth App Backend
This project allows you to create and authenticate users.

## Project setup
#### You need to run the following command to install the dependencies.
```
npm install
```

#### You can start the server using the following command.
```
npm start
```

#### You need to create an env file using the env.example file.
#### You need to create an key.json file using the key.json.example file.

## API Reference
#### Base URL of all APIs is localhost:3000/


#### Create User

```http
POST /user/sign-up
```

```
Sample Payload
{
    "username":"ash49",
    "password":"1234",
    "email":"hamza1@test.com"
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Given Payload` | `JSON Object` | This api allows you to add user or signup in the database |

#### Login

```http
POST /auth/login
```

```
Sample Payload
{
    "email": "hamza1@test.com",
    "password": "adminh@3"
}
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Given Payload` | `JSON Object` | This api allows you to login |


#### Get User Profile

```http
GET /user/profile
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|           |          | This api returns user's data based on token |


#### Get Refresh Token

```http
POST /auth/refresh
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|           |          | This API takes refresh token from header and gives a new access token |
