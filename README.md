# Task Management App

A simple task management application built with a React.js frontend and a Node.js/Express.js backend. This project is structured as a monorepo with two directories: `frontend` and `backend`.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the App](#running-the-app)
- [Deployment on Render](#deployment-on-render)
- [License](#license)

## Features

- Create, view, and delete tasks.
- Task details include title, description, due date, completed status, and created date.
- Option to mark tasks as complete and automatically delete them.
- Responsive UI styled with Tailwind CSS.
- API interactions handled with Axios.

## Technologies

- **Frontend:** React.js, Vite (or Create React App), Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
- **Version Control:** Git, GitHub

## Setup

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org)
- npm (comes with Node.js)

### Cloning the Repository

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/KniteenK/Cognocore
```
To start the app
Firstly, rename the .env.local file to .env in the Backend directory and then

```bash
cd .\Backend\
npm i
npm run dev
```
Open a new terminal and

```bash
cd .\Frontend\
npm i
npm run dev
```

Here are the deployed links
Link: https://cognocore.vercel.app/