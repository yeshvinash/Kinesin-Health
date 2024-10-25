# Kinesin-Health

Kinesin.Health is a web application designed to streamline the workflows of medical professionals such as general practitioners, physiotherapists, and therapists. The platform simplifies administrative tasks, allowing healthcare providers to focus more on patient care and improve overall patient experience and outcomes.

## Features

- **Appointment Scheduling:** Simplified scheduling for healthcare providers and patients.
- **Consultation Notes:** Efficient recording and management of consultation notes.
- **Payment Management:** Streamlined payment processes for healthcare services.
- **Patient Portal:** Empower patients with a secure platform to manage their healthcare information.

## Technologies Used

React.js, JavaScript(ES6+), Redux Toolkit(State management tool), API Integration, npm.

## Modules

### 1. Kinesin Website

**Description:**
This is the public-facing website that provides an overview of Kinesin.Health. It is the primary entry point for healthcare professionals and patients looking to learn more about the platform. The website showcases the service's features, benefits, pricing, and other essential information.

**Purpose:**

- To present the platform to potential users and explain its value proposition.
- To provide a user-friendly interface where visitors can navigate the platform's features, services, and pricing models.

**Key Features:**

- Home page with an overview of Kinesin.Health.
- Detailed service information for medical professionals and patients.
- Contact forms for inquiries.
- Registration and login links to access other modules.

### 2. Kinesin Medical Professional

**Description:**
This module is dedicated to healthcare providers such as doctors, physiotherapists, and therapists. It simplifies their administrative tasks by offering features for managing appointments, consultation notes, and patient records.

**Purpose:**

- To allow healthcare professionals to manage their daily workflows in a streamlined manner.
- To reduce administrative overhead by centralizing patient records, appointment management, and payments.

**Key Features:**

- Appointment scheduling and management.
- Patient record management (including consultation notes, prescriptions, etc.).
- Payment tracking and invoicing.
- User-friendly interface for healthcare providers to navigate efficiently.

### 3. Kinesin Medical Professional(New Version)

**Description:**
An upgraded version of the **Medical Professional** module. This module enhances the original feature set with additional intelligent tools and optimizations for large healthcare organizations.

**Purpose:**

- To improve and expand on the existing healthcare provider functionalities with intelligent automation and advanced task management tools.
- To provide scalability and enhanced performance for larger clinics or medical institutions.

**Key Features:**

- Intelligent task reminders and follow-ups.
- Optimized performance for handling large amounts of patient data.
- Advanced appointment and patient management tools for enterprise healthcare providers.

### 4. Kinesin Patient

**Description:**
This module is focused on the patient experience, providing them with a platform to manage their healthcare interactions, including booking appointments, reviewing consultation history, and managing their health records.

**Purpose:**

- To give patients an easy-to-use platform to manage appointments and view their medical records.
- To ensure patients can communicate with their healthcare providers efficiently.

**Key Features:**

- Online appointment scheduling.
- Access to medical records, including consultation notes and prescriptions.
- Notification system for upcoming appointments and follow-ups.
- Secure communication channels with healthcare professionals.

### 5. Kinesin Patient Detail

**Description:**
This module expands on the patient module by offering a more detailed view of individual patient data. It is designed for healthcare providers who require in-depth information about a patient’s medical history.

**Purpose:**

- To allow healthcare professionals to access detailed patient data for more informed consultations.
- To provide a comprehensive and organized view of patient history and treatment records.

**Key Features:**

- Detailed patient profile with medical history.
- Complete records of past appointments, prescriptions, and treatments.
- Comprehensive data management for deep insight into patient care.

### 6. Kinesin Patient Portal

**Description:**
A secure portal for patients to log in and manage their healthcare information. This module gives patients control over their health data and provides a communication link to their healthcare providers.

**Purpose:**

- To offer patients a secure space to manage and access their healthcare data.
- To enable easy communication between patients and healthcare providers through the portal.

**Key Features:**

- Secure login for patient access.
- Appointment tracking and notifications.
- Access to past medical records and consultation history.
- Communication tools to reach healthcare providers.

### 7. Kinesin Admin

**Description:**
This module serves as the administrative dashboard for Kinesin.Health. It is designed for platform administrators who need to manage users, monitor system performance, and oversee the general operation of the platform.

**Purpose:**

- To provide a centralized control panel for administrators to manage the entire platform.
- To allow oversight of user activity, performance metrics, and system-wide settings.

**Key Features:**

- User management (adding/removing healthcare providers and patients).
- System monitoring tools and performance analytics.
- Reporting on platform usage and activity.
- Security management, including access control and permissions.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
     git clone https://github.com/yeshvinash/Kinesin-Health.git
    cd Kinesin-Health
   ```

2. Checkout the branch for the module you are working on:

   ```bash
     git checkout kinesin-website   # or any other module branch
   ```

3. Install the required dependencies:

   ```bash
     npm install
   ```

4. Start the development server:

   ```bash
     npm start
   ```

# web

## Project Management

We are capturing project tasks on the repo project board at the following url

https://github.com/users/kinesins/projects/3

Can you please update with status when you work on and complete the tasks

## Standards

Web project must support

- Components
- Tests
- Internationalisation (English and Hindi)
- Mobile support (Work on IPhone, IPad and Desktops)
- Full modern browser support required
- Security with JWT

## Security

Security will be done by accessing our auth server and it will return

- access token on JWT
- refresh token

JWT access token will expire after 1 hour and will need to be refreshed using the refresh token

### Sample Access Token

Here is the same structure of the access token

```
{
  "role": "USER",
  "permissions": [],
  "name": "peter king",
  "verified": false,
  "id": 1,
  "tenant": 0,
  "sub": "noel@oxfordventures.org",
  "iat": 1681805249,
  "exp": 1681805249
}
```

### Sample Refresh Token

Here is the same structure of the refresh token

```
{
  "sub": "noel@oxfordventures.org",
  "iat": 1681805249,
  "exp": 1681805249
}
```

## API Defitions

API details for auth service are at https://app.swaggerhub.com/apis/NOEL_3/auth-service/v1.1

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
