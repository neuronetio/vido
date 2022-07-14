// @ts-nocheck
const path = require('path');
const url = 'file:///' + path.resolve('./tests');

describe('Slots', () => {
  beforeAll(async () => {
    console.log('page', page);
    await page.goto(`${url}/slots/slots.html`);
  });
  it('should display everything', async () => {
    await expect(page).toMatchElement('.items');
    await expect(page).toMatchElement('.slot-3');
    const c = await page.evaluate(() => {
      return getComponents();
    });
    expect(c.length).toEqual(1 + 5 * 2);
  });

  it('should have proper number of components', async () => {
    await page.evaluate(() => {
      changeProps(2);
    });
    await expect(page).not.toMatchElement('.slot-3');
    await expect(page).toMatchElement('.slot-6', { text: 'slot 6' });
    await page.click('#btn-6');
    await page.click('#btn-6');
    await expect(page).toMatchElement('.slot-6', { text: 'slot 6!!' });
    await expect(page).toMatchElement('.item-6-text', { text: 'item 6' });
    const c1 = await page.evaluate(() => {
      return getComponents();
    });
    expect(c1.length).toEqual(1 + 2 * 2);

    await page.evaluate(() => {
      changeProps(4);
    });
    await expect(page).not.toMatchElement('.slot-3');
    await expect(page).toMatchElement('.slot-9');
    const c2 = await page.evaluate(() => {
      return getComponents();
    });
    expect(c2.length).toEqual(1 + 4 * 2);

    await page.evaluate(() => {
      changeProps(5);
    });
    await expect(page).not.toMatchElement('.slot-3');
    await expect(page).toMatchElement('.slot-10');
    const c3 = await page.evaluate(() => {
      return getComponents();
    });
    expect(c3.length).toEqual(1 + 5 * 2);
  });

  it('should destroy app', async () => {
    await page.evaluate((_) => {
      app.destroy();
    });
    await expect(page).not.toMatchElement('.items');
    const c = await page.evaluate(() => {
      return getComponents();
    });
    expect(c.length).toEqual(0);
  });
});
