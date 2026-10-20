# DriverClub

A robusta platform for market and service management, focused on scalability and performance.

## 📌 About the Project

**DriverClub** is a comprehensive ecosystem designed to connect drivers and users, while managing payments, locations, and trips in real time. The backend is built with Node.js, utilizing a modular architecture to facilitate system maintenance and evolution.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building the API.
- **WebSocket**: Real-time communication for location tracking and trips.
- **PostgreSQL**: Relational database.
- **Migrations**: Database version control. ## 📂 Folder Structure (Backend)

```text
backend/
├── src/
│   ├── config/          # Database configurations and variables
│   ├── modules/         # Core system modules
│   │   ├── auth/        # Authentication and Authorization
│   │   ├── drivers/     # Driver Management
│   │   ├── location/    # Geolocation Services
│   │   ├── payments/    # Payment Processing
│   │   ├── rides/       # Ride Management
│   │   └── users/       # User Management
│   ├── shared/          # Code shared across modules
│   └── websocket/       # Socket.io/WS communication logic
├── migrations/          # Database schema migration scripts
└── ...
```

## 🚀 How to Run

### Prerequisites
- Node.js installed (v16+)
- PostgreSQL running

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/DriverClub.git
```
2. Navigate to the backend folder:
```bash
cd DriverClub/backend
```
3. Install dependencies:
```bash
npm install
```
4. Configure the `.env` file with your database credentials.
5. Run the migrations:
```bash
npm run migrate (or the configured command)
```
6. Start the server:
```bash
npm run dev
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE.md](../LICENSE.md) file for details.

---
Developed by [Marcio Vinicius](https://github.com/Developer-Vini)
