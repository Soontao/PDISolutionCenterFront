
describe('Application general tests', () => {

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

  afterAll(async() => {
    await page.coverage.stopJSCoverage();
  });

});