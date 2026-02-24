# How to Run the Full Project

This project consists of two parts:
1. **Backend**: Spring Boot (Java) application with MariaDB database
2. **Frontend**: HTML/CSS/JavaScript web application

---

## Prerequisites

Before running the project, ensure you have the following installed:

### 1. Java Development Kit (JDK)
- **Version Required**: Java 17 or higher
- **Check if installed**: Open PowerShell and run:
  ```powershell
  java -version
  ```
- **Download**: If not installed, download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)

### 2. Maven
- **Check if installed**:
  ```powershell
  mvn -version
  ```
- **Download**: If not installed, download from [Apache Maven](https://maven.apache.org/download.cgi)

### 3. MariaDB Database
- **Version Required**: MariaDB 10.x or higher
- **Download**: [MariaDB Downloads](https://mariadb.org/download/)
- **Note**: The project is configured to connect to MariaDB on port **3307**

### 4. Web Browser
- Any modern browser (Chrome, Firefox, Edge, etc.)

---

## Step 1: Setup MariaDB Database

### 1.1 Start MariaDB Server
Make sure your MariaDB server is running on port **3307**.

### 1.2 Create Database and User
Open MariaDB command line or MySQL Workbench and run:

```sql3 
-- Create the database
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Create the user
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'portfolio123';

-- Grant privileges
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

### 1.3 Verify Connection
Test the connection:
```powershell
mysql -u portfolio_user -p -h localhost -P 3307 portfolio_db
# Enter password: portfolio123
```

---

## Step 2: Run the Backend (Spring Boot)

### 2.1 Navigate to Backend Directory
```powershell
cd C:\Users\Roopini\Desktop\final\backend
```

### 2.2 Clean and Build the Project
```powershell
mvn clean install
```

This will:
- Download all dependencies
- Compile the Java code
- Run tests (if any)
- Create a JAR file in the `target` folder

### 2.3 Run the Spring Boot Application

**Option A: Using Maven**
```powershell
mvn spring-boot:run
```

**Option B: Using the JAR file**
```powershell
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 2.4 Verify Backend is Running
- The backend should start on **https://folio2resume-backend.onrender.com** (or locally at **http://localhost:8080**)
- You should see logs indicating the application has started
- Look for a message like: `Started PortfolioBackendApplication in X seconds`

---

## Step 3: Run the Frontend

### 3.1 Navigate to Frontend Directory
Open a **new PowerShell window** (keep the backend running in the first one):
```powershell
cd C:\Users\Roopini\Desktop\final\frontend
```

### 3.2 Serve the Frontend

**Option A: Using Python (if installed)**
```powershell
# Python 3
python -m http.server 3000

# Or Python 2
python -m SimpleHTTPServer 3000
```

**Option B: Using Node.js http-server (if installed)**
```powershell
npx http-server -p 3000
```

**Option C: Using Live Server (VS Code Extension)**
- Open the `frontend` folder in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"

**Option D: Direct File Access**
- Simply open `index.html` in your browser
- Navigate to: `file:///C:/Users/Roopini/Desktop/final/frontend/index.html`
- **Note**: Some features may not work due to CORS restrictions

### 3.3 Access the Application
- Open your browser and go to: **http://localhost:3000**
- You should see the landing page of the portfolio application

---

## Step 4: Verify Everything is Working

### 4.1 Check Backend API
Open browser and test:
- **https://folio2resume-backend.onrender.com** - Should show a response (might be error page if no root endpoint)

### 4.2 Check Frontend
- Navigate through the application
- Try registering a new user
- Try logging in
- Test the portfolio and resume building features

---

## Common Issues and Solutions

### Issue 1: Database Connection Failed
**Error**: `Communications link failure` or `Access denied`

**Solutions**:
- Verify MariaDB is running on port 3307
- Check username/password in `application.properties`
- Ensure database `portfolio_db` exists
- Verify user `portfolio_user` has correct privileges

### Issue 2: Port Already in Use
**Error**: `Port 8080 is already in use`

**Solutions**:
- Stop any other application using port 8080
- Or change the port in `application.properties`:
  ```properties
  server.port=8081
  ```

### Issue 3: Maven Build Fails
**Error**: Various Maven errors

**Solutions**:
- Ensure you have internet connection (Maven needs to download dependencies)
- Clear Maven cache:
  ```powershell
  mvn clean
  ```
- Delete `.m2` repository and rebuild

### Issue 4: CORS Errors in Frontend
**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions**:
- Use a local web server instead of opening HTML directly
- Backend should have CORS configured (check Spring Security config)

### Issue 5: Email Functionality Not Working
**Error**: Email sending fails

**Solutions**:
- Update email credentials in `application.properties`
- For Gmail, you may need to:
  - Enable "Less secure app access" (not recommended)
  - Use an App Password instead of your regular password
  - Enable 2-factor authentication and generate an app-specific password

---

## Quick Start Commands

### Terminal 1 (Backend):
```powershell
cd C:\Users\Roopini\Desktop\final\backend
mvn spring-boot:run
```

### Terminal 2 (Frontend):
```powershell
cd C:\Users\Roopini\Desktop\final\frontend
python -m http.server 3000
```

### Browser:
```
http://localhost:3000
```

---

## Stopping the Application

### Stop Backend:
- Press `Ctrl + C` in the terminal running the Spring Boot application

### Stop Frontend:
- Press `Ctrl + C` in the terminal running the web server

### Stop MariaDB:
- Use MariaDB service manager or:
  ```powershell
  net stop mariadb
  ```

---

## Project Structure

```
final/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/          # Java source code
│   │   │   └── resources/     # Configuration files
│   │   └── test/              # Test files
│   ├── target/                # Compiled files
│   └── pom.xml                # Maven configuration
│
└── frontend/                   # Frontend Web Application
    ├── index.html             # Landing page
    ├── login.html             # Login page
    ├── signup.html            # Registration page
    ├── home.html              # User home page
    ├── build-portfolio.html   # Portfolio builder
    ├── build-resume.html      # Resume builder
    ├── profile.html           # User profile
    ├── styles.css             # Main stylesheet
    ├── *.js                   # JavaScript files
    └── images/                # Image assets
```

---

## Additional Notes

1. **Database Tables**: Spring Boot will automatically create tables on first run (due to `spring.jpa.hibernate.ddl-auto=update`)

2. **File Uploads**: Ensure the backend has write permissions for file upload directories

3. **Email Configuration**: Update the email credentials in `application.properties` with your actual Gmail credentials

4. **Security**: For production, change all default passwords and use environment variables for sensitive data

5. **Development Mode**: The current setup is for development. For production deployment, additional configuration is needed.

---

## Need Help?

If you encounter any issues:
1. Check the backend console logs for error messages
2. Check browser console (F12) for frontend errors
3. Verify all prerequisites are installed correctly
4. Ensure all services (MariaDB, Backend) are running
5. Check firewall settings if connection issues persist

---

**Happy Coding! 🚀**
