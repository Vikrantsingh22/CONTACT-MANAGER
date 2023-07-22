# Contact Manager Web Application


## Getting Started

Follow the steps below to get the Contact Manager web application up and running on your local machine.

### Step 1: Fork and Clone Repository

1. Fork this repository to your GitHub account.
2. Clone the forked repository to your local system using the following command:

```
git clone [https://github.com/your-username/contact-manager.git](https://github.com/Vikrantsingh22/CONTACT-MANAGER.git)
```

### Step 2: Create .env File

1. Create a `.env` file in the root directory of the project.
2. In the `.env` file, enter the following configuration:

```
PORT=portnumber
MONGO_URI=mongodb-local-uri-or-cluster-uri
TOKEN_SECRET=your-token-secret
```

Replace `portnumber` with the desired port number, `mongodb-local-uri-or-cluster-uri` with the MongoDB URI (local or cluster), and `your-token-secret` with a secure token secret (recommended 32 characters).

### Step 3: Install Dependencies

1. Open a terminal or command prompt in the project directory.
2. Install the required dependencies using one of the following commands:

```
npm install
```
or

```
npm ci
```

## Description

The Contact Manager web application provides functionalities for managing contacts digitally. It includes the following routes:

- `localhost:portnumber/home`: Access the homepage.
- `localhost:portnumber/user/register`: Access the signup page.
- `localhost:portnumber/user/login`: Access the login page and receive a cookie for authentication to access protected routes.

### Protected Routes (Require Cookie Authentication):

- `localhost:portnumber/user/current`: Access current user information.
- `localhost:portnumber/user/logout`: Clear the cookie and log out.
- `localhost:portnumber/contact/`: Access all contacts.
- `localhost:portnumber/contact/search`: Access contact by ID.
- `localhost:portnumber/contact/delete`: Delete contact by ID.
- `localhost:portnumber/contact/update`: Update contact by ID.
- `localhost:portnumber/contact/create`: Create a new contact.

## Running the Project

To run the project, use the following command:

```
node .\app.js
```

This will start the server, and you should see a message indicating that the server is running on the specified port.

Feel free to explore and manage your contacts using the Contact Manager web application! If you encounter any issues or have suggestions for improvements, please feel free to contribute or raise an issue in the GitHub repository. Happy managing!
