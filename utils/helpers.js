/**
 * Generate a unique email address using a timestamp.
 * We will use it for registration tests where the email must not already exist.
 *
 * @param {string} prefix
 * @returns {string}
 */
function generateUniqueEmail(prefix = 'user') {
  return `${prefix}_${Date.now()}@mailinator.com`;
}

/**
 * Scrolls the page to the bottom.
 *
 * @param {import('@playwright/test').Page} page
 */
async function scrollToBottom(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

module.exports = { generateUniqueEmail, scrollToBottom };
