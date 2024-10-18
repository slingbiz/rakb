
# RAKBANK Microfrontend Application

## Summary

This application demonstrates a microfrontend architecture, consisting of three separate React apps—Step 1, Step 2, and Step 3—each representing different stages of a form. Along with these, there is a shared microfrontend (an NPM module) used to share common components like the Header, Footer, and other UI elements across all microfrontends. Additionally, a Node.js backend handles API requests.

For demo purposes:
- **Step 1** is hosted on port **3001**
- **Step 2** is hosted on port **3002**
- **Step 3** is hosted on port **3003**

While the microfrontends are designed to be served through an NGINX reverse proxy, for the sake of simplicity in this demo, they communicate directly via static URLs.

> **Note**: The shared microfrontend uses hardcoded URLs for communication in this demo.

## Steps to Run the Microfrontend Application

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/slingbiz/rakb/
   \`\`\`

2. **Set up the shared components**:
   - Navigate to the `shared` directory:
     \`\`\`bash
     cd shared
     \`\`\`
   - Install dependencies and build the shared components:
     \`\`\`bash
     npm install
     npm run build
     yalc publish
     \`\`\`
   - **Note**: Ensure that [yalc](https://github.com/wclr/yalc) is installed globally. If not, install it with:
     \`\`\`bash
     npm install -g yalc
     \`\`\`

3. **Set up each microfrontend (Step 1, Step 2, Step 3)**:
   - Go to each step directory (e.g., `step1`):
     \`\`\`bash
     cd step1
     npm install
     yalc add shared-components
     npm start
     \`\`\`
   - Repeat the same steps for `step2` and `step3`.

4. **View the application**:
   - Open your browser and navigate to:
     \`\`\`
     http://localhost:3001
     \`\`\`
     This will load **Step 1**.

## Folder Structure

\`\`\`
rakb/
├── shared/                  # Shared components used by all microfrontends
│   ├── src/
│   └── ...
├── step1/                   # Microfrontend for Step 1
│   ├── src/
│   └── ...
├── step2/                   # Microfrontend for Step 2
│   ├── src/
│   └── ...
├── step3/                   # Microfrontend for Step 3
│   ├── src/
│   └── ...
└── server/                  # Node.js backend
\`\`\`

## Caveats

- A **unique user ID** is generated when the user first visits Step 1. This ID is used across Step 2 and Step 3 to maintain state across microfrontends.
- Since the apps aren't behind an NGINX proxy, query parameters are used to pass the user ID between microfrontends. This ensures that the backend can process the user’s data consistently.
- After Step 3 is submitted successfully, a dialog with a success message and the server-generated ID is displayed. Error handling is also integrated for failed submissions.

## Additional Features

- **Shared Components**: All three microfrontends leverage a shared NPM module that provides common UI components such as the **Button** and **404 Page**.
- **Microfrontend Communication**: In this demo setup, hardcoded URLs are used to handle transitions between steps. For a production-grade setup, an NGINX reverse proxy is recommended to route between the microfrontends seamlessly.
