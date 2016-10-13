'use strict';
//1.Event listner for Image.
//2.constructor for image /product objects.
//a.path to image file.
//b.image name.
//c.vote property.
//1.Event listner for Image.
//2.constructor for image /product objects.
//a.path to image file.
//b.image name.
//c.vote property.


var counter = 0;  //click counter set to 0

var round = function(number, precision) {
  return parseFloat(number.toFixed(precision));
};
// var randomInteger = function(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };20 pictures with index 0 to 19
function randomInteger () {
  return round((Math.floor(Math.random() * 20) + 0),0);
}

var selectedPictureList = document.getElementById('votes');
var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
var filepath = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg','img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg',
'img/cthulhu.jpg','img/dog-duck.jpg','img/dragon.jpg','img/pen.jpg','img/pet-sweep.jpg','img/scissors.jpg','img/shark.jpg','img/sweep.jng','img/tauntaun.jpg','img/unicorn.jpg','img/usb.jpg','img/water-can.jpg','img/wine-glass.jpg',];

var imageGallery = []; //1. Create empty array

function Image (filepath, imgName) {   //2. Constructor : Needs to be capital letter
  this.imgName = imgName;
  this.filepath = filepath;
  this.howmanytimesClicked = 0;
  this.howmanytimesDisplayed = 0;
  imageGallery.push(this);
}
//Image.prototype.clickedImage
//3. Then create Object instances
var fromLocalStorage = localStorage.getItem('imageGallery');
if (fromLocalStorage){
  imageGallery = JSON.parse(fromLocalStorage);
} else {
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
}

function displayImage (){   //4. Now Access -- function that displays the pictures on page
  var previousArray = [];
  var pictureOne = imageGallery[randomInteger()]; //pulling the random number in
  var leftImg = document.getElementById('left');
  leftImg.src = pictureOne.filepath;
  leftImg.alt = pictureOne.imgName;

  var pictureTwo = imageGallery[randomInteger()];
  var centerImg = document.getElementById('center');
  centerImg.src = pictureTwo.filepath;
  centerImg.alt = pictureTwo.imgName;

  var pictureThree = imageGallery[randomInteger()];
  var rightImg = document.getElementById('right');
  rightImg.src = pictureThree.filepath;
  rightImg.alt = pictureThree.imgName;

  //don't show any duplicate code!
  var leftPicture = randomInteger();
  while (leftPicture === previousArray[0] || leftPicture === previousArray[1] || leftPicture === previousArray[2])
  {
    leftPicture = randomInteger();

  }
  left.src = imageGallery[leftPicture].filepath;

  var centerPicture = randomInteger();
  while (centerPicture === previousArray[0] || centerPicture === previousArray[1] || centerPicture === previousArray[2] || centerPicture === leftPicture)

  {
    centerPicture = randomInteger();
  }
  center.src = imageGallery[centerPicture].filepath;

  var rightPicture = randomInteger();
  while (rightPicture === previousArray[0] || rightPicture === previousArray[1] || rightPicture === previousArray[2]
    || rightPicture === leftPicture || rightPicture === centerPicture)

    {
    rightPicture = randomInteger();
  }
  right.src = imageGallery[rightPicture].filepath;

  imageGallery[rightPicture].howmanytimesDisplayed += 1;
  imageGallery[centerPicture].howmanytimesDisplayed += 1;
  imageGallery[leftPicture].howmanytimesDisplayed += 1;
  previousArray.push(leftPicture);
  previousArray.push(centerPicture);
  previousArray.push(rightPicture);
}

displayImage(); //calling the function console.log(rightImg, pictureThree);here.

  // ***************************start the rotation process

var rotateImage = document.getElementById('wrapper');
rotateImage.addEventListener('click',changeThePicturesShown);  //this is the clicking of the camera
reset.addEventListener('click',resetLocalStorage);
refresh.addEventListener('click',refreshPage);
function resetLocalStorage(){
  localStorage.clear();
}
function refreshPage(){
  location.reload();
}
function changeThePicturesShown(event) {
  if (event.target.id === 'wrapper'){
    alert('Please click on an image.');
  }

  for (var i = 0; i < imageGallery.length; i++) {
    if(event.target.alt === imageGallery[i].imgName) {
      imageGallery[i].howmanytimesClicked += 1;
      displayImage();
    }
  }
  var toLocalStorage = JSON.stringify(imageGallery);
  localStorage.setItem('imageGallery',toLocalStorage);
  counter += 1;
  console.log(counter);
  if (counter === 15) {
    rotateImage.removeEventListener('click', changeThePicturesShown);
    for (var j = 0; j < imageGallery.length; j++) {
      var lineElement = document.createElement('li');
      lineElement.textContent = imageGallery[j].imgName + ' : Displayed/Clicked - ' + imageGallery[j].howmanytimesDisplayed + ' / ' + imageGallery[j].howmanytimesClicked;
      selectedPictureList.appendChild(lineElement);
      prepareData();
      drawChart();
    }
  }
}

var nameOfItemsAsShownOnChart = document.getElementById('canvas');
var itemName = [];
var clicked = [];
function prepareData(){
  for (var i = 0; i < imageGallery.length; i++) {
    itemName[i] = imageGallery[i].imgName;
    clicked[i] = imageGallery[i].howmanytimesClicked;
  }
}

var data = {
  labels: itemName,
  datasets: [
    {
      data: clicked,
      label: 'Clicks per tem',
      backgroundColor: '#8e2382',
    }]
};
function drawChart() {
  var myFinalChart = new Chart(nameOfItemsAsShownOnChart,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero:true
      }
    }]
  });
}

var elMsg = document.getElementById();
elMsg.textContent = 'click on the picture';
var elbody = document.getElementById('body');
elbody.addEventListener(click,false);
