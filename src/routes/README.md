# API REQUESTS
- This is all the documentation for using our api requests.
- If your trying to store and send data to the server via html, I'd probably use it with javascript to store variables and the like
- I'm not a frontend expert tho, So I reccomend googling how to make api requests in html/js
- FYI:  if you see [server_url] in a request, it means the url we are hosting the server on. It might change when we present it, so i'd reccomend saving it to a file somewhere.
- - normally server_url = http://localhost:4000
- All info needed on the html form are listed under each method
- All fields are mandatory unless otherwise stated
- All post methods return the created objects, so you should always have the id's to anything


## User API Requests:

### Create a User
- used when you sign a user up

``ACTION = [server_url]+/api/users/create``

``METHOD=POST``

`` FIELDS:``
```json lines
{
  "username": "loona", // any text
  "password": "123", // any text
  "dark_mode": true, // boolean
  "avatar": 1, // int. corresponds to an avatar
}
```

RETURNS:
```json lines
{
	"id": 1,
	"username": "loona",
	"password": "123",
	"dark_mode": true,
	"avatar": 1,
	"updatedAt": "2022-11-19T16:57:40.133Z",
	"createdAt": "2022-11-19T16:57:40.133Z"
}
```

### Get a User
- Once you log a user in or create their account, you want to use this to keep track of their data.
- Returns all user fields
- one thing to keep in mind, if you get a user, you can get all of their folders, if you have a folder, you can get all of its notes

``ACTION = [server_url]+/api/users/``

``METHOD = GET``

