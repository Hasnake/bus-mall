'use strict';
//scafolding//1.Event listner for Image.//2.constructor for image /product objects.//a.path to image file.//b.image name.
//c.vote property.
//1.Event listner for Image.
//2.constructor for image /product objects.
//a.path to image file.
//b.image name.
//c.vote property.

//var counter = 0;  //click counter set to 0
var round = function(number, precision) {
  return parseFloat(number.toFixed(precision));
};
// var randomInteger = function(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };20 pictures with index 0 to 19
function randomInteger () {
  return round((Math.floor(Math.random() * 20) + 0),0);
}
//var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
//'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
//var filepath = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg','img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg',
//'img/cthulhu.jpg','img/dog-duck.jpg','img/dragon.jpg','img/pen.jpg','img/pet-sweep.jpg','img/scissors.jpg','img/shark.jpg','img/sweep.jng','img/tauntaun.jpg','img/unicorn.jpg','img/usb.jpg','img/water-can.jpg','img/wine-glass.jpg',];

var allImages = []; //1. Create empty array
//The following code creates a prototype,'Image', and an object of that type, the 'Image'.
//The code then displays the constructor property for the object 'Image'.
//All objects in JavaScript are descended from Object;
//all objects inherit methods and properties from 'Object.prototype'.

function Image (filepath, imgName,votes) {   //2. Constructor : Needs to be capital letter
  this.imgName = imgName;
  this.filepath = filepath;
  this.howmanytimesVoted = 0;
  allImages.push(this);
}
//Image.prototype.clickedImage
//3. Then create Object instances
Image.prototype.numberOftimesTheImageClicked = function() {
  for (var i = 0; i < 15; i++) {
    this.howmanytimesVoted;
  }
};

Image.prototype.callAllMethods = function() {
  this.numberOftimesTheImageClicked();
};

new Image ('img/bag.jpg', 'bag');
new Image ('img/banana.jpg', 'banana');
new Image ('img/bathroom.jpg', 'bathroom');
new Image ('img/boots.jpg', 'boots');
new Image ('img/breakfast.jpg', 'breakfast');
new Image ('img/bubblegum.jpg', 'bubblegum');
new Image ( 'img/chair.jpg', 'chair');
new Image ('img/cthulhu.jpg', 'cthulhu');
new Image ('img/dog-duck.jpg', 'dog-duck');
new Image ('img/dragon.jpg', 'dragon');
new Image ('img/pen.jpg', 'pen');
new Image ('img/pet-sweep.jpg', 'pet-sweep');
new Image ('img/scissors.jpg', 'scissors');
new Image ('img/shark.jpg', 'shark');
new Image('img/sweep.jng','sweep');
new Image ('img/tauntaun.jpg', 'tauntaun');
new Image ('img/unicorn.jpg', 'unicorn');
new Image ('img/usb.jpg', 'usb');
new Image ('img/water-can.jpg', 'water-can');
new Image ('img/wine-glass.jpg', 'wine-glass');

function makeItAllHappen() {
  for (var i = 0; i < allImages.length; i++) {
    allImages[i].callAllMethods();
  }
}
makeItAllHappen();

//Object litral
var productImage = {
  name: 'image Name',
  numberOfClicksOnTheImage: 0,
};

productImage.nameOftheImage = function() {
  for (var i = 0; i < allImages.length; i++) {
    this.dailyTotalBeans += allImages[i].totalBeansPerDay;
  }
};

function productImageAllMethods() {
  productImage.nameOftheImage();
  //all methods here.
}
productImageAllMethods();

//Rendering a table is building the HTML page in javascript and then inserted it into the DOM.
// Document object Model specifies the browser should create a model of an HTML page and how javascript can access
// and update the contents of a web page while it is in the browser window.

//4. Now Access -- function that displays the pictures on page
var pictureOne = allImages[randomInteger()]; //pulling the random number in
var leftImg = document.getElementById('left');
leftImg.src = pictureOne.filepath;
leftImg.alt = pictureOne.imgName;

var pictureTwo = allImages[randomInteger()];
var centerImg = document.getElementById('center');
centerImg.src = pictureTwo.filepath;
centerImg.alt = pictureTwo.imgName;

var pictureThree = allImages[randomInteger()];
var rightImg = document.getElementById('right');
rightImg.src = pictureThree.filepath;
rightImg.alt = pictureThree.imgName;
//Avoid duplication of images.
function displayImage (){   //4. Now Access -- function that displays the pictures on page
  //don't show any duplicate code!
  var displayImageArray = [];
  var leftPicture = randomInteger();
  while (leftPicture === displayImageArray[0] || leftPicture === displayImageArray[1] || leftPicture === displayImageArray[2])
  {
    leftPicture = randomInteger();//This is index.

  }
  leftImg.src = allImages[leftPicture].filepath;

  var centerPicture = randomInteger();
  while (centerPicture === displayImageArray[0] || centerPicture === displayImageArray[1] || centerPicture === displayImageArray[2] || centerPicture === leftPicture)

  {
    centerPicture = randomInteger();//This is index.
  }
  centerImg.src = allImages[centerPicture].filepath;

  var rightPicture = randomInteger();
  while (rightPicture === displayImageArray[0] || rightPicture === displayImageArray[1] || rightPicture === displayImageArray[2]
    || rightPicture === leftPicture || rightPicture === centerPicture)

    {
    rightPicture = randomInteger();//This is index.
  }
  rightImg.src = allImages[rightPicture].filepath;
  displayImageArray.push(leftPicture,centerPicture,rightPicture);
}
displayImage();

var rotateImages = document.getElementById('wrapper');
rotateImages.addEventListener('click',changeThePicturesShown);
function changeThePicturesShown(event){
  if (event.target.id === 'wrapper'){
    alert('Please click on an image.');
  }
  for (var i = 0; i < allImages.length; i++) {
    if(event.target.alt === allImages[i].imgName) {
      allImages[i].votes += 1;
      displayImage();
    }
  }
}
