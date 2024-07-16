# ChatTest

ChatTest is a real-time chat application built with Node.js, Express, React, and Firebase. It supports user authentication, real-time messaging, and file uploads.

## Project Structure

- `server/` - Contains the backend code using Node.js, Express, and Firebase.
- `client/` - Contains the frontend code using React.
- `server/src` - Main source code for the server, including configuration file firebase.

## Setup and Installation

### Prerequisites

Before setting up the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Step 1: Clone the Repository

First, clone the repository to your local machine:

git clone https://github.com/DinaDi021/ChatTest.git
cd ChatTest

### Step 2: Configure Environment Variables
You need to configure the environment variables for both the server and the client.

Server
Navigate to the server directory:


cd server
Copy the example environment file and update it with your configurations:

cp .env.example .env
Add the Firebase service account JSON file:

Place your service_account.json file in the server/src directory.
Client
Navigate to the client directory:

cd client
Copy the example environment file and update it with your configurations:

.env.example .env
### Step 3: Install Dependencies
Install the dependencies for both the server and the client:

npm install

### Step 4: Build the Project
In the root directory of the project, run the following command to build the project:

npm run build
### Step 5: Start the Application
After building the project, you can start the server:

npm start

## Technologies Used

- **Backend:**
    - Node.js
    - Express
    - Firebase
    - Socket.io

- **Frontend:**
    - React

- **Utilities:**
    - TypeScript
    - ESLint
    - Prettier

## Features

- User authentication
- Real-time messaging
- File uploads
