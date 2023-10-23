# Nicks-Social-Media-Network-API

This social media network API serves as a foundation for managing user profiles, thoughts, reactions, and friendships. Users can create, update, and delete thoughts, react to thoughts, add and remove friends, and perform various user-related operations. It provides essential backend functionalities for a basic social media platform.

## Table of Contents

- [Introduction](#introduction)
- [Video Tutorial](#video-tutorial)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Social Media Network API! This project is designed as a learning experience to explore the fundamentals of building a social media platform's backend infrastructure. It offers essential features such as user profile management, thought creation, reaction handling, and friend management. Dive in to gain insights into the core components of a social media network and expand your development skills. Happy coding!

## Video Tutorial

[Video Link](https://drive.google.com/file/d/1M02ytCYHsQF3jsTKCR0YI_oIjAFfg6kl/view)

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-folder>`
3. Install dependencies: `npm install`

## Usage

Follow these steps to run the application:

1. **Start the Server:**
   ```sh
   npm start
   ```

## API Endpoints

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `POST /api/thoughts`: Create a new thought.
- `GET /api/thoughts/:id`: Get a specific thought by ID.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

### Users

- `GET /api/users`: Get all users.
- `POST /api/users`: Create a new user.
- `GET /api/users/:id`: Get a specific user by ID.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.
- `POST /api/users/:userId/friends`: Add friends to a user.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user.

Provide details about request and response formats if necessary.

## Contributing

If you would like to contribute to the project, please follow the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## License

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
