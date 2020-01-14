const expect = require('expect');
const path = require('path');

function getComponents() {
  const c = [];
  // @ts-ignore
  const components = window.vido._components;
  for (const [name, component] of components) {
    c.push(component);
  }
  return c;
}

module.exports = {
  Create(client) {
    client
      .url('file:///' + path.join(__dirname, './basic.html'))
      .waitForElementVisible('body', 1000)
      .assert.containsText('.test', 'Test text')
      .execute(getComponents, [], ({ value }) => {
        expect(value.length).toEqual(6 + 5 * 5);
      });
  },

  Destroy(client) {
    client
      .click('#destroy-main')
      .assert.not.elementPresent('.test')
      .execute(getComponents, [], ({ value }) => {
        expect(value.length).toEqual(0);
      })
      .execute(
        function() {
          // @ts-ignore
          return window.appDestroyed;
        },
        [],
        function({ value }) {
          expect(value).toEqual(true);
        }
      )
      .execute(
        function() {
          // @ts-ignore
          return window.itemsDestroyed;
        },
        [],
        function({ value }) {
          expect(value).toEqual(5);
        }
      )
      .execute(
        function() {
          // @ts-ignore
          return window.actionsDestroyed;
        },
        [],
        function({ value }) {
          expect(value).toEqual(25);
        }
      )
      .execute(
        function() {
          // @ts-ignore
          return window.itemChildDestroyed;
        },
        [],
        function({ value }) {
          expect(value).toEqual(25);
        }
      );
  },

  after(client) {
    client.end();
  }
};
