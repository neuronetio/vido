const path = require('path');

module.exports = {
  Basic: function(client) {
    client
      .url('file:///' + path.join(__dirname, './basic.html'))
      .waitForElementVisible('body', 1000)
      .assert.containsText('.test', 'Test text', 'Checking component text');
  },

  after(client) {
    client.end();
  }
};
