# Greenlands Backend Deployment (Render)

## Prerequisites

- MongoDB database (cloud, e.g., MongoDB Atlas)
- JWT secret
- Frontend deployed (e.g., Vercel)

## Environment Variables

Set these in Render dashboard or in your `.env` (do NOT commit `.env`):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-url.vercel.app
```

## Deploy Steps

1. Push code to GitHub.
2. Connect Render to your repo.
3. Render will auto-detect `render.yaml` and build the service.
4. Set environment variables in Render dashboard.
5. Deploy!

## Notes

- CORS is configured to allow only your frontend domain.
- Use HTTPS in production (Render provides this by default).
- For static file serving, add `app.use(express.static('public'))` if needed.
- For logs, use Render's built-in logging or extend with Winston.

## Health Check

- Endpoint: `/api/health`
- Returns status and timestamp.
