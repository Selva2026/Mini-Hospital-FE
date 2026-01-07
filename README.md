# 🏥 Mini Hospital Appointment Management System (Full Stack MERN)

A **Full Stack Hospital Appointment Management Application** built using **MongoDB, Express.js, React.js, and Node.js (MERN stack)**.
This project supports **role-based authentication** for **Patients** and **Doctors**, allowing patients to book appointments and doctors to manage them.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* JWT-based authentication
* Role-based access control (`patient`, `doctor`)

### 👨‍⚕️ Doctor Features

* View today’s appointments
* Update appointment status (Completed)
* Secure access using role-based middleware

### 🧑‍🦱 Patient Features

* Book appointments with doctors
* Prevent double booking for same slot
* View appointment history

### 📋 General

* View list of available doctors
* RESTful API design
* Secure password hashing using bcrypt

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcryptjs (Password Hashing)
* CORS

### Frontend

* React.js
* Axios
* React Router DOM
* Tailwind CSS (UI styling)

---

## 📂 Project Structure

```
backend/
 ├── config/
 │   └── db.js
 ├── controllers/
 │   ├── auth.controller.js
 │   └── appointment.controller.js
 ├── middleware/
 │   ├── auth.js
 │   └── role.js
 ├── models/
 │   ├── User.js
 │   └── Appointment.js
 ├── routes/
 │   ├── auth.routes.js
 │   └── appointment.routes.js
 ├── .env
 └── server.js

frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   └── App.jsx
 └── package.json
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

### Appointments

| Method | Endpoint          | Role    | Description               |
| ------ | ----------------- | ------- | ------------------------- |
| POST   | `/api/`           | Patient | Book appointment          |
| GET    | `/api/doctor`     | Doctor  | View today appointments   |
| PUT    | `/api/:id`        | Doctor  | Update appointment status |
| GET    | `/api/patient`    | Patient | Appointment history       |
| GET    | `/api/doctorlist` | Auth    | Get doctors list          |

---

## ⚙️ Environment Variables

Create a `.env` file in backend folder:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ▶️ How to Run the Project

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Sample Roles

* **Patient** → Can book and view appointments
* **Doctor** → Can view and update appointments

---

## 🔒 Security Highlights

* Passwords hashed using bcrypt
* JWT token validation middleware
* Role-based route protection

---

## 📌 Future Enhancements

* Appointment cancellation
* Date-wise doctor availability
* Admin dashboard
* Email/SMS notifications

---

## 👨‍💻 Author

**Muthupandi Thamaraiselvam**
Full Stack Developer

---

## ✅ Conclusion

This project demonstrates a **real-world hospital appointment workflow** using MERN stack with authentication, authorization, and clean backend architecture. Ideal for learning **role-based full stack application development**.
