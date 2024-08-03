# Project Sofra
**Project Sofra** is a location-based platform designed to help you find affordable meals when restaurants are closed and your budget is tight. By inputting a distance in meters, you can send your location to the backend using Google Maps API. The backend then performs a `BETWEEN` query on the database to list products that are within the specified distance from your location.

## Key Features
- Proximity-Based Search: Only displays food options within the specified distance from your current location.
- Google Maps Integration: Visualize nearby food options on the map with markers indicating available meals.
- User Interaction: Both buyers and sellers of food items are part of the platform, with real-time data updates.
## Screenshots
### Map View


### Product Page
![image](https://github.com/user-attachments/assets/e823119d-edfd-44f5-9456-1f2a3afe418c)

### My Profile Page
![image](https://github.com/user-attachments/assets/021cb749-b9ca-47c6-9343-1412a08fa351)

### Add Balance from Credit Card Page
![image](https://github.com/user-attachments/assets/99c57706-3963-4a46-99c6-9574b4afe353)

### Add Product Page



Authentication Screens
![Uploading image.png…]()



## Overview
This project was inspired by a friend's idea. Although permission was granted to use the concept, it wasn't developed into a full application. The idea remains a concept for a platform where users can both buy and sell food based on their proximity, leveraging Google Maps for location accuracy and visualization.

## Tech Stack
- Frontend: React (with Bootstrap for styling)
- Backend: Spring Boot
- API Integration: Google Maps API
- Database: SQL (for handling distance queries)

## Installation
`# Clone the repository
git clone https://github.com/your-repo/project-sofra.git

# Navigate to the frontend directory
cd project-sofra/frontend

# Install dependencies
npm install

# Start the frontend server
npm start

# Navigate to the backend directory
cd ../backend

# Install dependencies
mvn install

# Start the backend server
mvn spring-boot:run`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to help improve the project.

