const expect = require('expect');
const path = require('path');

function getComponents() {
  const c = [];
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
      .waitForElementVisible('.test', 500)
      .waitForElementVisible('#slot-2', 500)
      .assert.containsText('.test', 'Test text')
      .execute(getComponents, [], ({ value }) => {
        expect(value.length).toEqual(6 + 5 * 7);
      })
      .execute(
        function () {
          return window.ItemInstance;
        },
        [],
        function ({ value }) {
          expect(value).toBeTruthy();
        }
      )
      .execute(
        function () {
          window.destroyItemInstance();
          const c = [];
          const components = window.vido._components;
          for (const [name, component] of components) {
            c.push(component);
          }
          return c;
        },
        [],
        function ({ value }) {
          expect(value.length).toEqual(6 + 4 * 7);
        }
      )
      .click('#remove-one')
      .waitForElementNotPresent('.item-5')
      .execute(getComponents, [], function ({ value }) {
        expect(value.length).toEqual(5 + 3 * 7);
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
        function () {
          // @ts-ignore
          return window.appDestroyed;
        },
        [],
        function ({ value }) {
          expect(value).toEqual(true);
        }
      )
      .execute(
        function () {
          // @ts-ignore
          return window.itemsDestroyed;
        },
        [],
        function ({ value }) {
          expect(value).toEqual(5);
        }
      )
      .execute(
        function () {
          // @ts-ignore
          return window.actionsDestroyed;
        },
        [],
        function ({ value }) {
          expect(value).toEqual(25);
        }
      )
      .execute(getComponents, [], ({ value }) => {
        expect(value.length).toEqual(0);
      });
  },

  after(client) {
    client.end();
  },
};
