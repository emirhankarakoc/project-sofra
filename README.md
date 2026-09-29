# Sofra: Nearby Food Marketplace

Sofra is a food marketplace idea. The Spring Boot API can search food ads by location and distance. The React app has product pages with links to Google Maps and Apple Maps.

This is the original Sofra project. It is separate from my car maintenance recommendation tool.

## What is in the code

- Buyer and seller accounts
- Product listings and nearby search
- Product screens and map links for each product

The backend is in `backend/`; the React app is in `frontend/`.

## Run locally

You need Java, Maven, Node.js, and MySQL. Set `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `JWT_SECRET` for the backend. Image uploads also need `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

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
