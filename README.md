# SBS Finance Platform

A premium financial advisory and services platform built with React, Vite, Tailwind CSS on the frontend, and Node.js + Express on the backend, integrated with Google Sheets for contact form submissions.

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Hot Toast

### Backend
- **Framework**: Node.js + Express
- **Security**: Helmet, CORS, Express Rate Limit
- **Database / Storage**: Google Sheets API (via `google-spreadsheet` and `google-auth-library`)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Google Service Account Credentials (for Google Sheets integration)

### Running Locally

1. **Install Dependencies**
   Navigate to both `client` and `server` directories and install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

2. **Environment Variables**
   In the `server` directory, create a `.env` file using the `.env.example` as a template:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="your_private_key"
   GOOGLE_SHEET_ID=your_spreadsheet_id
   ```

3. **Start the Development Servers**

   **Backend (Server)**
   ```bash
   cd server
   npm start
   ```
   The backend will run on `http://localhost:5000`

   **Frontend (Client)**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Deployment

### Vercel (Frontend)
The frontend is optimized for deployment on Vercel.
1. Import the repository into Vercel.
2. Set the **Framework Preset** to `Vite`.
3. Set the **Root Directory** to `client`.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL (e.g., `https://your-render-backend-url.onrender.com`).
5. Click **Deploy**.

### Render (Backend)
The backend is configured to be deployed easily on Render via the included `render.yaml` Blueprint.
1. Connect this repository to your Render account.
2. Render will automatically detect the `render.yaml` configuration and set up the Web Service.
3. In the Render Dashboard, configure your Environment Variables for the backend (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`).
4. Trigger a deploy.

## Repository Structure
- `/client`: Frontend React application.
- `/server`: Node.js Express backend.
- `render.yaml`: Infrastructure-as-code configuration for Render.
