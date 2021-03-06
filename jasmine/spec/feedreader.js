/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a url for each feed', function() {
           for (feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a name for each feed', function() {
           for (feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('should be hidden by default', function() {
         let body = document.getElementsByTagName('body');
         let menuStatus = body[0].className;
         expect(body).not.toBe(null);
         expect(menuStatus).toBe('menu-hidden');
       });
       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('should show or hide on click', function() {
          //Ensure default value of menu class name
          let body = document.getElementsByTagName('body');
          let menuStatus = body[0].className;
          expect(body).not.toBe(null);
          expect(menuStatus).toBe('menu-hidden');
          // now trigger a click and check again
          let menuIcon = document.getElementsByClassName('menu-icon-link')[0];
          menuIcon.click();
          body = document.getElementsByTagName('body');
          menuStatus = body[0].className;
          //body should no longer have a class of "menu-hidden"
          expect(body).not.toBe(null);
          expect(menuStatus).not.toContain('menu-hidden');
          // Now lets click one more time to see if it hides again
          menuIcon.click();
          body = document.getElementsByTagName('body');
          menuStatus = body[0].className;
          //body should have a class of "menu-hidden" once again
          expect(body).not.toBe(null);
          expect(menuStatus).toContain('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       // first lets load the second feed
       beforeEach((done) => {
         loadFeed(1, done);
       });

       it('should return at least one entry', function() {

         // the result should exist and not be undefined
         expect($('.feed .entry').length).toBeDefined();
         expect($('.feed .entry').length).not.toBe(null);
         //there should be multiple entries returned
         expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    })


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

       let firstFeed, secondFeed;

       beforeEach((done) => {
         //let's first load the first and second feed
         //then store the first element of each in a variable.
           loadFeed(0, () => {
               firstFeed = document.getElementsByClassName('feed')[0].innerHTML;
               loadFeed(1, () => {
                   secondFeed = document.getElementsByClassName('feed')[0].innerHTML;
                   done();
               });
           });

       });

       it('should change the entries based on which feed is loaded', function() {

         // the first element of each feed should exist and not be undefined
         expect(firstFeed).toBeDefined();
         expect(firstFeed).not.toBe(null);
         expect(secondFeed).toBeDefined();
         expect(secondFeed).not.toBe(null);
         //they should be different/distinct from each other
         expect(firstFeed).not.toBe(secondFeed);
       });
    })

}());
