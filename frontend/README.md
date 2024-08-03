# Project Sofra
**Project Sofra** is a location-based platform designed to help you find affordable meals when restaurants are closed and your budget is tight. By inputting a distance in meters, you can send your location to the backend using Google Maps API. The backend then performs a `BETWEEN` query on the database to list products that are within the specified distance from your location.

## Key Features
- **Proximity-Based Search**: Only displays food options within the specified distance from your current location.
- **Google Maps Integration**: Visualize nearby food options on the map with markers indicating available meals.
- **User Interaction**: Both buyers and sellers of food items are part of the platform, with real-time data updates.
## Screenshots
### Map View
![image](https://github.com/user-attachments/assets/5d89c407-ec8d-4029-9e3c-069c2931004f)

### Product Page
![image](https://github.com/user-attachments/assets/70810452-47c8-4813-99c1-70ef3c1cc220)

### My Profile Page
![image](https://github.com/user-attachments/assets/4f8aa42b-3c4a-42dd-bfde-1e3272375b0e)

### Add Balance from Credit Card Page
![image](https://github.com/user-attachments/assets/ad04771e-303d-4648-b54e-d593d0e3d285)

### Add Product Page
![image](https://github.com/user-attachments/assets/fea8b499-c302-4278-abea-1065069a2913)



Authentication Screens
![image](https://github.com/user-attachments/assets/39ec6332-8647-4211-a967-5d067b0eee2f)
![image](https://github.com/user-attachments/assets/eb44f7b9-3851-44f6-bd2e-6e4be1d871ae)


## Overview
This project was inspired by a friend's idea. Although permission was granted to use the concept, it wasn't developed into a full application. The idea remains a concept for a platform where users can both buy and sell food based on their proximity, leveraging Google Maps for location accuracy and visualization.

## Tech Stack
- **Frontend**: React (with Bootstrap for styling)
- **Backend**: Spring Boot
- **API Integration**: Google Maps API
- **Database**: SQL (for handling distance queries)

## Installation
``` # Clone the repository
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
mvn spring-boot:run ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to help improve the project.

