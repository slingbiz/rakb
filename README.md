# RAKBANK Microfrontend App

## Summary
This application uses three microfrontend React apps, and one shared microfrontend (an NPM module) for common components such as the Header, Footer, and logos across all microfrontends. It also includes a Node.js backend. For demo purposes, each of the microfrontends is hosted on the following ports:
- Step1: `localhost:3001`
- Step2: `localhost:3002`
- Step3: `localhost:3003`

To make the application work seamlessly, an NGINX server is recommended for running the microfrontends using reverse proxy. However, for demo purposes, these microfrontends are communicating directly using static URLs.

Screenshots from the working app can be found in the `./screenshots` folder.

## Steps to Run the Microfrontend App
1. Clone the repository:
    ```bash
    git clone https://github.com/slingbiz/rakb/
    ```

2. Install and build the shared components package:
    ```bash
    cd shared
    npm install
    npm run build
    yalc publish
    ```

    Ensure you have `yalc` installed globally:
    ```bash
    npm install -g yalc
    ```

3. Install and run each microfrontend:
    - Navigate to each step directory (e.g., `step1`):
        ```bash
        cd step1
        npm install
        yalc add shared-components
        npm start
        ```
    - Repeat the same steps for `step2` and `step3`.

4. Start the backend server:
    ```bash
    cd server
    npm install
    npm run dev
    ```

5. View the application:
    - Open your browser and navigate to: `http://localhost:3001`
    - This will load **Step 1**.

## Folder Structure
```plaintext
rakb/
├── shared/        # Shared components used by all microfrontends
├── src/
│   ├── step1/     # Microfrontend for Step 1
│   ├── step2/     # Microfrontend for Step 2
│   ├── step3/     # Microfrontend for Step 3
├── server/        # Node.js backend
└── screenshots/   # Screenshots of the working app
```

## Mock API

The backend for this application is a Node.js server that serves as a mock API. It handles requests from the frontend apps (Step 1, Step 2, Step 3) and provides a mock response for each step submission.

### API Endpoints
- **POST /api/saveData**
    - This endpoint simulates saving form data at each step.
    - Expects JSON input for form data (varies based on the step).
    - Returns a mock success response with a generated `id`.

    **Request Example:**
    ```bash
    POST http://localhost:9000/api/saveData
    Content-Type: application/json
    ```

    **Request Body Example (Step 1):**
    ```json
    {
      "userId": "12345",
      "step": 1,
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
    ```

    **Response Example:**
    ```json
    {
      "id": "unique-backend-id",
      "message": "Data saved successfully for Step 1"
    }
    ```

    **Request Body Example (Step 2):**
    ```json
    {
      "userId": "12345",
      "step": 2,
      "address": "123 Main Street"
    }
    ```

    **Response Example (Error):**
    ```json
    {
      "error": "Invalid data or server error"
    }
    ```

### How to Start the Mock API Server
1. Navigate to the `server/` directory.
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm run dev
    ```

    The server will start running on `http://localhost:9000` by default.

### Important Notes
- The API is a **mock** and does not persist any data. Each request will generate a mock response.
- Each form submission from Step 1, Step 2, or Step 3 should include the `userId` and `step` information to ensure that the correct flow is maintained across the steps.
