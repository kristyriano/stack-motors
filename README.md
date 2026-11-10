# Stack Motors – Used Car Inventory

COMP229 Web Application Development (Section 404) · Centennial College · Team Stack Motors
Kristy Riano (UI / Front-End) · Shuai Ju (Back-End / Database)

A MERN stack web app where users register, sign in, and add, view, edit and delete used car listings.

## Project structure
```
stack-motors/
├── client/                 React (Vite) front end
│   └── src/
│       ├── api/api.js          fetch calls to the API
│       ├── auth/               JWT helper, AuthContext, PrivateRoute
│       ├── components/         Navbar, Hero, VehicleCard, Footer…
│       └── pages/              Home, Signin, Signup, Inventory, VehicleForm
└── server/                 Express + Node.js API (MVC)
    ├── config/config.js
    ├── models/             user.model.js, vehicle.model.js
    ├── controllers/        user, auth, vehicle controllers
    ├── routes/             user, auth, vehicle routes
    ├── postman/            Postman collection (25 requests, 37 tests)
    ├── app.js
    └── server.js
```

## Run it locally
1. **Server**
   ```bash
   cd server
   npm install
   cp .env.example .env      # paste your MongoDB Atlas connection string and a JWT secret
   npm run dev               # http://localhost:3000
   ```
2. **Client** (second terminal)
   ```bash
   cd client
   npm install
   npm run dev               # http://localhost:5173
   ```
   Vite forwards `/api` and `/auth` calls to the server on port 3000.

## API
| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/users | – (register) |
| GET | /api/users | token |
| GET | /api/users/:userId | token |
| PUT / DELETE | /api/users/:userId | token, owner or admin |
| POST | /auth/signin | – (returns JWT) |
| GET | /auth/signout | – |
| GET | /api/vehicles (`?status=Available`, `?make=Toyota`) | – |
| GET | /api/vehicles/:vehicleId | – |
| POST | /api/vehicles | token |
| PUT / DELETE | /api/vehicles/:vehicleId | token, owner or admin |

## Testing the API
Import `server/postman/StackMotors_API.postman_collection.json` in Postman and run the whole collection with the **Runner** while the server is running.
