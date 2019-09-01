# Track Your Coins - BackEnd API

Track Your Coins (TYC) allows you to keep daily logs of your expenses. You can simple log into the app, submit your expenses for that day and keep it moving. At the end of the month, you will be able to see how much you've spent, and whether you spent more than you earned for that month.

[_Deployed APP_](add link here)

---

## API Documentation

**BASE URL** (add base heroku url here once deployed)

- Note: attach the base url to all endpoints

#### UNPROTECTED ENDPOINTS

| Links                                   | Endpoints            |
| --------------------------------------- | -------------------- |
| [POST Registration](#post-registration) | `/api/auth/register` |
| [POST Login](#post-login)               | `/api/auth/login`    |

### [POST] Registration

#### URL: (add url for register endpoint)

This endpoint will return an object with user id, username, password, first_name (optional) and last_name (optional). The password will be a long incomprehensible string, because it is hashed. Example:

```javascript
{
  "id": 8,
  "username": "KDoe",
  "password": "hashedPassword",
  "first_name": "Karen",
  "last_name": "Doe"
}
```

### [POST] Login

#### URL: (add url for login endpoint)

This endpoint will return an object with a welcome message, user id, username and a token. The token is required for authentication and needs to be saved to local storage in order for the user to continue to protected routes. Example:

```javascript
{
  "message": "Nice to see you Robert!",
  "token": "eyJhbGciOiJIUzI1NiIsInCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJSb2JlcnQiLCJpYXQiOjE1NjDExMzYsImV4cCI6MTU2NzM4NzUzNn0.nQ4vtgEPQ6BgVZWcw69i_ZmpTxZy55ldB2D7m618",
  "user_id": 6,
  "username": "Robert"
}
```

---

---

#### PROTECTED ENDPOINTS

#### The endpoints below require a token. Be sure to save it!

| Links                   | Endpoints               |
| ----------------------- | ----------------------- |
| [GET All Users](#)      | `/api/users`            |
| [GET User by ID](#)     | `/api/users/:id`        |
| [GET All Expenses](#)   | `/api/expenses`         |
| [GET Expenses by ID](#) | `/api/expenses/:id`     |
| [GET User Expenses](#)  | `/api/user/:id/expense` |
| [GET All Income](#)     | `/api/income`           |
| [GET Income by ID](#)   | `/api/income/:id`       |
| [GET User Income](#)    | `/api/user/:id/income`  |
