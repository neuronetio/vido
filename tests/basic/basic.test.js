// @ts-nocheck
const path = require('path');
const url = 'file:///' + path.resolve('./tests');

describe('Basic', () => {
  beforeAll(async () => {
    await page.goto(`${url}/basic/basic.html`);
    console.log(`${url}/basic/basic.html`);
  });
  it('should display everything', async () => {
    await expect(page).toMatch('Test text');
    await expect(page).toMatchElement('#slot-2');
    await expect(page).toMatchElement('.action-2', { text: 'action 2' });
    await expect(page).toMatchElement('.actionFn-3', { text: 'actionFn 3' });
    await expect(page).toMatchElement('.item-5');
    await expect(page).toMatchElement('.item-1');
  });

  it('should have proper number of components', async () => {
    await page.goto(`${url}/basic/basic.html`);
    const c1 = await page.evaluate(() => {
      return globalThis.getComponents();
    });
    await expect(c1.length).toEqual(6 + 5 * 7);

    const c2 = await page.evaluate(() => {
      window.destroyItemInstance();
      return getComponents();
    });
    await expect(c2.length).toEqual(6 + 4 * 7);
    await expect(page).not.toMatchElement('.item-1');

    await page.click('#remove-one');
    await expect(page).not.toMatchElement('.item-5');
    const c3 = await page.evaluate(() => {
      return getComponents();
    });
    await expect(c3.length).toEqual(5 + 3 * 7);
  });

  it('should change background color', async () => {
    await expect(page).toMatchElement('#red-box');
    const style = await (await page.$('#red-box')).getProperty('style');
    console.log(style);
  });

  it('should destroy app', async () => {
    await page.click('#destroy-main');
    await expect(page).not.toMatchElement('.test');
    const c = await page.evaluate((_) => {
      return getComponents();
    });
    expect(c.length).toEqual(0);
  });
});
