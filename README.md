# Todo App Backend

This is a backend API built with Express.js and Mongoose for managing todo tasks.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

The Todo App Backend provides a RESTful API for managing todo tasks. It allows users to create, read, update, and delete tasks using HTTP requests.

## Features

- Create new tasks
- Retrieve existing tasks
- Update task details
- Delete tasks

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or accessible remotely

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abuayaan01/todo-app.git
2. ```bash
   npm install
3. ```bash
   npm run dev

##Usage
Once the server is running, you can use tools like Postman or curl to interact with the API endpoints. Refer to the API Endpoints section for details on available routes and their usage.

##API Endpoints

Auth:
GET /api/user/login: Login
POST /api/user/register Register
GET /api/user/profile My Profile
GET /api/user/logout Logout

Tasks:
GET /api/task/getMyTask: Get all tasks
Update /api/task/:id Update an existing task
DELETE /api/task/:id Delete task
PUT /api/tasks/createTask Create new task

