# System Reference for online library service

## List of availabe modules
### Model-oriented
1. /books

### Service-oriented
2. /login
3. /logout

# Modules in-depth
<details>
<summary>1. /books</summary>

# List books
GET /books
## Return value
Array of `book`

---
# Get book
GET /books/{id}
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
## Return value

A deleted `book` object
HTTP 404 with empty body on missing book

## Arguments
| Path arguments | |
--- | --- 
*id* | `id of book`

</details>

# Models in-depth
book