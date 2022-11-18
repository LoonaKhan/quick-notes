# API REQUESTS
- This is all the documentation for using our api requests.
- If your trying to store and send data to the server via html, I'd probably use it with javascript to store variables and the like
- I'm not a frontend expert tho, So I reccomend googling how to make api requests in html/js
- FYI:  if you see [server_url] in a request, it means the url we are hosting the server on. It might change when we present it, so i'd reccomend saving it to a file somewhere.
- - normally server_url = http://localhost:4000
- All info needed on the html form are listed under each method
- All fields are mandatory unless otherwise stated


## User API Requests:

### Create a User
- used when you sign a user up

``ACTION = [server_url]+/api/users/create``

``METHOD=POST``

`` FIELDS:``
```json lines
{
  "username": "", // any text
  "password": "", // any text
  "dark_mode": true, // boolean
  "avatar": 1, // int. corresponds to an avatar
}
```

### Get a User
- Once you log a user in or create their account, you want to use this to keep track of their data.
- Returns all user fields

``ACTION = [server_url]+/api/users/``

``METHOD = GET``

`` FIELDS:``
```json lines
{
  "username": "", // any text
  "password": "" // any text
}
```
RETURNS:
```json lines
{
  "id": 1,
  "username": "loona",
  "dark_mode": true,
  "avatar": 1,
  "password": "123",
  "createdAt": "2022-11-18T00:12:19.823Z",
  "updatedAt": "2022-11-18T00:12:19.823Z"
}
```

### Change a User's password
- must specify user by id
- but dw, you already have the user loaded in the browser, it contains an id, so you can store and use that

``ACTION = [server_url]+/api/users/edit/password/[user_id]``

``METHOD = PUT`` 

`` FIELDS:``
```json lines
{
  "password": "" // any text
}
```

### Change a User's theme
- set it to dark or light
- requires user id

``ACTION = server_url]+/api/users/edit/dark_mode/[user_id]``

``METHOD = PUT``

`` FIELDS:``
```json lines
{
  "dark_mode": true // boolean. true for dark, false for light
}
```

### Delete a User
- You probably wont ever need this since we havent decided on deletion
- specify user id in the url

``ACTION = server_url]+/api/users/del/[user_id]``

``METHOD = DELETE``


## Folders API Requests:


## Notes API Requests: