# System Reference for online library service

---
# Authorization
todo: don't know how it works
based on user's role
after login, user receives token
authorization based on token

On lack of privileges:
HTTP 403 with empty body

---
# List of availabe modules
### Model-oriented
1. /books

### Service-oriented
2. /auth

---
# Modules
<details>
<summary>1. /books</summary>

# List books
GET /books
> Requirements: None
## Return value
Array of `book`

---
# Get book
GET /books/{id}
> Requirements: None
## Return value

A `book` object
HTTP 404 with empty body on missing book

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

---
# Create book
POST /books
> Requirements: Role(admin)
## Return value

A newly created `book` object
HTTP 400 with empty body on bad arguments

## Arguments
| Body arguments | |
--- | --- 
*name* | `Name of a book`
*author* | `Name of an author`
*isbn* | `Isbn of a book`
*count* | `Number of available copies`

---
# Update book
PUT /books/{id}
> Requirements: Role(admin)
## Return value

An updated `book` object
HTTP 400 with empty body on bad arguments

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

| Body arguments | | |
--- | --- | ---
*name* | `Name of a book` | *Optional*
*author* | `Name of an author` | *Optional*
*isbn* | `Isbn of a book` | *Optional*
*count* | `Number of available copies` | *Optional*

---
# Delete book
DELETE /books/{id}
> Requirements: Role(admin)
## Return value

A deleted `book` object
HTTP 404 with empty body on missing book

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

# Claim book
POST /books/{id}/claim
> Requirements: Role(user)
## Return value

Claimed `book` object
HTTP 400 with empty body on bad arguments
HTTP 410 with empty body on book not available

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

# Return book
POST /books/{id}/return
> Requirements: Role(user)
## Return value

Returned `book` object
HTTP 400 with empty body on bad arguments
HTTP 404 with empty body on user does not own book

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

</details>

<details>
<summary>2. auth</summary>

# Login
POST /auth/login
> Requirements: None
## Return value

A `login_token` object
HTTP 400 with empty body on bad arguments
Redirects to home page

## Arguments
| Body arguments | |
--- | --- 
*login* | `username/login` 
*password* | `user's password`

# Logout
POST /auth/logout
> Requirements: Role(user)
## Return value

Empty body
Redirects to home page

</details>

---
# Models
## `book`
| Name | description |
--- | --- 
*id* | `id of book`
*name* | `Name of a book` 
*author* | `Name of an author`
*isbn* | `Isbn of a book` 
*count* | `Number of available copies` 

---

## `user`
| Name | description |
--- | --- 
*id* | `id of user`
*login* | `username/login` 
*pass_hash* | `user's password hash`
*login_token* | `token used for authorization` 
*last_login* | `DateTime of user's alst login` 
*role* | `user privileges`

## `user_book`
| Name | description |
--- | --- 
*user_id* | `id of user`
*book_id* | `id of book` 
*timestamp* | `DateTime of when book was borrowed`

---
# Schemas
1. books - database of `book` objects
2. users - database of `user` objects
3. users_books - database of `user_book` objects

---
# Definitions
## DateTime
A string containing inforamtion about time and date.
Format: yyyy-MM-dd-HH-mm-ss

## Role
A string describing user's privileges.
Valid values: admin | user
