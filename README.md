**AI Powered Precision Medicine**
This project is a health recommendation system that analyzes user-submitted medical data and provides condition detection, risk level, and personalized treatment suggestions. The goal is to support more accurate and efficient clinical decision-making through AI-driven analysis.

>>Current Features
Health Data Collection
Multi-step form for patients to enter:

Symptoms

Vitals including blood pressure, sugar, temperature

Genetic background and family history

Lifestyle habits such as sleep, diet, stress

>>Backend AI Analysis
Rule-based logic implemented in Node.js Express server

Conditions like Hypertension, Diabetes, and Fever are detected based on input

Generates:

Detected condition

Risk level

Recommended treatment

Lifestyle changes

>>Data Storage and Retrieval
All patient results are stored in a MySQL database

Unique result ID assigned to each record

Frontend supports fetching and displaying result data using React and Axios

>>Results Page
Displays AI analysis in a structured layout

Risk indicator based on severity

Doctor details and assigned recommendations

Supports deep linking using the result ID

Authentication and Routing
Role-based access for patients and doctors

React Context API used for managing authentication state

>>Technologies Used
Frontend: React with Tailwind CSS

Backend: Node.js with Express

Database: MySQL

API communication using Axios and REST endpoints

>>Planned Features
Medication recommendation based on condition, genetics, and lifestyle

Integration of a machine learning model for dynamic analysis

Doctor dashboard to review and update patient results

Visualizations for patient history and health trends

File uploads for medical reports and doctor annotations

>>How to Run
Start the backend

>>pgsql

cd server
npm install
node server.js
Start the frontend

>>arduino
cd client
npm install
npm run dev
>>About
This project is part of a broader vision to deliver AI assisted clinical support. Built as part of an academic initiative, it combines medical logic with intelligent interfaces for future-ready healthcare applications.
