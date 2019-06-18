
describe('app general tests', () => {

  beforeAll(async() => {
    page.setDefaultTimeout(3600 * 1000);
    await page.coverage.startJSCoverage();
  });

  beforeEach(async() => {
    jest.setTimeout(100 * 1000);
    await page.goto('http://localhost:3000');
  });

  it('should have a title', async() => {
    await expect(await page.title()).toEqual('PDISolutionCenterFront');
  });

  it('should running ui5', async() => {
    // detect page have a root UI5 element
    await expect(await page.evaluate(() => document.body.firstElementChild.getAttribute("data-sap-ui-area"))).toEqual("sap-ui-static");
  });

  afterAll(async() => {
    await page.coverage.stopJSCoverage();
  });

});