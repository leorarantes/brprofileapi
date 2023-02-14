# BRUserAPI 📋

## Description

BRUserAPI lets you register and retrieve fake Brazilian user profiles (valid CPF's only).

```url
https://bruserapi-back.vercel.app/
```

## Usage

## 1. POST /users

This endpoint is used to register a new user in the database.

### Request body format (example):

```javascript
{
  name: "Teste",
  cpf: "11144477735",
  dateOfBirth: "01/01/2000"
}
```

### Possible errors:


<pre class="brush: javascript">Status: <span    style="color:red">409 Conflict</span>
</pre>

<pre class="brush: javascript">Status: <span    style="color:red">422 Unprocessable Entity</span>
</pre>


## 2. GET /users

This endpoint is used to retrieve an array of users using pagination.

### Request body format (example):

```javascript
{
  pageNumber: 1,
  pageSize: 2
}
```

### Response body format (example):

```json
[
  {
    "id": 1,
    "name": "Teste",
    "cpf": "11144477735",
    "dateOfBirth": "2000-01-01T00:00:00.000Z"
  }
]
```

### Possible errors:

<pre class="brush: javascript">Status: <span    style="color:red">422 Unprocessable Entity</span>
</pre>


## 3. GET /users/cpf
    
This endpoint is used to retrieve users by CPF.

### Request body format:

```javascript
{
  cpf: "11144477735"
}
```
    
### Response body format:

```json
[
  {
    "id": 1,
    "name": "Teste",
    "cpf": "11144477735",
    "dateOfBirth": "2000-01-01T00:00:00.000Z"
  }
]
```

### Possible errors:

<pre class="brush: javascript">Status: <span    style="color:red">422 Unprocessable Entity</span>
</pre>

## Note

- All requests must be sent with a Content-Type header with a value of "application/json".
- All responses will be in JSON format.