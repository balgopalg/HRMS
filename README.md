# Software Personnel Management System

## 📌 Project Description
The **Software Personnel Management System** is a web application designed to manage and organize software personnel data efficiently.  
It consists of a **React + TailwindCSS frontend** and a **Node.js + Express backend** connected to a MongoDB database.  
The system allows users to manage personnel records, authentication, file uploads, and more, making it an ideal tool for software companies or HR departments.

---

## 📂 Project Structure
```
root/
│
├── frontend/   # React frontend with TailwindCSS styling
│
└── server/     # Node.js backend with Express & MongoDB
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
```

---

### 2️⃣ Install Dependencies

#### 📌 Frontend
```bash
cd frontend
npm install @tailwindcss/vite autoprefixer axios lucide-react postcss react react-data-table-component react-dom react-icons react-router-dom styled-components tailwindcss
npm install -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals vite
```

#### 📌 Backend
```bash
cd ../server
npm install bcrypt cors express jsonwebtoken mongoose multer path
npm install -D nodemon
```

---

### 3️⃣ Run the Project

#### ▶️ Start Frontend
```bash
cd frontend
npm run dev
```

#### ▶️ Start Backend
```bash
cd ../server
npm start
```

---

## 🚀 Technologies Used

### **Frontend**
- **React** (UI library)
- **TailwindCSS** (Styling)
- **Axios** (API requests)
- **React Router DOM** (Routing)
- **Styled Components** (CSS-in-JS)
- **Lucide React & React Icons** (Icons)
- **React Data Table Component** (Tables & Data Display)
- **Vite** (Development build tool)

### **Backend**
- **Node.js & Express** (Backend framework)
- **MongoDB & Mongoose** (Database & ORM)
- **bcrypt** (Password hashing)
- **jsonwebtoken** (Authentication)
- **multer** (File uploads)
- **cors** (Cross-origin resource sharing)
- **path** (File path utilities)
- **nodemon** (Development auto-reload)

---

## 📄 License
This project is licensed under the **ISC License**.
