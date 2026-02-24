# Running the Project in VS Code with Tomcat

This guide will help you run the complete project in Visual Studio Code. **Note**: This is a Spring Boot application with an **embedded Tomcat server**, so you don't need to install external Tomcat!

---

## 🔧 Prerequisites

### 1. Install Java Development Kit (JDK)
- **Download**: [Java 17 or higher](https://adoptium.net/)
- **Verify installation**:
  ```powershell
  java -version
  ```

### 2. Install Maven
- **Download**: [Apache Maven](https://maven.apache.org/download.cgi)
- **Add to PATH** (Windows):
  - Download and extract Maven
  - Add `C:\path\to\maven\bin` to System Environment Variables PATH
- **Verify installation**:
  ```powershell
  mvn -version
  ```

### 3. Install MariaDB
- **Download**: [MariaDB](https://mariadb.org/download/)
- Install and configure to run on **port 3307**

### 4. Install Python (for frontend server)
- **Download**: [Python 3.x](https://www.python.org/downloads/)
- Make sure to check "Add Python to PATH" during installation
- **Verify**:
  ```powershell
  python --version
  ```

---

## 📦 VS Code Extensions (Required)

When you open the project in VS Code, you'll be prompted to install recommended extensions. Install these:

1. **Extension Pack for Java** (vscjava.vscode-java-pack)
   - Includes Java language support, debugging, Maven, etc.

2. **Spring Boot Extension Pack** (vmware.vscode-spring-boot)
   - Spring Boot support and dashboard

3. **Spring Boot Dashboard** (vscjava.vscode-spring-boot-dashboard)
   - Manage Spring Boot applications

4. **Maven for Java** (vscjava.vscode-maven)
   - Maven project management

5. **Live Server** (ritwickdey.liveserver)
   - For serving the frontend

**To install manually:**
- Press `Ctrl + Shift + X`
- Search for each extension
- Click "Install"

---

## 🚀 Setup Steps

### Step 1: Open Project in VS Code

1. Open VS Code
2. Click **File → Open Folder**
3. Navigate to `C:\Users\Roopini\Desktop\final`
4. Click "Select Folder"
5. Trust the workspace when prompted

### Step 2: Configure Java in VS Code

1. Press `Ctrl + Shift + P`
2. Type: `Java: Configure Java Runtime`
3. Ensure Java 17+ is selected

### Step 3: Setup MariaDB Database

Open a terminal and connect to MariaDB:

```sql
-- Connect to MariaDB
mysql -u root -p -P 3307

-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Create user
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'portfolio123';

-- Grant privileges
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

### Step 4: Build the Backend

1. Open VS Code Terminal: `Ctrl + ~`
2. Navigate to backend:
   ```powershell
   cd backend
   ```
3. Build the project:
   ```powershell
   mvn clean install
   ```

This will download all dependencies and compile the project.

---

## ▶️ Running the Application

### Method 1: Using VS Code Tasks (Recommended - Runs Both Together!)

1. Press `Ctrl + Shift + P`
2. Type: `Tasks: Run Task`
3. Select: **"Start Full Application"**

This will start both backend and frontend servers simultaneously!

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:3000

### Method 2: Using Spring Boot Dashboard

1. Look for the **Spring Boot Dashboard** in the left sidebar (or press `Ctrl + Shift + P` and type "Spring Boot Dashboard")
2. You should see `backend` listed
3. Click the ▶️ (play) icon next to `backend`
4. The embedded Tomcat server will start automatically
5. For frontend, use Method 3 or 4 below

### Method 3: Using VS Code Debug/Run

1. Press `F5` or click the Run icon in the left sidebar
2. Select: **"Spring Boot - PortfolioBackendApplication"**
3. The backend will start with debugging enabled
4. For frontend, use Method 4 below

### Method 4: Manual Terminal Commands

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Roopini\Desktop\final\backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Roopini\Desktop\final\frontend
python -m http.server 3000
```

### Method 5: Using Live Server Extension (Frontend Only)

1. Open `frontend/index.html` in VS Code
2. Right-click in the editor
3. Select **"Open with Live Server"**
4. Frontend will open at http://127.0.0.1:5500 (or configured port)

---

## 🎯 Accessing the Application

Once both servers are running:

- **Frontend**: Open browser → http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Test Endpoint**: http://localhost:8080/api/test (if available)

---

## 🔍 Verifying Everything Works

### Check Backend (Tomcat) is Running

Look for these messages in the terminal:

```
Tomcat initialized with port(s): 8080 (http)
Starting service [Tomcat]
Starting Servlet engine: [Apache Tomcat/10.x.x]
Started PortfolioBackendApplication in X.XXX seconds
```

### Check Frontend is Running

You should see:
```
Serving HTTP on :: port 3000 (http://[::]:3000/) ...
```

### Test the Application

1. Open http://localhost:3000
2. Try registering a new user
3. Try logging in
4. Test portfolio/resume features

---

## 🛠️ VS Code Shortcuts & Tips

### Useful Keyboard Shortcuts

- `Ctrl + ~` - Toggle Terminal
- `Ctrl + Shift + P` - Command Palette
- `F5` - Start Debugging
- `Shift + F5` - Stop Debugging
- `Ctrl + C` - Stop running server (in terminal)
- `Ctrl + Shift + B` - Run Build Task

### VS Code Tasks Available

Press `Ctrl + Shift + P` → `Tasks: Run Task`:

1. **Maven: Clean Install** - Build the project
2. **Maven: Spring Boot Run** - Run backend only
3. **Start Backend Server** - Run backend with monitoring
4. **Start Frontend Server** - Run frontend with Python
5. **Start Full Application** - Run both servers together ⭐

### Viewing Logs

- **Backend logs**: Check the terminal where Spring Boot is running
- **Frontend logs**: Check browser console (F12)
- **VS Code Output**: View → Output → Select "Spring Boot" or "Maven"

---

## 🐛 Troubleshooting

### Issue 1: "JAVA_HOME not set"

**Solution:**
1. Find your Java installation path (e.g., `C:\Program Files\Java\jdk-17`)
2. Set environment variable:
   ```powershell
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   ```
3. Or set it permanently in System Environment Variables

### Issue 2: "mvn command not found"

**Solution:**
1. Verify Maven is installed: `mvn -version`
2. Add Maven to PATH:
   - System Properties → Environment Variables
   - Add `C:\path\to\maven\bin` to PATH

### Issue 3: Port 8080 Already in Use

**Solution:**
1. Find and kill the process:
   ```powershell
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```
2. Or change port in `backend/src/main/resources/application.properties`:
   ```properties
   server.port=8081
   ```

### Issue 4: Database Connection Failed

**Solution:**
1. Verify MariaDB is running:
   ```powershell
   net start mariadb
   ```
2. Check connection settings in `application.properties`
3. Verify database and user exist

### Issue 5: Maven Dependencies Not Downloading

**Solution:**
1. Check internet connection
2. Delete `.m2/repository` folder and rebuild
3. Run:
   ```powershell
   mvn clean install -U
   ```

### Issue 6: VS Code Not Recognizing Java Project

**Solution:**
1. Press `Ctrl + Shift + P`
2. Type: `Java: Clean Java Language Server Workspace`
3. Reload VS Code
4. Let it rebuild the project

### Issue 7: Frontend CORS Errors

**Solution:**
- Ensure you're using a web server (not opening HTML directly)
- Backend should have CORS configured in SecurityConfig.java

---

## 📊 Project Structure in VS Code

```
final/
├── .vscode/                    # VS Code configuration
│   ├── settings.json          # Workspace settings
│   ├── launch.json            # Debug configurations
│   ├── tasks.json             # Build/run tasks
│   └── extensions.json        # Recommended extensions
│
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/          # Java source code
│   │       │   └── com/portfolio/
│   │       │       ├── PortfolioBackendApplication.java  # Main class
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       └── resources/
│   │           └── application.properties  # Configuration
│   ├── target/                # Compiled files (auto-generated)
│   └── pom.xml                # Maven dependencies
│
└── frontend/                   # Frontend Web App
    ├── index.html             # Landing page
    ├── login.html
    ├── signup.html
    ├── home.html
    ├── build-portfolio.html
    ├── build-resume.html
    ├── profile.html
    ├── styles.css
    ├── *.js
    └── images/
```

---

## 🎓 Understanding Embedded Tomcat

**Important**: Spring Boot includes an **embedded Tomcat server**. This means:

✅ **You DON'T need to:**
- Install external Tomcat
- Configure Tomcat separately
- Deploy WAR files to Tomcat
- Manage Tomcat service

✅ **Spring Boot automatically:**
- Starts Tomcat when you run the application
- Configures Tomcat with optimal settings
- Manages the servlet container
- Handles all server lifecycle

**The embedded Tomcat starts when you run:**
```powershell
mvn spring-boot:run
```

You'll see logs like:
```
Tomcat initialized with port(s): 8080 (http)
Starting service [Tomcat]
```

---

## 🔄 Development Workflow

### Making Changes to Backend

1. Edit Java files in `backend/src/main/java/`
2. Save the file
3. Stop the running server (`Ctrl + C`)
4. Rebuild and restart:
   ```powershell
   mvn spring-boot:run
   ```

**Or use Spring Boot DevTools for auto-reload** (add to pom.xml if needed)

### Making Changes to Frontend

1. Edit HTML/CSS/JS files in `frontend/`
2. Save the file
3. Refresh browser (F5)
4. Changes appear immediately (no restart needed)

---

## 🚦 Quick Start Checklist

- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] MariaDB installed and running on port 3307
- [ ] Database `portfolio_db` created
- [ ] User `portfolio_user` created with password
- [ ] VS Code installed
- [ ] Required VS Code extensions installed
- [ ] Project opened in VS Code
- [ ] Backend built successfully (`mvn clean install`)
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Application accessible at http://localhost:3000

---

## 📞 Need Help?

If you encounter issues:

1. **Check VS Code Problems Panel**: View → Problems (`Ctrl + Shift + M`)
2. **Check Terminal Output**: Look for error messages
3. **Check Browser Console**: F12 → Console tab
4. **Verify Services**: Ensure MariaDB is running
5. **Review Logs**: Check Spring Boot logs in terminal

---

## 🎉 You're All Set!

Your Spring Boot application with embedded Tomcat is now running in VS Code!

**Quick Commands:**
- Start everything: `Ctrl + Shift + P` → `Tasks: Run Task` → `Start Full Application`
- Debug backend: Press `F5`
- Stop servers: `Ctrl + C` in respective terminals

**Happy Coding! 🚀**
