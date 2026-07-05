Project BLD / BloodLink - OTP Login + JWT Update

What changed:
1. Email OTP login added.
   - POST /api/auth/send-otp
   - POST /api/auth/verify-otp
   - GET /api/auth/me

2. JWT authentication added.
   - Logged-in user gets JWT token after OTP verification.
   - Frontend stores token in localStorage.

3. Donor search protected.
   - /api/donors/search now needs JWT token.
   - /api/donors/nearby now needs JWT token.
   - User must login before finding donors.

4. Frontend pages added/updated.
   - /login page added.
   - Blood Search route protected.
   - Navbar shows Login/Logout.

Backend setup:
cd Blood-bank-backend
npm install

Create .env file using .env.example:
PORT=5000
MONGODB_URL=your_mongodb_atlas_url
JWT_SECRET=change_this_to_a_long_secret_key
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM="Project BLD <your_email@gmail.com>"

Start backend:
npm start

Frontend setup:
cd Blood-bank
npm install

Create .env file:
VITE_API_URL=http://localhost:5000

Start frontend:
npm run dev

Important:
For Gmail SMTP, use Gmail App Password, not normal Gmail password.
In Render, add all backend env variables from .env.example.
In Vercel, add VITE_API_URL with your Render backend URL.
