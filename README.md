---
title: mr-pumpkin server side
---
# mr-pumpkin server side
###### tags: `side project doc`

## Introduction
This repository is the server side of mr-pumpkin, which is an application for memorizing vocabulary. I use node js as my programming language, also I build my server using express.
Client side can https to connect to this server.

## Run
`npm run devStart`

## dependency 
- node js
- express
- mongodb
- jwt


## http api
### users
- `GET` /users : list all user
- `GET` /users/:uid/books : list all books of a user.
- `POST` /users : create a new user 

### books
- `GET` /books/:bid/details : get details of the book.
- `POST` /books : create a book for a user
    - uid 
    - bookName
    - words
- `PUT` /books/:bid/bookname : update only bookname
- `PUT` /books/:bid/words : update the book's words, including adding, deleting and updating words, (reordering words.(--pending))
    - bookName
    - words
        - word
        - definition
        - type [create, update, delete]
        - wordId (only delete and update needs)
- `PUT`/books/:bid/setting: update the book's privacy setting (--pending)
- `DELETE` /books/:bid : delete a book
    - bookId
### words
-  `GET` /words : list all words
-  `GET` /words/:bid : list all words of a book (x)
-  `POST` /words : add a word to a book (x)

### authentication
- `GET` /login
- `GET` /logout
- `GET` /token : get new access token.

## Function Details
This server supports several functions.
1. Altering the content of a book.
    - adding/updating/deleting words
    - reordering word
    - changing book names
    - updating the privacy setting of the book
2. Login system (--pending)
    - verifing the identity
    - sending emails 
3. Personal Profile
    - classify books
    - adding some personal signature
4. Searching data (--pending)
    - searching a specific word
    - searching for others' book
5. Record each book's information (--pending)
    - last open/modify time
    - tags 


## database architecture
- user schema
| userName | password | email |
| -------- | -------- | -------- |
| string | string | string |

- books schema
| bookName | belongerId | tags |
| -------- | -------- | -------- |
| string | string | [] |

- word schema
| word | definition | bookId |
| ---- | ---------- | ------ |

## middleware
### access-controller
### error-handler
this module just log the error massage.