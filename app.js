'use strict';

var allImages = [];

var clicks = document.getElementById('wrapper');

var results = document.getElementById('edit');

var refresh = document.getElementById('refreshPage');

var clickTotal = [];

var itemLabels = [];

var voteLabels = [];

var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
var imgPath = ['img/bag.jpg','img/banana.jpg','img/bathroom.jpg','img/boots.jpg','img/breakfast.jpg','img/bubblegum.jpg','img/chair.jpg',
'img/cthulhu.jpg','img/dog-duck.jpg','img/dragon.jpg','img/pen.jpg','img/pet-sweep.jpg','img/scissors.jpg','img/shark.jpg','img/sweep.jng','img/tauntaun.jpg','img/unicorn.jpg','img/usb.jpg','img/water-can.jpg','img/wine-glass.jpg',];

var Product = function(imgName, imgPath) {
  this.imgName = imgName;
  this.imgPath = imgPath;
  this.votes = 0;
  this.displayed = 0; //need to incorporate this into results list
  allImages.push(this);
};

function createNewProduct() {
  for (var i = 0; i < imgPath.length; i++){
    new Product(imgName[i], imgPath[i]);
  }
};
createNewProduct();

function randomIndex() {
  return Math.floor(Math.random() * allImages.length);
}

function renderImg() {
  var index1 = randomIndex();
  var index2 = randomIndex();
  var index3 = randomIndex();

  while (index2 === index1) {
    index2 = randomIndex();
  }

  while (index3 === index2 || index3 === index1) {
    index3 = randomIndex();
  }

  var leftImg = document.getElementById('left');
  leftImg.src = allImages[index1].imgPath;
  leftImg.alt = allImages[index1].imgName;

  var centerImg = document.getElementById('center');
  centerImg.src = allImages[index2].imgPath;
  centerImg.alt = allImages[index2].imgName;

  var rightImg = document.getElementById('right');
  rightImg.src = allImages[index3].imgPath;
  rightImg.alt = allImages[index3].imgName;
}

renderImg();

function handleImgClick(event) {
  var imgId = event.target.id;
  var imgAlt = event.target.alt;

  if (imgId === 'wrapper') {
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
        renderImg();
      }
    }
  }
}


// update the name & vote data
function updateChart() {
  for (var i = 0; i < allImages.length; i++) {
    itemLabels.push(allImages[i].imgName);
    voteLabels.push(allImages[i].votes);
  }
}

// make the Chart
function makeChart() {
  updateChart();
  var ctx = document.getElementById('myChart');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemLabels,
      datasets: [{
        label: 'BusMall Survey Results',
        fillColor: 'red',
        data: voteLabels,
        backgroundColor:'#00BFD0',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
      }
    }
  });
  // create refresh button
  var refresh = document.createElement('button');
  refresh.setAttribute('id', 'refreshPage');
  refresh.textContent = 'Refresh Page';
  document.getElementById('buttons').appendChild(refresh);
  refresh.addEventListener('click', refreshPage);
}

function refreshPage() {
  window.location.reload();
}

clicks.addEventListener('click', handleImgClick);
results.addEventListener('click', makeChart);
refresh.addEventListener('click', refreshPage);
