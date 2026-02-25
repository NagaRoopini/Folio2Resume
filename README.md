# 🚀 Folio2Resume

Folio2Resume is a full-stack web application that allows users to create, manage, and generate professional resumes from their portfolio data.

🔗 Live Frontend: https://folio2-resume.vercel.app  
🔗 Live Backend: https://folio2resume-backend.onrender.com  

---

## ✨ Features

- 🔐 User Registration & Login (Authentication)
- 📝 Create & Manage Resume Data
- 💾 Save Resumes to Database
- 📂 View Saved Resumes
- 🗑 Delete Resumes
- ☁ Fully Deployed Full-Stack Application
- 🐳 Dockerized Backend Deployment

---

## 🏗 Tech Stack

### 🔹 Frontend
- HTML
- CSS
- JavaScript
- Deployed on **Vercel**

### 🔹 Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Deployed on **Render**

### 🔹 Database
- MySQL (MariaDB)
- Hosted on **Railway**

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. Backend validates credentials
4. User ID stored in sessionStorage
5. Resume APIs use userId to fetch user-specific data

---

## 🌍 API Endpoints

### 🔹 Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🔹 Resume
- `GET /api/resume/user/{userId}`
- `POST /api/resume`
- `DELETE /api/resume/{resumeId}`

---

## ⚙ Environment Variables (Backend)

Configured in Render:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`

---

## 🐳 Docker Deployment

Backend is containerized using Docker.

### Build Stage:
- Maven build
- Generates executable JAR

### Run Stage:
- Java 17 runtime
- Runs app on dynamic port provided by Render

---

## 🧠 Challenges Faced

- CORS configuration
- Render cold start delays
- Database dialect configuration
- Environment variable management
- Production URL integration

---

## 👩‍💻 Developed By

**Battu Naga Roopini**  
B.Tech IT Student  
Full Stack Developer | Java | Spring Boot | MySQL 

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

