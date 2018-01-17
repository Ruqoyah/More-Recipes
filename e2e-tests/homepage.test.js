module.exports = {
  "Display homepage and ensure all element are available": (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('h5')
      .assert.containsText('h5', 'More-Recipes is a platform for users to share the awesome and exciting recipe ideas they have invented or learnt')
      .assert.visible('a.btn.btn-outline-danger.btn-lg')
      .assert.visible('a.btn.btn-outline-success.btn-lg')
      .assert.containsText('a.btn.btn-outline-danger.btn-lg', 'Create a profile')
      .assert.containsText('a.btn.btn-outline-success.btn-lg', 'Login')
      .assert.visible('div.footer');
    browser.expect.element('img').to.have.attribute('src')
      .which.contains('images/logo.png');
    browser.expect.element('img.d-block.w-100').to.have.attribute('src')
      .which.contains('images/slide1.png');
    browser.end();
  }
};
