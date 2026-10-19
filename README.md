<<<<<<< HEAD
# Sunny Kumar — Developer Portfolio

A responsive dark-premium portfolio built with React + Vite on the frontend and Node.js + Express on the backend.

## Included
- Responsive layout with mobile navigation
- Dark/light theme toggle
- Animated headline and reveal-on-scroll effects
- About, skills, experience timeline, project case studies, services, articles, and contact sections
- GitHub, LinkedIn, LeetCode, and Freelancer profile links
- Resume download placeholder (`client/public/sunny-kumar-resume.txt`)
- Contact form backed by an Express API; submissions are validated and appended to `server/data/messages.json`
- `.env.example` for server configuration

## Requirements
- Node.js 20 LTS or newer
- npm
- VS Code (recommended)

## Run on Windows / VS Code
1. Install Node.js from https://nodejs.org/ (choose the LTS version).
2. Extract this ZIP.
3. Open the extracted `sunny-kumar-portfolio` folder in VS Code.
4. Open **Terminal → New Terminal**.
5. Run:
   ```bash
   npm install
   ```
6. Start the frontend and backend:
   ```bash
   npm run dev
   ```
7. Open the frontend URL printed by Vite, usually `http://localhost:5173`.

The API runs at `http://localhost:5000`. The Vite development server proxies `/api` requests to it.

## Contact form behaviour
The form sends messages to `POST /api/contact`. The API validates fields and stores accepted submissions in `server/data/messages.json`. This is a local-development implementation, not an email delivery service. For production, connect an email provider or database, add deployment-specific rate limiting, and do not expose stored messages publicly.

## Customize before publishing
- Update the `About` copy and project details in `client/src/App.jsx`.
- Add your photo to `client/public/` and update the profile placeholder in `App.jsx`.
- Replace the editable resume text in `client/public/sunny-kumar-resume.txt`.
- Replace `hello@example.com` with your public email, or remove the email link until ready.
- Add real project repository/demo URLs where available. The project buttons currently use your GitHub profile or safe placeholders where a specific URL has not been supplied.
- Review every claim and link before deploying.
- Update the `server` CORS configuration if frontend and backend are deployed on separate domains.

## Project status wording
SamadhanHub: based on features you previously reported as verified — homepage renders, problem listings load real data, problem submission saves, problem details render, status changes persist after refresh, registration/login work, and mobile layout works. Other features are deliberately not claimed as verified.
VELORA FASHION and Pinora Studio: shown as portfolio projects with cautious descriptions; confirm their current implementation and add demos/repositories before describing additional features as complete.

## Production notes
This starter is suitable for local development. Before production, use a durable database, add a real email delivery integration, configure environment variables and HTTPS, add robust abuse prevention, and deploy the client and API using your chosen hosting provider.
=======
# sunny-kumar-portfolio
Personal developer portfolio built with React and Node.js
>>>>>>> 95f80aea0197d0a4adebd459e1e3e4e2ee515625
