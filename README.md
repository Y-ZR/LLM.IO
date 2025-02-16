# LLM.IO

This is a Take-Home Assignment for a Software Engineer role at GovTech.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)

## Features

- ### Backend

  - CRUD operations for conversations with LLM.
  - Send prompt queries and receive response from the LLM.
  - Efficiently handle multiple conversations by storing and retrieving them from a MongoDB database
  - All prompts sent to the LLM and the responses received are anonymized and securely stored in the MongoDB database.
  - **NOTE**: The OpenAI API is currently not fully integrated with the backend due to issues with authorizing the credit payment required for using the API. As a result, direct LLM interactions may be simulated or mocked for testing purposes.

- ### Frontend

  - Clean and modern UI design powered by Mantine UI, enhancing user experience through consistent styling and interactive components.
  - Display a dynamic list of all conversations retrieved from the backend, allowing users to quickly access and manage their past interactions with the LLM.
  - Chat interface inspired by popular AI chat platforms, enabling users to send messages to the LLM and view responses in real time.

## Tech Stack

- **Frontend**: JavaScript, Next.js, React, Mantine UI, React Query
- **Backend**: Python, FastAPI, Beanie (MongoDB ODM), Pydantic, OpenAI API
- **Database**: MongoDB

## Prerequisites

Before you begin, ensure you have the following installed with their latest version:

- **Node.js**
- **npm**
- **Python**
- **pip**
- **MongoDB** (locally or via a cloud service like MongoDB Atlas)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Y-ZR/llm.io.git
cd llm-io
```

### 2. Install MongoDB

If you haven’t installed MongoDB yet, please refer to the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).

### 3. Run the Backend

1.  Navigate to the Backend Directory

    ```bash
    cd backend
    ```

2.  Create a Python Virtual Environment

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  Install Backend Dependencies

    ```bash
    pip install -r requirements.txt

    ```

4.  Start the FastAPI Server

    ```
    uvicorn app.main:app --reload
    ```

5.  View the FastAPI documentation [here](http://127.0.0.1:8000/docs#/) (http://127.0.0.1:8000/docs#/).

### 4. Run the Frontend

1.  Navigate to the Frontend Directory

    ```bash
    cd frontend
    ```

2.  Install Frontend Dependencies

    ```bash
    npm install
    ```

3.  Start the Next.js Development Server

    ```bash
    npm run dev
    ```

4.  Visit the locally deployed frontend [here](http://localhost:3000) (http://localhost:3000).