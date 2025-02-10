# Hotel Management Software

## Overview
This is the development of a Room Management App designed to streamline the management of room reservations, check-ins, check-outs, housekeeping, and guest services for the hotel.<br />
MVP is targeted for Raphilo Hotel Management in Oke Aro, Akure

## Objectives
- The primary objectives of the Room Management App are:
- To automate and simplify room booking and management processes.
- To enhance the efficiency of hotel staff by providing real-time access to room statuses.
- To improve the guest experience through streamlined check-in/check-out processes and personalized services.
- To provide hotel management with actionable insights through detailed reporting and analytics.

## Features
- Room Booking / Management
- Hotel Registration
- Reports
- Bar Management
- Expense Management

## Table of Contents
1. Project Setup
2. Database Setup
3. Running the Project
4. Contributing

## Requirements
Before setting up the project, ensure you have the following installed:

- Python 3.x
- Node.js
- Django
- React JS
- Git
- Virtualenv (optional but recommended)

## Installation Steps
1. Clone the repository
Use Git to clone the repository from GitHub: <br />
git clone https://github.com/lagra-iku/hotel_management.git
2. Navigate to the project folder <br />
    cd hotel_management_software
3. Create a virtual environment (optional but recommended)
You can create a virtual environment to isolate project dependencies: <br />
    python -m venv env
4. Activate the virtual environment <br />
On Windows:<br />
    .\env\Scripts\activate <br />
On macOS/Linux: <br />
    source env/bin/activate
5. Install dependencies
Install the required packages using pip: <br />
    pip install -r requirements.txt


## Database Setup
This project uses SQLite as the default database.

1. Create a .env file
Create a .env file in the root of your project directory. The file should look like this: <br />
    DEBUG=True <br />
    SECRET_KEY=your-secret-key-here
2. Run database migrations
After setting up the environment and project, run the migrations to create the SQLite database: <br />
    python manage.py migrate
3. Create a superuser (optional)
If you want to access the Django admin interface, create a superuser: <br />
    python manage.py createsuperuser <br />
Follow the prompts to set up your admin user.

## Running the Project
1. Start the development server
Run the following command to start the Django development server:
    python manage.py runserver
2. Access the application
    Open your browser and navigate to: <br />
        http://127.0.0.1:8000/ <br />
    If you created a superuser, you can log in to the admin panel at: <br />
        http://127.0.0.1:8000/admin/

## Contributing
To contribute to this project, follow these steps:
1. Fork the repository
2. Create a new branch <br />
    git checkout -b feature-branch
3. Make your changes
4. Commit your changes <br />
    git commit -m "Your detailed commit message"
5. Push to your branch <br />
 <b>git push origin feature-branch</b>
6. Create a Pull Request on GitHub.

## Contributors
https://github.com/lagra-iku
https://github.com/Olisajioke