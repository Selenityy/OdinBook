# OdinBook - A Full-Stack Mock Social Media Application

Welcome to the OdinBook repository, a mock social media platform built as part of [The Odin Project](https://www.theodinproject.com/paths) NodeJS curriculum. This project showcases my proficiency in full-stack web development, highlighting both frontend and backend development skills, along with database management, testing, and deployment.

## Features

- **User Authentication**: Secure login and registration process with JSON Web Tokens (JWT).
- **Security Features**: Implementation of security best practices, including password hashing and input validation.
- **Profile Management**: Users can edit their profile name and description.
- **Friends & Users**: Users can send friend requests, reject friend requests and delete friends off their friends list.
- **Posts & Comments**: Users can create, edit, and delete their posts/comments, as well as like and comment on others' posts/comments.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.
- **Demo Account**: A test account is provided for exploring the OdinBook features, no sign up required.

## Technology Used

- [NodeJS](https://nodejs.org/en) - Server-side Javascript runtime
- [Express](https://expressjs.com/) - NodeJS web application framework
- [React](https://react.dev/) - Library for building user interfaces
- [Next.js](https://nextjs.org/) - React framework with server-side rendering
- [MongoDB](https://www.mongodb.com/) - NoSQL document database
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - Library for testing HTTP servers
- [Cypress](https://www.cypress.io/) - End-to-end testing framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Passport](https://www.passportjs.org/) - Authentication middleware for Node.js
- [Railway](https://railway.app/) - Deployment platform designed to streamline the software development life-cycle
- [Vercel](https://vercel.com/) - Serverless platform for static and hybrid applications

## Learning and Challenges

This project reflects my journey in tackling complex web development challenges. Here are some of the key learning experiences and challenges I encountered:

- **Adapting to Next.js**: Transitioning from the Next.js pages router to the newer app router required learning about dynamic routes, rendering, linking, and navigating. This also involved understanding the project structure, such as layouts, loadings and nesting pages, which was crucial for building a scalable and maintainable application.

- **State Management with Redux**: Implementing Redux provider and store was a significant learning curve. It allowed me to manage global state values efficiently, enabling seamless data flow and reactivity across the application.

- **Backend Communication with Thunks**: Instead of relying solely on getStaticProps, which is not used in app routing, I learned to utilize async thunks. This approach facilitated communication with the backend, making it possible to handle asynchronous operations and state updates more effectively.

- **Data Modeling and Database Management**: One of the more intricate parts of the project was nesting comments through referencing a model within another model. This deepened my understanding of MongoDB's capabilities and introduced me to the use of virtuals in my posts schema to efficiently retrieve related comments.

- **Authentication and Security**: Implementing secure authentication mechanisms using JSON Web Tokens (JWT) and bcrypt for password hashing was crucial. It not only ensured the security of user data but also taught me best practices in handling user authentication and authorization.

- **Frontend and Backend Integration**: The project provided a comprehensive experience in integrating frontend and backend technologies. From setting up RESTful APIs with Express to fetching data with React hooks, it was a valuable practice in full-stack development.

## Future Plans

While OdinBook is a fully functional web application, there's always room for growth and improvement. Here are some of the features and enhancements I'm considering for the future:

- **Real-Time Messaging**: Integrate WebSockets to implement real-time messaging between users, enhancing the interactivity and immediacy of communication on the platform.

- **Enhanced Notifications**: Expand the real-time features to include live notifications for user interactions such as likes, comments, and new posts, ensuring users stay informed and engaged.

- **User Profiles Customization**: Offer users more options to customize their profiles, including themes, profile pictures, and bio sections.

- **Photo and Video Support**: Enhance the platform to support direct uploading and sharing of photos and videos, including integration with external storage solutions for media files.

- **Third-Party Authentication**: Implement the option for users to log in using third-party services such as Google or Facebook, simplifying the sign-up process and enhancing user convenience.

- **Accessibility and Internationalization**: Continue to improve accessibility features and explore internationalization to make OdinBook accessible to a wider audience.

- **Comprehensive Test Coverage Expansion**: While the current frontend test coverage focuses on key functionalities, future development plans include expanding this coverage to ensure comprehensive testing across the application. This will further enhance the reliability and user experience of OdinBook by identifying and addressing potential issues more effectively.

## Final Note

As the final project of my self-guided journey through the Odin Project, OdinBook stands as a testament to my dedication in learning full-stack web development. It showcases my capability to develop complex, secure, and user-friendly web applications from the ground up. Feel free to dive into the repository to check out the project's codebase, understand its architecture, and explore the features I've built.

## Acknowledgements

- All profie icons were [designed by freepik](https://www.freepik.com/free-vector/variety-animal-avatars_766787.htm#fromView=search&page=1&position=3&uuid=e9db732c-2630-43e7-9beb-4a6aed74396f)
