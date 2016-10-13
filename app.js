'use strict';
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

var selectedPictureList = document.getElementById('results');
// var imgName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
// 'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',];
var imageGallery = []; //1. Create empty array

function Images (filepath, imgName) {   //2. Constructor : Needs to be capital letter
  this.imgName = imgName;
  this.filepath = filepath;
  this.howmanytimesClicked = 0;
  this.howmanytimesDisplayed = 0;
  imageGallery.push(this);
}
//Images.prototype.clickedImage
//3. Then create Object instances
var fromLocalStorage = localStorage.getItem('imageGallery');
if (fromLocalStorage){
  imageGallery = JSON.parse(fromLocalStorage);
} else {
  new Images ('img/bag.jpg', 'bag');
  new Images ('img/banana.jpg', 'banana');
  new Images ('img/bathroom.jpg', 'bathroom');
  new Images ('img/boots.jpg', 'boots');
  new Images ('img/breakfast.jpg', 'breakfast');
  new Images ('img/bubblegum.jpg', 'bubblegum');
  new Images ( 'img/chair.jpg', 'chair');
  new Images ('img/cthulhu.jpg', 'cthulhu');
  new Images ('img/dog-duck.jpg', 'dog-duck');
  new Images ('img/dragon.jpg', 'dragon');
  new Images ('img/pen.jpg', 'pen');
  new Images ('img/pet-sweep.jpg', 'pet-sweep');
  new Images ('img/scissors.jpg', 'scissors');
  new Images ('img/shark.jpg', 'shark');
  new Images('img/sweep.jpg','sweep');
  new Images ('img/tauntaun.jpg', 'tauntaun');
  new Images ('img/unicorn.jpg', 'unicorn');
  new Images ('img/usb.jpg', 'usb');
  new Images ('img/water-can.jpg', 'water-can');
  new Images ('img/wine-glass.jpg', 'wine-glass');
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

var rotateImages = document.getElementById('wrapper');
rotateImages.addEventListener('click',changeThePicturesShown);  //this is the clicking of the camera
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
  if (counter === 25) {
    rotateImages.removeEventListener('click', changeThePicturesShown);
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


// 'use strict';
//
// var hours = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm',
// '1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm','8:00pm','9:00pm'];
//
// var round = function(number, precision) {
//   return parseFloat(number.toFixed(precision));
// };
// var randomInteger = function(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// var allStores = [ ];
//
// //The following code creates a prototype,'Store', and an object of that type, the 'Store'.
// //The code then displays the constructor property for the object 'Store'.
// //All objects in JavaScript are descended from Object;
// //all objects inherit methods and properties from 'Object.prototype'.
// function Store(name, min, max, avgCupsperCust, avgTogoperCust) {
//   //
//   this.name = name;
//   this.minCustPerHour = min;
//   this.maxCustPerHour = max;
//   this.averageCupsPerCust = avgCupsperCust;
//   this.averageTogoPoundsPerCust = avgTogoperCust;
//   //
//   this.customerEachHour = [ ];
//   this.totalCustPerDay = 0;
//   this.cupsEachHour = [ ];//new Arry();
//   this.totalCupsPerDay = 0;
//   this.togoPoundsPerHour = [ ];
//   this.totalTogoPoundsPerDay = 0;
//   this.BeansPerHourForMakingCups = [ ];
//   this.totalBeansPerDayForMakingCups = 0;
//   this.beansPerHour = [ ];
//   this.totalBeansPerDay = 0;
//   this.employeesPerHour = [ ];
//   this.employeesPerDay = 0;
//   //The push() method adds new items to the end of an array, and returns the new length.
//   //The pop() method removes the last element from an array:
//   allStores.push(this);
// }
//
// Store.prototype.numberOfCustomersInEachHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.customerEachHour.push(randomInteger(this.minCustPerHour, this.maxCustPerHour));
//   }
// };
//
// Store.prototype.totalDailyCustomers = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.totalCustPerDay += this.customerEachHour[i];
//   }
// };
//
// Store.prototype.cupsConsumedEachHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.cupsEachHour.push(round((this.customerEachHour[i] * this.averageCupsPerCust),1));
//   }
// };
//
// Store.prototype.dailyCups = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.totalCupsPerDay += this.cupsEachHour[i];
//   }
// };
//
// Store.prototype.togoLbsPerHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     // this.togoPoundsPerHour.push(parseFloat((this.customerEachHour[i] * this.averageTogoPoundsPerCust).toFixed(1)));
//     this.togoPoundsPerHour.push(round(this.customerEachHour[i] * this.averageTogoPoundsPerCust, 1));
//   }
// };
//
// Store.prototype.dailyLbs = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.totalTogoPoundsPerDay += round(this.togoPoundsPerHour[i], 1);
//   }
// };
//
// Store.prototype.beansForCupsPerHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.BeansPerHourForMakingCups.push(round((this.cupsEachHour[i] / 16), 1));
//   }
// };
//
// Store.prototype.beansForCupsDay = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.totalBeansPerDayForMakingCups += this.BeansPerHourForMakingCups[i];
//   }
// };
//
// Store.prototype.amountOfBeansRequiredEachHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.beansPerHour.push(round((this.togoPoundsPerHour[i] + this.BeansPerHourForMakingCups[i]), 1));
//   }
// };
//
// Store.prototype.amountOfBeansRequiredInaDay = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.totalBeansPerDay += this.beansPerHour[i];
//   }
// };
//
// Store.prototype.amountOfEmployeesRequiredPerHour = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.employeesPerHour.push(Math.ceil(this.customerEachHour[i] / 30));
//   }
// };
//
// Store.prototype.amountOfEmployeesRequiredInaDay = function() {
//   for (var i = 0; i < hours.length; i++) {
//     this.employeesPerDay += this.employeesPerHour[i];
//   }
// };
//
// Store.prototype.callAllMethods = function() {
//   this.numberOfCustomersInEachHour();
//   this.totalDailyCustomers();
//   this.cupsConsumedEachHour();
//   this.dailyCups();
//   this.togoLbsPerHour();
//   this.dailyLbs();
//   this.beansForCupsPerHour();
//   this.beansForCupsDay();
//   this.amountOfBeansRequiredEachHour();
//   this.amountOfBeansRequiredInaDay();
//   this.amountOfEmployeesRequiredPerHour();
//   this.amountOfEmployeesRequiredInaDay();
// };
//
//
// new Store('Pike Place Market', 14, 35, 1.2, 0.34);
// new Store('Capitol Hill', 12, 28, 3.2, 0.03);
// new Store('Seattle Public Library', 9, 45, 2.6, 0.02);
// new Store('South Lake Union', 5, 18, 1.3, 0.04);
// new Store('Sea-Tac Airport', 28, 44, 1.1, 0.41);
//
//
//
// function makeItAllHappen() {
//   for (var i = 0; i < allStores.length; i++) {
//     allStores[i].callAllMethods();
//   }
// }
// makeItAllHappen();
//
// //Summary
// //1.creates a prototype, and an object of that type, the 'Store'.
// //2.writing methods
// //
//
// //working on the Tables.
//
// var CoffeeShope = {
//   name: 'Campfire Coffee',
//   dailyTotalBeans: 0,
//   hourlyTotalBeans: [ ],
//   totalDailyEmployees: 0,
//   totalHourlyEmployees: [ ]
// };
//
// CoffeeShope.dailyTotalBeansForEachStore = function() {
//   for (var i = 0; i < allStores.length; i++) {
//     this.dailyTotalBeans += allStores[i].totalBeansPerDay;
//   }
// };
//
// CoffeeShope.hourlyBeanRequiredInEachStore = function() {
//   for (var h = 0; h < hours.length; h++) {
//     var counter = 0;
//     for (var s = 0; s < allStores.length; s++) {
//       counter += allStores[s].beansPerHour[h];
//     }
//     this.hourlyTotalBeans.push(round(counter, 1));
//   }
// };
//
// CoffeeShope.amountOfDailyTotalEmployeeInEachStore = function() {
//   for (var i = 0; i < allStores.length; i++) {
//     this.totalDailyEmployees += allStores[i].employeesPerDay;
//   }
// };
//
// CoffeeShope.hourlyEmployeesInEachStore = function() {
//   for (var i = 0; i < hours.length; i++) {
//     var counter = 0;
//     for (var j = 0; j < allStores.length; j++) {
//       counter += allStores[j].employeesPerHour[i];
//     }
//     this.totalHourlyEmployees.push(counter);
//   }
// };
//
// function coffeeShopeAllMethods() {
//   CoffeeShope.dailyTotalBeansForEachStore();
//   CoffeeShope.hourlyBeanRequiredInEachStore();
//   CoffeeShope.amountOfDailyTotalEmployeeInEachStore();
//   CoffeeShope.hourlyEmployeesInEachStore();
// }
// coffeeShopeAllMethods();
//
// //Rendering a table is building the HTML page in javascript and then inserted it into the DOM.
// // Document object Model specifies the browser should create a model of an HTML page and how javascript can access
// // and update the contents of a web page while it is in the browser window.
// var form = document.getElementById('form');
//
// function createParentElement(element) {
//   return document.createElement(element);
// }
//
// function makeAnElementWithText(parent, element, content) {
//   var makeTheElement = document.createElement(element);
//   makeTheElement.textContent = content;
//   parent.appendChild(makeTheElement);
// }
//
// function loopForTableText(parent, element, content) {
//   for (var i = 0; i < hours.length; i++) {
//     makeAnElementWithText(parent, element, content[i]);
//   }
// }
//
// function makeRow(idName, tContent1, tContent2, tContent3) {
//   var tableEl = document.getElementById(idName);
//
//   var rowEl = createParentElement('tr');
//   makeAnElementWithText(rowEl, 'td', tContent1);
//   makeAnElementWithText(rowEl, 'td', tContent2);
//   loopForTableText(rowEl, 'td', tContent3);
//   tableEl.appendChild(rowEl);
// }
//
// makeRow('lbs-head',' ', 'Daily Location Total', hours);//The heading part for the PoundsOfBeans table.
//
// function makeTheStoreRows() {
//   for (var i = 0; i < allStores.length; i++) {
//     makeRow('lbs-body', allStores[i].name,round(allStores[i].totalBeansPerDay,1), allStores[i].beansPerHour);
//   }
// }
//
// makeTheStoreRows();
//
// makeRow('lbs-foot', 'Daily Total', round(CoffeeShope.dailyTotalBeans,1), CoffeeShope.hourlyTotalBeans);//The last row.
//
// makeRow('emp-head', ' ', 'Total', hours);
//
//
// function makeTheEmployeeRows() {
//   for (var i = 0; i < allStores.length; i++) {
//     makeRow('emp-body', allStores[i].name, allStores[i].employeesPerDay, allStores[i].employeesPerHour);
//   }
// }
//
// makeTheEmployeeRows();
//
// makeRow('emp-foot', 'Totals', CoffeeShope.totalDailyEmployees, CoffeeShope.totalHourlyEmployees);
//
// //Adding the submit add Event listner
//
// // function handleButtonClick(event) {
// //   alert('the button has been clicked. now we are having fun');
// //   console.log(event.target);
// // }
//
// function zeroTotals() {
//   CoffeeShope.dailyTotalBeans = 0;
//   CoffeeShope.hourlyTotalBeans = [];
//   CoffeeShope.totalDailyEmployees = 0;
//   CoffeeShope.totalHourlyEmployees = [ ];
// }
//
// function handleNewLbsRow(newStore) {
//   makeRow('lbs-body', newStore.name, round(newStore.totalBeansPerDay, 1), newStore.beansPerHour);
//   zeroTotals();
//   coffeeShopeAllMethods();
//   document.getElementById('lbs-foot').innerHTML = '';
//   makeRow('lbs-foot', 'Daily Total', round(CoffeeShope.dailyTotalBeans,1), CoffeeShope.hourlyTotalBeans);
// }
// function handleNewEmpRow(newStore) {
//   makeRow('emp-body', newStore.name, newStore.employeesPerDay, newStore.employeesPerHour);
//   zeroTotals();
//   coffeeShopeAllMethods();
//   document.getElementById('emp-foot').innerHTML = '';
//   makeRow('emp-foot', 'Totals', CoffeeShope.totalDailyEmployees, CoffeeShope.totalHourlyEmployees);
// }
//
// function handleFormSubmit(event) {
//   event.preventDefault();
//   var name = event.target.name.value;
//   var Min = parseFloat(event.target.minCustPerHour.value);
//   var Max = parseFloat(event.target.maxCustPerHour.value);
//   var avgCupsperCust = parseFloat(event.target.avgCupsperCust.value);
//   var avgTogoperCust = parseFloat(event.target.avgTogoperCust.value);
//   var newStore = new Store(name, Min, Max, avgCupsperCust, avgTogoperCust);
//   newStore.callAllMethods();
//   handleNewLbsRow(newStore);
//   handleNewEmpRow(newStore);
// }
// form.addEventListener('submit', handleFormSubmit);
//
