# Project Name

![Cover Image](https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1anof1un5s4g6mrgbzds.gif)

## Description

This project is a web application built with **React 18.2** powered by **Vite** for the frontend, and **Node.js** with **Sequelize** for the backend. Louvetoo is a web application developed to fill the communication gap between parents and daycare centers. It enabled any parent or even grandparent to get updates of their children's activities, meals, naps and achievements at daycare. Louvetoo offers an effortless solution to daycare staff for handling children, recording daily activities, and keeping parents updated.

## Features

- **Authentication**: User registration, login, and logout with JWT tokens and cookie-based authentication.
- **Child Management**: Staff members can manage a list of children.
- **Activity Management**: Children can be associated with specific activities.
- **Dashboard**: A user interface to view children, their activities, and more.
- **Protected Routes**: Route protection implemented with **React Auth Kit**.

## Technologies Used

### Frontend:

- React 18.2 (powered by Vite)
- React Router
- React Auth Kit
- Material Tailwind
- Axios

### Backend:

- Node.js (v16.2)
- Express.js
- Sequelize (with MySQL)
- Passport.js (for authentication)

### Other:

- JWT (JSON Web Tokens)
- Cookie-based Authentication

## Prerequisites

- Node.js (version 16.2 or higher) and npm installed on your machine
- MySQL installed and configured
- A `.env` file with necessary environment variables (e.g., `DB_HOST`, `DB_USER`, `JWT_SECRET`, etc.)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/diesos/Louvetoo_V2.git
   cd Louvetoo_V2

   ```

2. **Install the dependencies for both the backend and frontend:**

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install

   ```

3. **Set up your environment variables:**
   • Create a .env file in the root of the project with your configuration.

   Backend variables (inside backend folder) :

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
JWT_SECRET=
PORT=
```

4.**Start the development server:**

```bash
npm run dev
cd frontend
npm run dev
```

## Usage

• Visit `http://localhost:3000` to access the application.
• Staff members can log in, manage children, and assign activities.
• Parent members can log in, see children activities on their dashboard after logging-in and after staff linking child to parent.

## API Endpoints

### Authentication:

• **POST** `/register`: Register a new user.

```
{
  "prenom": "John",
  "nom": "Doe",
  "email": "john.doe@example.com",
  "password": "Strong!123",
  "telephone": "1234567890",
  "role": "parent"
}
```

• **POST** `/login`: Log in a user and return a JWT token.

```
{
	"email": "john.doe@example.com",
	"password": "Strong!123"
}
```

•** POST** `/logout`: Log out the user.

### User:

•**GET** `/api/users/me`: Get the authenticated user's information.
•**GET** `/api/users/children`: Get the authenticated user's children and their activities.

### Children and Activities:

•**POST** `/api/children`: Add a new child (staff only).
•**POST** `/api/activities`: Add a new activity for a child (staff only).
•**GET** `/api/activities`: Get all activities associated with a child.

## Admin Routes

The following routes are available for staff members to manage children, users, and activities:

### Children Routes

- **GET** `/api/children/getallchildren`: Get all children
- **GET** `/api/children/getchild/:id`: Get a specific child by ID
- **GET** `/api/children/search`: Get child suggestion
- **POST** `/api/children/addchild`: Add a new child
- **PUT** `/api/children/updatechild/:id`: Update an existing child
- **DELETE** `/api/children/deletechild/:id`: Delete a child

### User Routes

- **GET** `/api/users/getallusers`: Get all users
- **GET** `/api/users/getuser/:id`: Get a specific user by ID
- **POST** `/api/users/adduser`: Add a new user
- **PUT** `/api/users/updateuser/:id`: Update an existing user
- **DELETE** `/api/users/deleteuser/:id`: Delete a user

### Activities Routes

- **GET** `/api/activites/getallactivites`: Get all activities
- **GET** `/api/activites/getallactivites/:id_enfant`: Get activities by child ID
- **GET** `/api/activites/getactivite/:id`: Get a specific activity by ID
- **POST** `/api/activites/addactivite`: Add a new activity
- **PUT** `/api/activites/updateactivite/:id`: Update an existing activity
- **DELETE** `/api/activites/deleteactivite/:id`: Delete an activity

### Associate Child Route

- **POST** `/api/admin/associate-child`: Associate a child with a user

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Improvment roadmap :

- Add roles based routes for staff
- Improve mobile view
- Improve UI
- Create tests
