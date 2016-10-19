'use strict';

var clicks = document.getElementById('wrapper');
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

var Image = function(imgName,filepath) {   //2. Constructor : Needs to be capital letter
  this.imgName = imgName;
  this.filepath = filepath;
  this.votes = 0;
  this.displayedImage = 0;
  allImages.push(this);
};

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

function handleImgClick(event) {
  var imgid = event.target.id;
  var imgAlt = event.target.alt;

  if (imgid === 'wrapper') {
    alert('Please click on an image to vote!');
  } else if (clickTotal < 15) {
    for (var i = 0; i < allImages.length; i++) {
      if(imgAlt === allImages[i].imgName) {
        allImages[i].votes += 1;
        clickTotal++;
      }
      if (clickTotal === 15) {
        document.getElementById('edit');
        edit.style.visibility = 'visible';
      } else {
        document.getElementById('edit');
        edit.style.visibility = 'hidden';
        displayImage();
      }
    }
  }
}
function resultsRender(){
  var ulEl = document.createElement('ul');
  ulEl.setAttribute('id', 'resultList');
  document.getElementById('productList').appendChild(ulEl);

  for (var i = 0; i < allImages.length; i++) {
    var liEl = document.createElement('li');
    liEl.setAttribute('class', 'images');
    liEl.textContent = 'You voted for ' + allImages[i].imgName + ' a total of ' + allImages[i].votes + ' times.';
    ulEl.appendChild(liEl);
  }
  var refresh = document.createElement('button');
  refresh.setAttribute('id', 'refresh');
  refresh.textContent = 'Refresh Page';
  document.getElementById('buttons').appendChild(refresh);
  refresh.addEventListener('click', refreshPage);
}

function refreshPage() {
  window.location.reload();
}

clicks.addEventListener('click', handleImgClick);
results.addEventListener('click', resultsRender);
