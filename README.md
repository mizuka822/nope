# Melodyn - Web3 Fantasy Intimacy Protocol

### Google OAuth Setup
## Setup Instructions
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add your domain to authorized origins:
   - For development: `http://localhost:5173`
   - For production: `https://yourdomain.com`
6. Add the callback URL to authorized redirect URIs:
   - For development: `http://localhost:5173/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`
7. Copy the Client ID and add it to your `.env` file:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   ```
### Environment Variables
Copy `.env.example` to `.env` and fill in your configuration:
```bash
cp .env.example .env
```
### Development
```bash
npm install
npm run dev
```
### Authentication Flow
- **Google OAuth**: Redirects to Google's authentication service
- **Email/Password**: Uses your backend API for authentication
- **Callback Handling**: Processes OAuth responses and manages user sessions
### Features
- Zero-Knowledge Privacy Protection
- DreamLicense NFT Integration
- AI Companion Generation
- XR Immersive Experiences
- Web3 Wallet Integration