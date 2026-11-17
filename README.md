# ToolShop: Filter, Sort, and Cart Math (Playwright)

Automated end-to-end test for (https://practicesoftwaretesting.com/), written with Playwright and JavaScript (ESM).

## Test scenario

The test `Filter, Sort, and Cart Math Check` covers these steps:

1. Filter products by the brand "MightyCraft Hardware".
2. Sort products by "Price (Low - High)".
3. Check that the displayed prices are in ascending order.
4. Open the first product in the sorted grid.
5. Add it to the cart and check the success toast and the cart badge.
6. Open the cart and check that the item is listed.
7. Set the quantity to 3 and check that the row total equals unit price * 3.

## Tech stack

- Node.js 20 or newer
- [@playwright/test](https://playwright.dev/) 1.65

## Getting started

Install the dependencies and the Playwright browsers:

```bash
npm install
npx playwright install
```

## Running the tests

```bash
npm test
```

Useful variations:

```bash
npx playwright test --headed      # watch the browser
npx playwright show-report        # open the HTML report of the last run
```

## Project structure

```
.
├── u2_finalTask.spec.js    # the test
├── playwright.config.js    # base URL, test id attribute, timeouts
├── package.json
├── package-lock.json
└── .gitignore
```

## Configuration

Settings live in `playwright.config.js`:

- `baseURL`: the site address, so the test navigates with a relative path.
- `testIdAttribute`: set to `data-test`, which this site uses, so `getByTestId` works.
- `timeout` and `expect.timeout`: limits for explicit waits on a slow site.

## Test design

- No hardcoded pauses. All waiting is done with Playwright's auto-waiting, web-first assertions and `expect.poll`.
- Locators use roles, labels and test ids instead of absolute or generated paths.
- Prices are parsed as numbers. The sort order and the row total are calculated, not hardcoded.
- The first product is picked dynamically, not by name.

## Known fragile spots

- The first product is picked with the `a.card` locator, which depends on a CSS class name.
- The strict ascending check assumes the products have different prices.
