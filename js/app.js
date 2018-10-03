
$(document).ready(function() {
  var numbers = [];
  var userInput;

  for (var i = 0; i < 4; i++) {
    var n = getRandom(numbers);
    numbers[i] = n;
    console.log(numbers[i]);
  }

  $("input").on("keyup", function(e) {
    var correct = true;
    if(e.which == 13) {
      userInput = this.value;
      correct   = checkUserInput(userInput);
      if (correct) {
        // Erase error class input
        var bulls = countBulls(userInput, numbers);
        var cows = countCows(userInput, numbers);
        $("tbody").prepend("<tr><td>" + userInput + "</td> <td>" + cows + "</td> <td>" + bulls + "</td> </tr>");
      } else {
        // Add error class input
        alert("incorrect input")
      }

    }
  });

});

function countBulls (userInput, numbers) {
  var bulls = 0;
  userInput.toString();
  for (var i = 0; i < numbers.length; i++) {
    if (userInput[i] == numbers[i]) { // comparison between a char and an int, that's why I use just ==
      bulls ++
    }
  }
  return bulls;
}

function countCows (userInput, numbers) {
  var cows = 0;
  userInput.toString();
  for (var i = 0; i < userInput.length; i++) {
    for (var j = 0; j < numbers.length; j++) {
      if (userInput[i] == numbers[j]) { // comparison between a char and an int, that's why I use just ==
        if (userInput[i] != numbers[i]) {
          cows++;          
        }
      }
    }
  }
  return cows;
}


function checkUserInput(n) {
  n.toString();
  if (n[0] === '-') {
    return false;
  } else if (n.length === 4) {
    for (var i = 0; i < n.length; i++) {
      for (var j = i+1; j < n.length; j++) {
        if (n[i] === n[j]) {
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}

function random() {
  return Math.floor(Math.random() * 10);
}

function getRandom(numbers) {
  var n;
  while (true) {
    n = random();
    if(checkRand(numbers, n)) {
      break;
    }
  }
  return n;
}

function checkRand(arr, n) {
  for (var i = 0; i < arr.length; i++) {
    if (n === arr[i]) {
      return false;
    }
  }
  return true;
}