`` FIELDS:``
```json lines
{
  "username": "loona", // any text
  "password": "123" // any text
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

### Get a user by username
- going to be used when you want to retrieve a user other than the current client
- for example: sending a message to another user
- fir security reasons, only the id of that user is given

``ACTION = [server_url]+/api/users/search``

``METHOD=GET``

FIELDS:
```json lines
{
  "username": "loona"
}
```

RETURNS:
```json lines
{
	"id": 1
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
  "password": "456" // any text
}
```

### Change a User's theme
- set it to dark or light
- requires user id

``ACTION = [server_url]+/api/users/edit/dark_mode/[user_id]``

``METHOD = PUT``

`` FIELDS:``
```json lines
{
  "dark_mode": false // boolean. true for dark, false for light
}
```

### Delete a User
- You probably wont ever need this since we havent decided on deletion
- specify user id in the url

``ACTION = [server_url]+/api/users/del/[user_id]``

``METHOD = DELETE``


## Folders API Requests:

### GET a folder by name and user id
- this can be used to retrieve a folder.
- ex: creating a note and selecting which folder to place it in
- requires user id(in the url) and a name(in the form)

``ACTION = [server_url]+/api/folders/user/serach/[user_id]``

``METHOD = GET ``

``FIELDS:``
```json lines
{
  "name": "inbox" // any text 
}
```
RETURNS:
```json lines
{
  "id": 1,
  "name": "inbox",
  "createdAt": "2022-11-19T15:55:13.590Z",
  "updatedAt": "2022-11-19T15:55:13.590Z",
  "owner": 1
}
```

### Get a user's inbox
- this is basically a macro of the above method
- specifically gets the 'inbox' folder given a user
- specify the user id in the url

``ACION = [server_url]+/api/folders/user/inbox/[user_id]``

``METHOD = GET``

RETURNS:
```json lines
{
  "id": 1,
  "name": "inbox",
  "createdAt": "2022-11-19T15:55:13.590Z",
  "updatedAt": "2022-11-19T15:55:13.590Z",
  "owner": 1
}
```

### Get a folder by id
- Gets a folder by id
- probably wont need this.
- specify the folder id in the url

``ACTION = [server_url] + /api/folders/[folder_id]``

``METHOD = GET``

RETURNS:
```json lines
{
	"id": 1,
	"name": "inbox",
	"createdAt": "2022-11-19T15:55:13.590Z",
	"updatedAt": "2022-11-19T15:55:13.590Z",
	"owner": 1
}
```

### Get all a user's folders
- could be used when you load a user's homepage and display all folders
- requires user id in the url

``ACTION = [server_url]/api/folders/user/[user_id]``

``METHOD = GET``

RETURNS:
```json lines
[ // list of folders
	{
		"id": 1,
		"name": "inbox",
		"createdAt": "2022-11-19T15:55:13.590Z",
		"updatedAt": "2022-11-19T15:55:13.590Z",
		"owner": 1
	},
	{
		"id": 2,
		"name": "school",
		"createdAt": "2022-11-19T15:55:18.539Z",
		"updatedAt": "2022-11-19T15:55:18.539Z",
		"owner": 1
	},
    ...
]
```


### Create a Folder
- self explnatory
- requires a user id and name, both in the form

``ACTION = [server_url]+/api/folders/create``

``METHOD = POST``

FIELDS:
```json lines
{
  "uid": 1, // integer. representing the user id
  "name": "school" // any text
}
```

RETURNS:
```json lines
{
	"id": 2,
	"name": "school",
	"owner": 1,
	"updatedAt": "2022-11-19T16:59:40.597Z",
	"createdAt": "2022-11-19T16:59:40.597Z"
}
```

### Edit a folder's name
- requires folder id(in the url) and the name of the folder in the body

``ACTION  = [server_url]+/api/folders/edit/[folder_id]``

``METHOD = PUT``

FIELDS:
```json lines
{
  "name": "not school"
}
```

### Delete a folder
- requires folder id in the url

``ACTION= [server_url]+/api/folders/del/[folder_id]``

``METHOD = DELETE``


## Notes API Requests:

### Create a note
- creates a note with a given user as author and a given folder to store it
- requires author id, folder id, content and a title all in the form

``ACTION = [server_url]+/api/notes/create``

``METHOD = POST``

FIELDS:
```json lines
{
  "author":1, // any integer corresponding to a user
  "folder":1, // integer corresponding to a folder
  "content":"this is a new note", // any text
  "title": "new note" // any text
}
```

RETURNS:
```json lines
{
	"id": 1,
	"author": 1,
	"folder": 1,
	"content": "this is a new note",
	"title": "new note",
	"updatedAt": "2022-11-19T17:00:11.616Z",
	"createdAt": "2022-11-19T17:00:11.616Z"
}
```

### Send a note to another user
- this basically sends the same note, 
- but the only thing that changes, is the folder which is set to the recipient's inbox
- so you want to fetch the other user's inbox
- requires note id in url and folder(specifically an inbox) id in the form

``ACTION = [server_url]+/api/notes/send/[note_id]``

``METHOD = POST``

FIELDS:
```json lines
{
  "inbox": 2 // *technically*, you can use any folder, but we intend it to only send to inboxes
}
```

RETURNS:
```json lines
{
	"id": 2,
	"author": 1,
	"folder": 2, // the inbox
	"content": "this is aNOTHER NOTE",
	"title": "ANOTHER note",
	"updatedAt": "2022-11-19T17:01:09.286Z",
	"createdAt": "2022-11-19T17:01:09.286Z"
}
```

### Get all notes in a folder
- handy if you click onto a folder
- requires a folder's id in the url

``ACTION = [server_url]+/api/notes/folder/[folder_id]``

``METHOD = GET``

RETURNS:
```json lines
[ // list of notes
  {
    "id": 1,
    "content": "this is a new note",
    "title": "new note",
    "createdAt": "2022-11-19T16:23:03.331Z",
    "updatedAt": "2022-11-19T16:23:03.331Z",
    "author": 1,
    "folder": 1
  },
  {
    "id": 2,
    "content": "this is aNOTHER NOTE",
    "title": "ANOTHER note",
    "createdAt": "2022-11-19T16:41:30.763Z",
    "updatedAt": "2022-11-19T16:41:30.763Z",
    "author": 1,
    "folder": 1
  }
]
```

### Gets a note by id
- requires note id

``ACTION = [server_url]+/api/notes/[note_id]``

``METHOD = GET``

RETURNS:
```json lines
{
	"id": 1,
	"content": "this is a new note",
	"title": "new note",
	"createdAt": "2022-11-19T16:23:03.331Z",
	"updatedAt": "2022-11-19T16:23:03.331Z",
	"author": 1,
	"folder": 1
}
```

### Edit a note
- can edit the title or content
- you must specify the note id (in url) and the new title and new content(in the form)
- you have to specify both. both will be changed
- if you arent going to change the title, just send the existing one. you have the note data already, so you can pass it in.

``ACTION = [server_url]+/api/notes/edit/[note_id]``

``METHOD = PUT``

FIELDS:
```json lines
{
  "content": "this is new content",
  "title": "new note" // i just passed in the old title because i dont want to change it
}
```

### Delete a note
- requires note id

``ACTION = [server_url]+/api/notes/del/[note_id]``

``METHOD = DELETE``