$(document).ready(function() {

  var studyAmount = 25;
  var breakAmount = 5;
  var seconds;
  var minutes;
  var audio = new Audio("http://e.ggtimer.com/styles/beepbeep.mp3");
  var studySeconds;
  var studyMinutes;
  var breakSeconds;
  var breakMinutes;
  var checkTime;
  var barCol = "green";
  var bar;
  var pauseStatus = false;
  var pauseSeconds;
  var pauseMinutes;
  var isRunning = false;

  barFunc(); /*Starts function that creates progress bar*/

  function startTimer() { /*Function that starts the countdown for study time*/

    if (pauseStatus === true) { /*Checks if timer is currently paused and alters minutes and seconds to their pre-pause values*/
      minutes = pauseMinutes;
      seconds = pauseSeconds;
      pauseStatus = false;
      if (pauseMinutes < 1) {
        bar.animate(1, {
          duration: pauseSeconds * 1000,
        });
      } else {
        bar.animate(1, {
          duration: pauseMinutes * 60000,
        });
      }
    } else {
      minutes = studyAmount - 1;
      seconds = 59;
      bar.animate(1, {
        duration: studyAmount * 60000,
      });
      bar.setText(minutes + ":" + seconds);
    }

    checkTime = setInterval(function() { /*Checks vals of mins and seconds every 900ms. Executes code if both less than 1 */
      if (minutes < 1 && seconds < 1) {
        audio.play();
        clearInterval(studySeconds);
        clearInterval(studyMinutes);
        clearInterval(checkTime);
        setTimeout(function() {
          barCol = "red";
          bar.destroy();
          barFunc();
          $("h1").text("Break Time");
          $("body").css("color", "#EF5B30");
          startBreak();
        }, 3000);
      }
    }, 900);

    studySeconds = setInterval(function() { /*Decreases secs val by 1 every 1000ms*/
      if (seconds <= 0) {
        seconds = 59;
      } else {
        seconds--;
      }
      seconds = ('0' + seconds).slice(-2);
      bar.setText(minutes + ":" + seconds);
    }, 1000);

    studyMinutes = setInterval(function() { /*Decreases min val by 1 every 60000ms*/
      minutes--;
      bar.setText(minutes + ":" + seconds);
    }, 60000);

  };

  function startBreak() { /*Break function that executes when study function ends*/

    if (pauseStatus === true) { /*Checks if timer is currently paused and alters minutes and seconds to their pre-pause values*/
      minutes = pauseMinutes;
      seconds = pauseSeconds;
      pauseStatus = false;
      if (pauseMinutes < 1) {
        bar.animate(1, {
          duration: pauseSeconds * 1000,
        });
      } else {
        bar.animate(1, {
          duration: pauseMinutes * 60000,
        });
      }
    } else {
      minutes = breakAmount - 1;
      seconds = 59;
      bar.animate(1, {
        duration: breakAmount * 60000,
      });
      bar.setText(minutes + ":" + seconds);
    }

    checkTime = setInterval(function() { /*Checks vals of mins and seconds every 900ms. Executes code if both less than 1 */
      if (minutes < 1 && seconds < 1) {
        audio.play();
        clearInterval(breakSeconds);
        clearInterval(breakMinutes);
        clearInterval(checkTime);
        setTimeout(function() {
          barCol = "green";
          bar.destroy();
          barFunc();
          $("body").css("color", "#DDCA7E");
          startTimer();
        }, 3000);
      }
    }, 900);

    breakSeconds = setInterval(function() { /*Decreases secs val by 1 ever 1000ms*/
      if (seconds <= 0) {
        seconds = 59;
      } else {
        seconds--;
      }
      seconds = ('0' + seconds).slice(-2);
      bar.setText(minutes + ":" + seconds);
    }, 1000);

    breakMinutes = setInterval(function() { /*Decreases min val by 1 every 60000ms*/
      minutes--;
      bar.setText(minutes + ":" + seconds);
    }, 60000);
  }

  $("#btnstart").click(function() { /*Listens for click on start button and executes timer function if clicked*/
    startTimer();
    isRunning = true;
  });

  $("#btnstop").click(function() { /*Listens for click on stop button. Clears intervals and stops progBar if clicked*/
    pauseStatus = true;
    isRunning = true;
    clearInterval(studySeconds);
    clearInterval(studyMinutes);
    clearInterval(breakSeconds);
    clearInterval(breakMinutes);
    clearInterval(checkTime);
    pauseSeconds = seconds;
    pauseMinutes = minutes;
    bar.stop();
  });

  $("#btnreset").click(function() { /*Resets page and all values to original state if clicked*/
    barCol = "green";
    pauseStatus = false;
    isRunning = false;
    studyAmount = 25;
    breakAmount = 5;
    $("h1").text("Study Time");
    $("body").css("color", "#DDCA7E");
    clearInterval(studySeconds);
    clearInterval(studyMinutes);
    clearInterval(breakSeconds);
    clearInterval(breakMinutes);
    clearInterval(checkTime);
    $("span#studyTime").text(25);
    $("span#breakTime").text(5);
    bar.destroy();
    barFunc();
  });

  $("#decreaseStudyTime").click(function() { /*Decreases study time and values if clicked*/
    if (isRunning == false) {
      if (studyAmount > 1) {
        studyAmount--;
        bar.setText(studyAmount + ":00");
        $("#studyTime").text(studyAmount);
      }
    }
  });

  $("#increaseStudyTime").click(function() { /*Increases study time and values if clicked*/
    if (isRunning == false) {
      studyAmount++;
      bar.setText(studyAmount + ":00");
      $("#studyTime").text(studyAmount);
    }
  });

  $("#decreaseBreakTime").click(function() { /*Decreases break time and values if clicked*/
    if (isRunning == false) {
      if (breakAmount > 1) {
        breakAmount--;
        $("#breakTime").text(breakAmount);
      }
    }
  });

  $("#increaseBreakTime").click(function() { /*Increases break time and values if clicked*/
    if (isRunning == false) {
      breakAmount++;
      $("#breakTime").text(breakAmount);
    }
  });

  function barFunc() { /*Function that executes progress bar plugin*/
    if (barCol === "green") {
      bar = new ProgressBar.Circle('div#proBar', {
        strokeWidth: 3,
        easing: 'linear',
        color: '#DDCA7E',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null,
        text: {
          value: studyAmount + ":00",
          className: 'timelabel',
        }
      });
    } else {
      bar = new ProgressBar.Circle('div#proBar', {
        strokeWidth: 3,
        easing: 'linear',
        color: '#EF5B30',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: null,
        text: {
          value: breakAmount,
          className: 'timelabel'
        }
      });
    }
  }
});
