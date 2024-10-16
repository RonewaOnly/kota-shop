Kota Shop Application
Kota Shop is a full-stack application for managing food items in a Kota shop. It consists of a backend built with Hono.js and TypeScript, and a frontend built with Vue 3, Vite, and Tailwind CSS. The application uses a PostgreSQL database with Drizzle ORM for data management.
Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v14 or later)
npm (v6 or later)
PostgreSQL

Project Structure
The project is divided into two main directories:

backend/: Contains the Hono.js TypeScript backend
frontend/: Contains the Vue 3 frontend

Setup Instructions
1. Clone the Repository
bashCopygit clone https://github.com/yourusername/kota-shop.git
cd kota-shop
2. Backend Setup

Navigate to the backend directory:
bashCopycd backend

Install dependencies:
bashCopynpm install

Create a .env file in the backend directory with the following content:
CopyDATABASE_URL=postgresql://username:password@localhost:5432/kota_shop
JWT_SECRET=your_jwt_secret_here
Replace username, password, and your_jwt_secret_here with your PostgreSQL credentials and a secure random string for JWT.
Build the backend:
bashCopynpm run build


3. Frontend Setup

Navigate to the frontend directory:
bashCopycd ../frontend

Install dependencies:
bashCopynpm install


4. Database Setup

Create a new PostgreSQL database named kota_shop:
sqlCopyCREATE DATABASE kota_shop;

The application will automatically create the necessary tables when you first run the backend.

Running the Application

Start the backend:
bashCopycd backend
npm run dev

In a new terminal, start the frontend:
bashCopycd frontend
npm run dev

Open a web browser and navigate to http://localhost:8080 to access the Kota Shop application.

Testing the Application

Register a new user account through the application interface.
Log in with the registered account.
Add, edit, and delete food items on the dashboard.
Verify that the changes are reflected in the food items list.

Development Notes

The frontend uses dummy data initially, allowing you to test the UI without a working backend connection.
As you develop further, replace the dummy data in frontend/src/stores/foodItems.ts with actual API calls to your backend.

Contributing
