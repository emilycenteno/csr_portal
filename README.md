# Customer Service Representative portal for AMP - Coding Challenge 

## Overview 

This project is a CSR portal for AMP built with React. It allows CSRs to search for customers, and view pertinent information such cas address, payment methods and vehicles on file. The app demonstrates skills in React development, API integration, component-based design, and responsive UI implementation.

-- 

## Features

- List of customers is prominently displayed on the home page for quick and easy access 
- CSRs can search for a customer based on their name, phone, or email address on file. 
- Select user and view their contact information, billing information, active tickets, and vehicles on file. 
- Edit any information in responsive cards and dialogs 
- Loading an error states with user-friendly feedback 
- Clean and Buildable component structures 

-- 

## Tech Stack 

- **React** - for funcitonal components, hooks, state management
-**JSON-Sever** - an open-source library that allows you to mimic an "API" server using a .json file.  
-**Material UI** - for scoped styling
-**React Router** - provides deeplinks for the different customer's overview page 

## Installation & Running Locally: 

1. Clone the reposityory and install dependencies: 

git clone <repo-url>
cd <project-folder>
npm install -g
npm start

2. Run JSON-Server:  

npm install json-server 
cd src/data/db.json 
json-server --watch db.json --port 4000 

3. Open your browser and navigate to: http://localhost:5173 

** To view JSON data in browser, navigate to: http://localhost:4000 

## Viewing Live Deployment: 

Visit this link to see a live deployment of the appliciation
http://134.199.195.221:4173/


## Assumptions & Designs Decisions:
- Used a static API key for demo purposes; in production, environment variables and secure storage would be used. 
- Mock data was created using Mockaroo.com. Mockaroo allows you to create schemas and export hundred's of instances of mock data. For the purposes of this assignment, I only used data structures they already had "fake" data available to render. Additional information that didn't pre-exist, such as License Plate number, was ommitted for timing purposes, but would be something likely stored in a production level database and the UI would need to be updated accordingly. 
- Focused on functionality, accessibility, and clean code structure within the timeframe 
- Did not implement user authentication or user persistence 
- Ticket Data and Billing Activity are visible for demonstration purposes, they are tied to each user in the API, but the modules are not interactive 
- Dashboard, Receipts, and Settings are visible on the Home Page sidebar for demonstration purposes. 

## Possible Improvements / Next Steps 
- Add unit and integration tests for components and API calls 
- Implement dark mode toggle
- Cache API responses to improve performance 
- Create a details Dashboard that can serve as the Home page when a CSR logs in. 
- Utilize a global state management library such as Redux or ContextAPI to enhance code readability and application scalability.  
- Add additional design and styling for a more "branded" look. 
