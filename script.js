// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // grouping save buttons together
  var saveButtons = document.querySelectorAll(".saveBtn");
  // listener for save buttons
  saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var timeBlock = this.closest(".time-block");
      var timeBlockId = timeBlock.id;
      var userInput = timeBlock.querySelector(".description").value;

      // Save to local storage
      localStorage.setItem(timeBlockId, userInput);

      alert("Appointment added to local storage!");
    });
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // current hour
  var currentHour = dayjs().hour();

  // apply to each block
  var timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(function (timeBlock) {
    var timeBlockHour = parseInt(timeBlock.id.split("-")[1]);

    // apply past, present, future
    if (currentHour > timeBlockHour) {
      timeBlock.classList.add("past");
    } else if (currentHour === timeBlockHour) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  var timeBlocks = document.querySelectorAll(".time-block");
  timeBlocks.forEach(function (timeBlock) {
    var timeBlockId = timeBlock.id;
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput !== null) {
      timeBlock.querySelector(".description").value = userInput;
    }
  });

  //
  // TODO: Add code to display the current date in the header of the page.

  //current date
  var currentDate = new Date();
  var currentDateElement = document.getElementById("currentDay");
  var format = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  var formattedDate = currentDate.toLocaleDateString('en-US', format);

  currentDateElement.textContent = "Today's Date: " + formattedDate;
});
