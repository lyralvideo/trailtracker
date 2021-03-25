// spec.js
describe('Protractor Demo App', function() {
    it('should add one and two', function() {
      browser.get('http://localhost:4200/');
      browser.sleep(600);
      element(by.css('input[name="search"]')).click();
      element(by.css('input[name="search"]')).clear().sendKeys('walks in columbus');
      element(by.css('button[name="search-button"]')).click();
      browser.sleep(6000);
    });
  });
