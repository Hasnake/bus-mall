'use strict';
var results = document.getElementById('results');
var clicks = document.getElementById('img container');
var results = document.getElementById('edit');
var refresh = document.getElementById('refreshPage');
var clickTotal = [];

function randomInteger () {
  return (Math.floor(Math.random() * allImages.length));
}
var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
var filepath = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg','img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg',
'img/cthulhu.jpg','img/dog-duck.jpg','img/dragon.jpg','img/pen.jpg','img/pet-sweep.jpg','img/scissors.jpg','img/shark.jpg','img/sweep.jng','img/tauntaun.jpg','img/unicorn.jpg','img/usb.jpg','img/water-can.jpg','img/wine-glass.jpg',];

var allImages = [];

function Image (filepath, imgName) {   //2. Constructor : Needs to be capital letter
  this.imgName = imgName;
  this.filepath = filepath;
  this.howmanytimesVoted = 0;
  this.displayedImage = 0;
  allImages.push(this);
}

function createNewImage() {
  for (var i = 0; i < filepath.length; i++){
    new Image(imgName[i], filepath[i]);
  }
};
createNewImage();

//Rendering a table is building the HTML page in javascript and then inserted it into the DOM.
// Document object Model specifies the browser should create a model of an HTML page and how javascript can access
// and update the contents of a web page while it is in the browser window.

//4. Now Access -- function that displays the pictures on page

function displayImage (){   //4. Now Access -- function that displays the pictures on page
  //don't show any duplicate code!
  var leftPictureIndex = randomInteger();
  var centerPictureIndex = randomInteger();
  var rightPictureIndex = randomInteger();
  while (centerPictureIndex === leftPictureIndex)
  {
    centerPictureIndex = randomInteger();//This is index.

  }
  while (rightPictureIndex === leftPictureIndex || rightPictureIndex === centerPictureIndex)
  {
    rightPictureIndex = randomInteger();//This is index.
  }
  var leftImg = document.getElementById('left');
  leftImg.src = allImages[leftPictureIndex].filepath;
  leftImg.alt = allImages[leftPictureIndex].imgName;


  var centerImg = document.getElementById('center');
  centerImg.src = allImages[centerPictureIndex].filepath;
  centerImg.alt = allImages[centerPictureIndex].imgName;

  var rightImg = document.getElementById('right');
  rightImg.src = allImages[rightPictureIndex].filepath;
  rightImg.alt = allImages[rightPictureIndex].imgName;
}
displayImage();
var changeImages = document.getElementById('wrapper');
changeImages.addEventListener('click',changeThePicturesShown);
reset.addEventListener('click',resetImageGallery);
refresh.addEventListener('click',refreshPage);
function resetImageGallery(){
  localStorage.clear();
}
function refreshPage(){
  location.reload();
}
function changeThePicturesShown(event){
  console.log(event.target.alt);
  if (event.target.id === 'wrapper'){
    alert('Please click on an image.');
  }
  for (var i = 0; i < 15; i++) {
    if(event.target.alt === allImages[i].imgName) {
      allImages[i].howmanytimesVoted += 1;
      //clicktotal ++;
      displayImage();
    }
  }
  var counter = 0;
  if (counter === 15) {
    changeImages.removeEventListener('click', changeThePicturesShown);
    for (var j = 0; j < 15; j++) {
      var listElement = document.createElement('li');
      var canvas = document.getElementById('canvas');
      listElement.textContent = allImages[j].imgName + allImages[j].howmanytimesVoted;
      results.appendChild(listElement);
      canvas.appendChild(results);
      unOrderedListData();
      var imgName = [];
      var clicked = [];
      function unOrderedListData(){
        for (var i = 0; i < 15; i++) {
          imgName[i] = allImages[i].imgName;
          clicked[i] = allImages[i].howmanytimesVoted;
        }
      }
    }
  }
}
