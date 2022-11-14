# Note API Calls

### GET a note (by id):
- GET /:id
- returns a note
```json
{
  "content": "",
  "author": "",
  ...
}
```

### create note
- specify title, author, folder
- returns note id

### Create a note
- POST /create/
- must specify your user, folder and the note id you wish to post
- if the folder does not exist, it will create the folder
- cannot send to the inbox folder
```json
"body": {
  "uid": int, // your user id
  "folder": string,
  "content": text,
  "title": string
}
```

### Send a note to someone
- specify your user, the other user and the note id you wish to send
- the note is automatically sent to the recipient's inbox folder
```json
"body":{
  "uid": int // sender id
  "recipient": int // recipient id
  "note id": int
}
```
