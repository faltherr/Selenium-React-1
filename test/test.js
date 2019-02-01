/**
 * Dependency Modules
 */
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
require("geckodriver");
// Application Server
const serverUri = "http://localhost:3000/#";
const appTitle = "React Selenium App";

/**
 * Configure the test to test on the Chrome browser
 * What browsers we want to test and what configurations are needed
 * @type {webdriver}
 */

var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

/**
 * Uncoment this code to configure the Firefox browser
 * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
 * @type {webdriver}
 */
/*
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "firefox" })
 .build();
 */


/**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
function logTitle() {
  return new Promise((resolve, reject) => {
    browser.getTitle().then(function(title) {
      resolve(title);
    });
  });
}

/**
 * Sample test case
 * To check whether the given value is present in array.
 */
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe("Home Page", function() {
  /**
   * Test case to load our application and check the title.
   */
  it("Should load the home page and get title", function() {
    return new Promise((resolve, reject) => {
      browser
    //   This opens our app
        .get(serverUri)
    // This gets the title of the app and it passes the title to the next call back
        .then(logTitle)
        .then(title => {
          assert.strictEqual(title, appTitle);
    // Here we resolve the promise   
          resolve();
        })
        .catch(err => reject(err));
    });
  });
  /**
   * Test case to check whether the given element is loaded.
   */
  it("Should check whether the given element is loaded", function() {
    return new Promise((resolve, reject) => {
      browser
    //   .findElement is an inbuilt Selenium webdriver method allowus to find the element with id of sel-button
        .findElement({ id: "sel-button" })
    //  If we find the above element we resolve the promise otherwise we reject 
        .then(elem => resolve())
        .catch(err => reject(err));
    });
  });
  /**
   * End of test cases use.
   * Closing the browser and exit.
   */
  after(function() {
    // End of test use this.
    browser.quit();
  });
});
