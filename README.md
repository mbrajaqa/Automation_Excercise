# Automation Exercise – Playwright Test Automation

## Project Overview

This project is a **web UI automation framework** developed using **Playwright and JavaScript** for testing the [Automation Exercise](https://www.automationexercise.com/) e-commerce application.

The project follows the **Page Object Model (POM)** approach to improve test maintainability, reusability, and readability.

## Tech Stack

* **Playwright** – Web automation
* **JavaScript** – Programming language
* **Node.js** – Runtime environment
* **npm** – Package management
* **Page Object Model (POM)** – Framework design
* **Git & GitHub** – Version control
* **GitHub Actions** – CI/CD

## Test Coverage

The automation suite covers the following functional areas:

* User Registration
* User Login with valid credentials
* User Login with invalid credentials
* User Logout
* Registration with existing email
* Contact Us form
* Test Cases page verification
* Products page verification
* Product details verification
* Product search
* Subscription from Home page
* Subscription from Cart page

## Setup Instruction

### 1. Clone the repository

```bash
git clone https://github.com/mbrajaqa/Automation_Excercise.git
```

### 2. Navigate to the project

```bash
cd Automation_Excercise
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

### 5. Run the tests

```bash
npx playwright test
```

### 6. Run tests in headed mode

```bash
npx playwright test --headed
```

### 7. View the test report

```bash
npx playwright show-report
```
