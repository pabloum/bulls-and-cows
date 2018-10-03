
$(document).ready(function() {
  var numbers = [];
  var userInput;
  var tries = 0;

  for (var i = 0; i < 4; i++) {
    var n = getRandom(numbers);
    numbers[i] = n;
    console.log(numbers[i]);
  }

  $("input").on("keyup", function(e) {
    if(e.which == 13) {
      var correct = true;
      userInput = this.value;
      $('input').val('');
      correct   = checkUserInput(userInput);
      if (correct) {
        tries++;
        $('input, span').removeClass('error');
        var bulls = countBulls(userInput, numbers);
        var cows = countCows(userInput, numbers);
        $("tbody").prepend("<tr><td>" + userInput + "</td> <td>" + cows + "</td> <td>" + bulls + "</td> </tr>");
        if (bulls === 4 && cows === 0) {
          $('#tries').html(tries);
          $('.win').fadeIn();
        }
      } else {
        $('input, span').addClass('error');
        alert("incorrect input");
      }
    }
  });

  $('#playAgain').on('click',function() {
    $('.win').fadeOut();
    location.reload();
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
