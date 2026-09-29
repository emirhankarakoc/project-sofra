# Sofra: Nearby Food Marketplace

Sofra is a food marketplace idea. A buyer gives a location and distance. The Spring Boot API finds nearby products, and the React app shows them on a Google Map.

This is the original Sofra project. It is separate from my car maintenance recommendation tool.

## What is in the code

- Buyer and seller accounts
- Product listings and nearby search
- Map markers and product screens

The backend is in `backend/`; the React app is in `frontend/`.

## Run locally

You need Java, Maven, Node.js, MySQL, and your own Google Maps setup. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `JWT_SECRET` for the backend. Image uploads also need `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

```bash
cd backend
mvn spring-boot:run
```

In another terminal:

```bash
cd frontend
npm install
npm start
```

This project started from a friend's idea and is shared with permission.
