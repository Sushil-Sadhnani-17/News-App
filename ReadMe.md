# News App with MySQL Database - MERN Project

This project is a News App built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and MySQL database. It allows users to browse and read news articles.

## Prerequisites

Before running this project, ensure that you have the following installed on your machine:

- Node.js (v14 or above)
- MySQL (v5.7 or above)

## Getting Started

To get started with the News App, please follow the steps below:

1. Clone the repository:

   bash
   git clone <repository_url>
   

2. Install the dependencies for the backend:

   bash
   cd News-App/backend
   npm install
   

3. Set up the MySQL database:

   - Create a new MySQL database named "news_app" on your local machine.

4. Configure the backend environment variables:

   - Open the .env file in backend and update the following variables with your MySQL credentials:

     DB_USERNAME = Your MySQL username
     DB_PASSWORD = Your MySQL password
     SECRET_KEY = Your Secret Key
     NEWSAPI_KEY = Your API Key
     EMAIL_ID = Your email id
     EMAIL_PASSWORD = Your password


5. Start the backend server:

   bash
   cd News-App/backend
   npm start
   

   This will start the backend server at http://localhost:5000.

6. Install the dependencies for the frontend:

   bash
   cd ../frontend
   npm install
   

8. Start the frontend:

   bash
   cd News-App/frontend
   npm start
   

   This will start the frontend development server at http://localhost:3000.

9. Open your web browser and visit http://localhost:3000 to access the News App.

## Contributing

Contributions to the News App are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

That's it! You should now have the News App up and running with your own MySQL database credentials. Enjoy browsing and reading news articles!