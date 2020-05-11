// console.log('Hello, world!');
// phantom.exit();

var page = require("webpage").create();
page.open("http://www.facebook.com", function (status) {
  console.log("Status: " + status);
  if (status === "success") {
    page.render("images/facebook.png");
  }
  phantom.exit();
});
