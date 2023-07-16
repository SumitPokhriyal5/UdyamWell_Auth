# UdyamWell - User Registration and Login System

The UdyamWell platform aims to provide a user-friendly and secure user registration and login system. This system allows users to register, log in, and access various features while adhering to industry best practices.

## Features🚀

The user registration and login system for UdyamWell includes the following functionalities:

1. **User Registration Form**: A user-friendly registration form with validation for name, email, password, and contact number.

2. **Login Form with Authentication**: A secure login form that authenticates user credentials and encrypts passwords for enhanced security.

3. **User Database**: A MongoDB database to store registered user information securely.

4. **Password Reset Functionality**: Password reset functionality through email verification, allowing users to set a new password securely.

5. **Password Strength Indicator**: Password strength indicator to guide users in choosing strong passwords.
   
6. **Responsive design**: Responsive design for optimal viewing experience across devices

## Tech Stack🔥<br/>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SCSS](https://img.shields.io/badge/scss-%231572B6.svg?style=for-the-badge&logo=scss&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Frontend

The frontend of UdyamWell is built using modern technologies and libraries to provide a seamless user experience:

- **React**: JavaScript library for building user interfaces.
- **Chakra UI**: A simple and modular UI component library for React applications.
- **Emotion**: A popular library for styling React components with CSS-in-JS.
- **Framer Motion**: A library for creating animations and motion design in React applications.
- **Axios**: A popular HTTP client for making API requests.

### Backend

The backend of UdyamWell is developed using Node.js and Express.js, along with MongoDB as the database:

- **Node.js**: A runtime environment for executing JavaScript code on the server.
- **Express.js**: A fast and minimalistic web framework for Node.js applications.
- **MongoDB**: A popular NoSQL database for storing user information securely.
- **Bcrypt**: A library for hashing passwords to enhance security.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express apps.
- **JsonWebToken**: A library for generating and verifying JSON web tokens for user authentication.
- **Mongoose**: A MongoDB object modeling tool for Node.js.

## Installation and Usage💻

To get started with UdyamWell application, follow these steps:
1. Clone the repository: `git clone https://github.com/SumitPokhriyal5/UdyamWell_Auth.git`
2. Install the frontend and backend dependencies: `npm install`
3. Set up the environment variables:
   - Create a `.env` file in the root directory of the backend.
   - Add the necessary environment variables (e.g., database connection URL).
4. Build the frontend: `npm run dev`
5. Start the backend server: `npm run server`
6. Access the application in your browser.

## API Routes⏩

The following table lists the available API routes and their descriptions:

| Route                 | Method | Description                                                    |
|-----------------------|--------|----------------------------------------------------------------|
| /users                | GET    | Get all users data from the database                           |
| /users/register       | POST   | Register a new user with the provided data                     |
| /users/login          | POST   | Authenticate user credentials and allow them to log in         |
| /users/sendOtp        | POST   | Send OTP for password reset to the user's email                |
| /users/verifyOtp      | POST   | Verify the OTP provided by the user for password reset         |
| /users/updatePassword | POST   | Update user's password after successful OTP verification       |

## Screenshots
### Registration
![Screenshot (72)](https://github.com/Durgesh9871/Fashion-Gallery/assets/112632728/ebb0f118-4723-4f81-9f4b-57e8369a08e6)
### Login
![Screenshot (74)](https://github.com/Durgesh9871/Fashion-Gallery/assets/112632728/762ab4c9-4da3-492a-b7c5-55f15239a328)
### Send OTP
![Screenshot (75)](https://github.com/Durgesh9871/Fashion-Gallery/assets/112632728/915878bb-4b86-4d61-abda-47f2773b6242)
### Verify OTP
![Screenshot (76)](https://github.com/Durgesh9871/Fashion-Gallery/assets/112632728/5d38fc80-3153-451a-b90b-468e2cb2ace6)
### Update Password
![Screenshot (77)](https://github.com/Durgesh9871/Fashion-Gallery/assets/112632728/f07e1913-36c0-4a1f-973c-d6ac78a8dd53)
