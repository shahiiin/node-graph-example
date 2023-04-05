### How to use:

- set mongodb config from .env file
- run npm install
- run npm start

now open: http://localhost:4001/graphql and send request


--------

#### Description

* register user
```
 mutation {
   register(input: {name: "iman", email: "imDaFFFDn@gmail.com", password: "123456"}) {
    name
    email
   }
 }
```


* login user
``` 
 mutation {
   login(input: { email: "imo@gmail.com", password: "123456"}) {
     status
     access_token

   }
 }
```


* list of users
``` 
 {
   users {
     name
     email
   }
 }
```


* send message to selected user 
``` 
 mutation{
   sendMessage(input: {title: "this is a test", body: "hello my firend", receiver: "shahi@gmail.com"}) {
     status
     id
   }
 }
```


* list of message that send to selected user (email is required)
``` 
 {
   messagesList(email:"shahi@gmail.com") {
     seen
     body
     title
   }
 }
```







