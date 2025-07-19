# Leave Management System - Backend (Laravel 11)

This is the **backend RESTful API** for the Leave Management System, built using **Laravel 11**. The system handles user authentication via Laravel Passport, role-based access control (Admin, Employee), leave request workflows, and includes seeders for test/demo data.

---

## Tech Stack

- **Laravel 11**
- **MySQL**
- **Laravel Passport** (OAuth2 for API authentication)
- **RESTful API**
- **Database Seeders** for initial data

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **PHP** >= 8.2
- **Composer**
- **MySQL**
- Laravel CLI

---

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd leave-management-system/backend

2. **install dependencies**
   composer install

3. **Create .env file**
   cp .env.example .env

4. **Update .env database configuration**
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=leave_management
   DB_USERNAME=root
   DB_PASSWORD=

5. **Generate app key**
   php artisan key:generate

6. **Run migrations**
   php artisan migrate

7 **Run seeders**
   php artisan db:seed --class=RoleSeeder
   php artisan db:seed --class=UserSeeder