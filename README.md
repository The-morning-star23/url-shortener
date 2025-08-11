# URL Shortener - MERN Stack

A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to shorten long URLs into a more manageable format. This project features a clean user interface, a RESTful API backend, and an admin panel to track link performance.

---

## ✨ Live Demo

You can view the live application here:
**https://url-shortener-kohl-rho.vercel.app/**

---

## 🚀 Features

* **URL Shortening:** Create a shortened, unique URL from any valid long URL.
* **Redirection:** Visiting a shortened link seamlessly redirects the user to the original destination.
* **Admin Panel:** A dedicated `/admin` page that displays a table of all generated links.
* **Click Tracking:** The admin panel tracks and displays the number of times each shortened link has been visited.
* **Responsive Design:** A clean and simple interface that works on both desktop and mobile devices.

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Deployment:**
    * Frontend deployed on **Vercel**.
    * Backend deployed on **Railway**.

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed on your machine.
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account to get a database connection string.
* Git installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mern-url-shortener.git](https://github.com/your-username/mern-url-shortener.git)
    cd mern-url-shortener
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install

    # Create a .env file and add your variables
    touch .env
    ```
    Your `backend/.env` file should contain:
    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    PORT=5000
    ```
    Now, you can start the backend server:
    ```bash
    npm start
    ```

3.  **Set up the Frontend:**
    Open a **new terminal** and navigate to the frontend folder.
    ```bash
    # Navigate to the frontend folder from the root directory
    cd frontend

    # Install dependencies
    npm install
    ```
    For local development, your frontend needs to know where the local backend is running. You can optionally create a `.env` file in the `frontend` directory.
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```
    Now, you can start the React development server:
    ```bash
    npm start
    ```

Your application should now be running locally, with the frontend on `http://localhost:3000` and the backend on `http://localhost:5000`.