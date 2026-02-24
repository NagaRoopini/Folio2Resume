# 🚀 Folio2Resume

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17%2B-orange)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Folio2Resume is a sophisticated platform that bridges the gap between a professional digital portfolio and a recruiter-ready resume. It allows users to curate their professional journey and instantly transform it into a high-impact, single-page resume tailored for their specific field.

---

## ✨ Key Features

- **🎨 Multi-Role Templates**: Custom-crafted designs for **Students**, **Writers**, and **Chefs**.
- **⚡ One-Click Resume**: Instant generation of professional resumes from portfolio data.
- **📄 A4 Perfect Export**: Optimized PDF generation ensuring a perfect single-page layout every time.
- **🖋️ Premium Typography**: Uses the **Montserrat** font family for a sleek, modern, and readable look.
- **🛠️ Fully Editable**: Real-time editing of resume content even after generation.
- **🔒 Secure Data**: Robust backend handling with MariaDB and Spring Security principles.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla), `html2pdf.js` |
| **Backend** | Java 17, Spring Boot, Spring Data JPA |
| **Database** | MariaDB / MySQL (Port: 3307) |
| **Build Tool** | Apache Maven |
| **Development** | Python (Frontend Server), XAMPP (Local DB) |

---

## 🚀 Installation & Setup

### **1. Prerequisites**
Ensure you have the following installed:
- **JDK 17+**
- **Maven 3.x**
- **MariaDB/MySQL** (Running on port 3307)
- **Python 3.x** (Optional, for frontend server)

### **2. Database Configuration**
1. Create the database: `CREATE DATABASE portfolio_db;`
2. Update your credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mariadb://localhost:3307/portfolio_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### **3. Running the Application**

#### **Terminal 1: Backend**
```bash
cd backend
mvn spring-boot:run
```

#### **Terminal 2: Frontend**
```bash
cd frontend
python -m http.server 3000
```

---

## 📂 Architecture Overview

```text
├── backend/            # Spring Boot Application
│   ├── src/            # Java source code
│   └── pom.xml         # Maven dependencies
├── frontend/           # Web UI (HTML/CSS/JS)
│   ├── styles.css      # Core design system
│   └── resume.js       # Dynamic logic & PDF export
├── docs/               # Setup & User Guides
└── README.md           # Project Documentation
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contact
Email: support@folio2resume.com  
Phone: +91 98765 43210
