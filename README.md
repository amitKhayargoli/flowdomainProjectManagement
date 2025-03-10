# Flow Domain

Flow Domain is a **PERN-stack** project management web application designed to enhance collaboration and task tracking. It features **Board View, List View, and Project Management**, allowing teams to work efficiently with real-time updates and streamlined workflows.

## Features

- **Project Management**: Create, assign, and track projects.
- **Task Management**: View tasks in Board or List format.
- **Project Teams**: Add members to projects for collaboration.
- **Task Status Updates**: All team members can view task progress.
- **User Authentication**: Secure login and access control.
- **Responsive UI**: Built with Tailwind CSS for a modern and clean interface.

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js & Express.js (MVC architecture)
- **Database**: PostgreSQL with Prisma ORM
- **API Handling**: Axios


## Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/flowdomain.git
   cd flowdomain
   ```

2. **Install Dependencies**
   - Install backend dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the backend directory and add:
     ```env
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Backend Server**
   ```bash
   cd backend
   npm start
   ```

5. **Run the Frontend**
   ```bash
   cd ../frontend
   npm start
   ```

6. **Access the App**
   Open your browser and go to `http://localhost:3000`

## API Routes (Backend)

| Method | Endpoint             | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/projects`          | Fetch all projects            |
| POST   | `/projects`          | Create a new project          |
| GET    | `/tasks/:projectId`  | Get tasks for a project       |
| POST   | `/tasks`             | Create a new task             |
| GET    | `/users`             | Fetch user details            |
| POST   | `/auth/login`        | User login                    |

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

This project is licensed under the **MIT License**.

## Contact

For any inquiries, feel free to reach out:
- **Developer**: Amit Khayargoli
- **Email**: khayargoliamit99@gmail.com


