var fs = require("fs");
var webpage = require("webpage");
var system = require('system');

var curdir;
var htmlDirectory = fs.workingDirectory + "/html";
var imageDirectory = fs.workingDirectory = "/images"

setWorkingDirectories(system.args);
deleteImageDirectory(imageDirectory);

var htmlFiles = readAllHTMLFiles();
console.log("Number of Html Files: " + htmlFiles.length);

var loadInProgress = false;
// output pages as PNG
var pageindex = 0;
var page = webpage.create();
var interval = setInterval(function () {
  if (!loadInProgress && pageindex < htmlFiles.length) {
    console.log("Image " + (pageindex + 1));
    console.log(htmlFiles[pageindex]);
    page.open(htmlFiles[pageindex]);
  }
  if (pageindex == htmlFiles.length) {
    console.log("Image render complete!");
    phantom.exit();
  }
}, 250);

page.onLoadStarted = function () {
  loadInProgress = true;
  console.log("Page " + (pageindex + 1) + " load started");
};

page.onLoadFinished = function () {
  loadInProgress = false;
  var pngName = htmlFiles[pageindex].match(/\/([^\/]+)\.html/);
  console.log("Name", pngName[1]);
  page.render(imageDirectory + "/" + pngName[1] + ".png");
  console.log("Page " + (pageindex + 1) + " load finished");
  pageindex++;
};

function setWorkingDirectories (args){
  if (args.length === 1) {
    console.log('No arguments found, taking current directory as the working directory.');
    curdir = fs.list(workingDirectory);
  } else if(args.length === 2 ) {
    htmlDirectory = args[1];
    curdir = fs.list(args[1]);
  } else {
    htmlDirectory = args[1];
    curdir = fs.list(args[1]);
    imageDirectory = args[2];
  }
}

function deleteImageDirectory(toDelete) {
  fs.removeTree(toDelete);
}

function readAllHTMLFiles(){
  var htmlFiles = new Array();
  // loop through files and folders
  for (var i = 0; i < curdir.length; i++) {
    var fullpath = htmlDirectory + fs.separator + curdir[i];
    // check if item is a file
    console.log("Full path", fullpath);
    if (fs.isFile(fullpath)) {
      // check that file is html
      if (fullpath.indexOf(".html") != -1) {
        // show full path of file
        console.log("File path: " + fullpath);
        htmlFiles.push(fullpath);
      }
    }
  }
  return htmlFiles;
}