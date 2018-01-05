module.exports = {
  "Test Home Page": function (client) {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.visible('h5')
      .assert.containsText('h5', 'More-Recipes is a platform for users to share the awesome and exciting recipe ideas they have invented or learnt')
      .end();
  }
};
