﻿<p align="center">
    <h1> Bright Route </h1>
</p>

<p align="center">    
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/node.js-6DA55F?&logo=node.js&logoColor=white">
    </a>   
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/express.js-%23404d59.svg?&logo=express&logoColor=%2361DAFB">
    </a>    
     <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/react-%2320232a.svg?&logo=react&logoColor=%2361DAFB">
    </a>   
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&logo=mongodb&logoColor=white">
    </a>
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/typescript-gray?logo=typescript">
    </a>
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/tailwind-blue?logo=tailwindcss">
    </a>
    <a href="">
        <img alt="GitHub" src="https://img.shields.io/badge/redux-violet?logo=redux">
    </a>
</p>

<h4 align="center">
    <p>
        <a href="https://bright-route-client.onrender.com">Deployed URL</a>
    <p>
</h4>
Bright Route is an innovative mentorship platform designed to connect with experienced mentors for personalized learning experiences. With a range of features aimed at enhancing the mentoring and learning process, Bright Route provides a seamless and efficient platform for both mentee and mentors. Below are the key features implemented in the project:

## Features

- **Secure Authentication:** Utilizes JWT for token-based authentication and account management, ensuring secure access for users.

- **Real-time Personal Chat:** Connect with tutors in real-time through personal chat functionality, implemented using Socket.io for seamless communication.

- **Real-time Video Conference:** Engage in live video conferences with tutors for interactive learning experiences, leveraging Zego Cloud for high-quality video streaming.

- **Plan Creation for Mentors:** Mentors can create their own mentorship plans, facilitated by MongoDB for efficient data storage and retrieval.

- **Purchase Mentor Plan:** Seamlessly purchase mentors mentorship plans and enroll in mentorship sessions, integrated with Razorpay for secure and hassle-free payment transactions.

- **Selecting a specifc mentors:** Mentees can select mentors who is suitable for their career, ensuring more priductive learning experiences.

- **Admin Side Management:** Admin dashboard for managing and verifying mentors, implemented with Node.js and Express.js using MVC Architecture for efficient administration.

- **Firebase Storage and Google Cloud:** Utilizes Firebase Storage for data synchronization and Google Cloud for scalable infrastructure, ensuring reliability and performance.
  
## UI demo

<p align="center">
    <picture>
    <img alt="brigtRoute" src="./assets/Screenshot (482).png" width=90%>
    </picture>
</p>
<p align="center">
    <picture>
    <img alt="brightRoute" src="./assets/Screenshot (483).png" width=90%>
    </picture>
</p>

## Tech stack
Main web-frameworks and libraries:
- **React js:** JavaScript library for building user interfaces, facilitating the creation of interactive and dynamic web applications.
- **Redux (& Redux toolkit):** Predictable state container for JavaScript apps, enabling the management of application state in a centralized and consistent manner.
- **Tailwindcss:** Utility-first CSS framework for building custom designs quickly and efficiently, providing a set of pre-defined utility classes for styling HTML elements.
- **Node.js:** Server-side JavaScript execution environment to produce dynamic web pages and service requests.
- **Express.js:** The de facto standard web application framework for Node.js to build web applications including this one.
- **MongoDB(& mongoose.js):** NoSQL database, which serves as the database for this tech stack, for storing and retrieving data(CRUD opreations).
- **Payment integration:** Razorpay 
- Sweet Alert, react-toastify
- JWT tocken based Authentication
- BCrypt Hashing

 Bright Route is successfully hosted on GCP, You can access the live site [bright-route.online](https://bright-route.online).

## How to Host the Bright Route locally on your system

1. Cloning the repository
   
   ```
   git clone https://github.com/amarnath-dev/bright-route.git
   ```
2. navigate to client, server and socket directories & install the dependancies
   
   ```
   cd brightroute/client
   npm install
   ```
   ```
   cd brightroute/server
   npm install
   ```
   ```
   cd brightroute/socket
   npm install
   ```
 
3. set up the env file by refering the `.examle.env` for client and server.
4. Start Node.js server using npm, the server starts processing request at [http://localhost:5000](http://localhost:5000) 
   
   ```
   npm run dev
   ```
5. Start client using npm, the client starts processing request at [http://localhost:5173](http://localhost:5173/) 
   ```
   npm run dev
   ```
6. Start socket using npm, the socket starts processing request at [http://localhost:5173](http://localhost:5173) 
   ```
   npm run dev
   ```

