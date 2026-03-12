# Playwright UI Automation

UI test automation for [Automation Exercise](https://automationexercise.com) using **Playwright** and **JavaScript**.

---

## Project Structure

```
playwright-ui-automation/
├── tests/
│   ├── homepage.spec.js    # Home page navigation and subscribe tests
│   ├── login.spec.js       # Login and signup form tests
│   ├── products.spec.js    # Product listing, search and detail tests
│   └── cart.spec.js        # Add to cart, remove, empty cart tests
├── utils/
│   └── helpers.js          # Small reusable utility functions
├── playwright.config.js    # Playwright configuration
├── package.json
└── .gitignore
```

---

## What Is Tested

| Test File | Scenarios |
|---|---|
| `homepage.spec.js` | Page load, logoo, navbar links, featured products, newsletter subscribe |
| `login.spec.js` | Invalid login, duplicate signup, redirect to registration |
| `products.spec.js` | Product list, search with results, search no results, product detail |
| `cart.spec.js` | Empty cart, add product, remove product, navbar navigation |

---

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Install

```bash
git clone https://github.com/YOUR_USERNAME/playwright-ui-automation.git
cd playwright-ui-automation
npm install
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run in Headed Mode (see the browser)

```bash
npm run test:headed
```

### Run in Debug Mode

```bash
npm run test:debug
```

### Open HTML Report

```bash
npm run test:report
```

---

## Browsers

Tests run on **Chromium** and **Firefox** (configured in `playwright.config.js`).

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- [Node.js](https://nodejs.org/) — runtime
