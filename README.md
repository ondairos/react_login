# React Login

This project is a simple login application and register application built with React, Redux Toolkit, and React Router Dom.

## Description

The project consists of two main components:

1. **Login Form**: Allows users to enter their email and password to log in. The inputs are validated and the user is redirected only on succesfull login from the server.
2. **Address Form**: Protected route that displays a form for users to fill out their personal information. At successfull submission of the form the user is redirected to their eMail Default program with prepopulated email inputs.

### API Integration

#### Login Screen:

1. **Form Fields**:

   - Email (validation: not empty, valid email)
   - Password (validation: not empty)

2. **API Integration**:

   - URL: [https://dev.ialert.ai/api/v1/login](https://dev.ialert.ai/api/v1/login)
   - Method: POST
   - Body: `{ "userName": "<email from the form>", "password": "<Password from the form>" }`
   - Headers: `Content-Type: application/json`

3. **Redirect**:
   - Upon successful login, redirect to the Address Screen.

#### Address Screen:

1. **Form Fields**:

   - First Name (validation: not empty, no numbers or special characters)
   - Last Name (validation: not empty, no numbers or special characters)
   - Email (validation: not empty, valid email)
   - Address (validation: not empty)
   - Country (validation: not empty)
   - State (validation: not empty, dynamically populated based on selected country)

2. **API Integration**:

   - URL: [https://countriesnow.space/api/v0.1/countries/states](https://countriesnow.space/api/v0.1/countries/states)
   - Method: GET
   - State Dropdown: Filled based on the selected country.

3. **Form Submission**:
   - Upon submission, open the user's default email client with the following pre-filled fields:
     - **Subject**: `{First name} {Last name} Address Data`
     - **Body**: All form data
     - **Email To**: i-alert-test@mailinator.com

## Installation

Before you start, make sure you have Node.js and npm installed on your machine.

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd react_login
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the development server:

```bash
npm run dev
```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To build the production-ready bundle:

```bash
npm run build
```

This will create an optimized production build in the `build` directory.

To preview the production build:

```bash
npm run preview
```

This will serve the production build locally for previewing.

## Dependencies

- [@reduxjs/toolkit](https://redux-toolkit.js.org/): Redux Toolkit is a package that provides a powerful set of tools for building Redux applications.
- [react](https://reactjs.org/): A JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/): This package serves as the entry point to the DOM and server renderers for React.
- [react-redux](https://react-redux.js.org/): Official React bindings for Redux.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): DOM bindings for React Router, a routing library for React.

## Development Dependencies

- [@types/react](https://www.npmjs.com/package/@types/react): TypeScript type definitions for React.
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) and [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser):
  ESLint plugin and parser for TypeScript.
- [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react): Vite plugin for React support.
- [eslint](https://eslint.org/): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks): This ESLint plugin enforces the Rules of Hooks.
- [typescript](https://www.typescriptlang.org/): TypeScript is a superset of JavaScript that adds optional static types to the language.
- [vite](https://vitejs.dev/): A next-generation frontend tooling.
