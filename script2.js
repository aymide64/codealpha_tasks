var userdateInput = document.getElementById("date");
var mybtn = document.getElementById("button");

var newAge;
var newAge2;
var userDate;

// current time
var tiMe = new Date();
var wantedYear = tiMe.getFullYear();
var wantedMonth = tiMe.getMonth();
var wantedDay = tiMe.getDay();

// To show hidden page in html
function hidSho() {
  var shownContent = document.getElementById("shownContent");
  var hiddenContent = document.getElementById("hiddenContent");
  return { shownContent, hiddenContent };
}

// age display in html
function showAge(ageText) {
  const { shownContent, hiddenContent } = hidSho();
  const ageIs = hiddenContent.querySelector('#ageIs');

  shownContent.classList.add('hiddenContent');
  hiddenContent.classList.remove('hiddenContent');
  ageIs.textContent = ageText;

  console.log("Age Display:", ageText);
}

// full months list
const monthsValue = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};


function monthagRule(userDate) {
  const { shownContent, hiddenContent } = hidSho();
  const ageIs2 = hiddenContent.querySelector('#ageIs2');

  // recalling current date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-12

    //user's date input recall
  const user = new Date(userDate);
  const userYear = user.getFullYear();
  const userMonth = user.getMonth() + 1; // 1-12

  let monthDifference;

  if (userYear === currentYear) {

    monthDifference = currentMonth - userMonth;
  } else if (userYear < currentYear) {

    monthDifference = (currentYear - userYear) * 12 + (currentMonth - userMonth);
  } else {

    monthDifference = 0;
  }

  ageIs2.textContent = `${monthDifference}`;
  console.log("Total Month Difference:", monthDifference);
}


function getFullAgeDetail(userDate) {
  const start = new Date(userDate);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();


  const hasBirthdayPassed =
    today.getMonth() > start.getMonth() ||
    (today.getMonth() === start.getMonth() && today.getDate() >= start.getDate());

  if (!hasBirthdayPassed) {
    years--;
  }

  return { years };
}




const monthsdays = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};


function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


function getDaysInMonth(monthName, year) {
  if (monthName === "February" && isLeapYear(year)) return 29;
  return monthsdays[monthName];
}


function calculateDaysLived(userDate) {
  const start = new Date(userDate);
  const today = new Date();

  if (isNaN(start)) {
    console.error("Invalid date input");
    return;
  }

  const startYear = start.getFullYear();
  const startMonthName = start.toLocaleString("en", { month: "long" });
  const startDay = start.getDate();
  const currentYear = today.getFullYear();
  const currentMonthName = today.toLocaleString("en", { month: "long" });
  const currentDay = today.getDate();

  // ✅ QUICK FIX: if birth year is the same as current year
  if (startYear === currentYear) {
    const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const msPerDay = 24 * 60 * 60 * 1000;

    // 🧩 Prevent negative results if user enters a future date
    if (utcStart > utcToday) return 0;

    // 🧩 Add +1 to include the birth day itself
    const diffDays = Math.floor((utcToday - utcStart) / msPerDay) + 1;
    return diffDays;
  }


  let totalDays = 0;


  const birthMonthDays = getDaysInMonth(startMonthName, startYear);
  totalDays += birthMonthDays - startDay + 1;


  const monthNames = Object.keys(monthsdays);
  let startMonthIndex = monthNames.indexOf(startMonthName);
  for (let i = startMonthIndex + 1; i < 12; i++) {
    totalDays += getDaysInMonth(monthNames[i], startYear);
  }


  for (let year = startYear + 1; year < currentYear; year++) {
    totalDays += isLeapYear(year) ? 366 : 365;
  }


  const currentMonthIndex = monthNames.indexOf(currentMonthName);
  for (let i = 0; i < currentMonthIndex; i++) {
    totalDays += getDaysInMonth(monthNames[i], currentYear);
  }


  totalDays += currentDay;

  return totalDays;
}



function userAgedate(userDate) {
  const { years } = getFullAgeDetail(userDate); // only years now
  const daysLived = calculateDaysLived(userDate);


  showAge(`${years}`);


  monthagRule(userDate);


  const daysElement = document.getElementById("daysLived");
  if (daysElement) {
    daysElement.textContent = daysLived.toLocaleString();
  }

  console.log("Total Days Lived:", daysLived);
}


function userInput(event) {
  event.preventDefault();
  userDate = userdateInput.value;
  userAgedate(userDate);
}

mybtn.addEventListener("click", userInput);
