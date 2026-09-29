# Project Sofra — Nearby Food Marketplace Prototype

A location-based food marketplace concept. A Spring Boot backend accepts a location and distance, queries nearby products, and serves data to a React interface with a Google Maps view.

**This is the food marketplace project from 2024. It is separate from my dealership maintenance recommendation work.**

## Features
- Buyer and seller account flows
- Product listings and proximity filtering
- Map markers for nearby items
- Product and profile screens

## Stack and layout
- `backend/` — Java, Spring Boot, SQL persistence
- `frontend/` — React and Bootstrap
- Google Maps integration in the client

## Run locally
Install Java, Maven, Node.js, and a database matching the backend configuration. Supply your own database and third-party API configuration. From the repository root:

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

## Status
This is a prototype based on a friend's concept, shared with permission. The repository does not represent a launched marketplace, completed payment integration, or the newer dealership project. Review the API and frontend code for implemented behavior.
