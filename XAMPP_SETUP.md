# Quick Setup Guide for XAMPP + Portfolio Project

## ✅ Configuration Updated
Your application is now configured to use **port 3307** (XAMPP's MySQL port).

---

## 🗄️ Database Setup (Choose One Method)

### Method 1: Using phpMyAdmin (Easiest)

1. **Open phpMyAdmin**:
   - Go to: http://localhost/phpmyadmin
   - Or click "Admin" button next to MySQL in XAMPP Control Panel

2. **Create Database**:
   - Click on "Databases" tab
   - Database name: `portfolio_db`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

3. **Create User** (Optional - you can use root):
   - Click on "User accounts" tab
   - Click "Add user account"
   - Username: `portfolio_user`
   - Host: `localhost`
   - Password: `portfolio123`
   - Check "Grant all privileges on database portfolio_db"
   - Click "Go"

### Method 2: Using MySQL Command Line (If you know root password)

Open Command Prompt and run:

```bash
C:\xampp\mysql\bin\mysql.exe -u root -p -P 3307
```

Enter your root password, then run:

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db;
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'portfolio123';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Method 3: Use Root User (Simplest)

If you want to skip creating a new user, update `application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_ROOT_PASSWORD
```

(Leave password empty if root has no password)

---

## 🚀 Running the Application

Once the database is set up, run these commands:

### Terminal 1 - Backend:
```powershell
cd C:\Users\Roopini\Desktop\final\backend
mvn spring-boot:run
```

### Terminal 2 - Frontend:
```powershell
cd C:\Users\Roopini\Desktop\final\frontend
python -m http.server 3000
```

### Browser:
Open: http://localhost:3000

---

## ⚡ Quick Checklist

- [ ] XAMPP is running (MySQL on port 3307)
- [ ] Database `portfolio_db` created
- [ ] User `portfolio_user` created (or using root)
- [ ] Backend configuration updated (already done ✓)
- [ ] Ready to run!

---

**Once you've set up the database, let me know and I'll start the servers for you!** 🚀
