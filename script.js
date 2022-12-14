$(document).ready(function () {
  let gameIsOver = false;

  // click listener
  $(".minigame").find("td:not(.disabled)").click(function () {
    
    if (gameIsOver)
      return window.alert(
        "This game has ended. Refresh the page for a new game!"
      );

    if ($(this).closest(".live").length === 0) {
      return;
    }

    var player = $("#turn").hasClass("green")? "x": "o";

    // get objects
    game = $(this).closest(".game");
    minigame = $(this).closest(".minigame");
    col = $(this).attr("class").split(' ').pop();
    row = $(this).closest("tr").attr("class");

    
    $(".live").removeClass("live");
    if ($(".minigame.col-" + col + ".row-" + row).hasClass("disabled")) {
      $(".game").addClass("live");
    } else {
      $(".minigame.col-" + col + ".row-" + row).addClass("live");
    }

    // update the board
    var div = $("<div>").addClass("marker").addClass(player).addClass('col-' + col).addClass('row-' + row);
    $(this).html(div);
    $(this).addClass("disabled");
    $(this).unbind("click");
    markers = minigame.find(".marker").filter("." + player)
    updateMiniGameStatus(markers, player);

    markers = $(".minigame").filter("." + player)
    updateGameStatus(markers, player);
  })
});

// --- Helper Methods ---

// Updates gameIsOver to true if a player won the game
//  or the game ended in a draw!
// Side effect: displays an alert with a message as to
//  who won the game or that the game ended in a draw!
function updateMiniGameStatus(markers, player) {
  if (checkRows(markers) || checkColumns(markers) || checkDiagonals(markers)) {
    bgcolor = player === "x" ? "green" : "yellow";
    minigame.addClass(bgcolor);
    minigame.addClass("disabled");
    minigame.unbind("click");
    switchPlayer(player, "Player <strong>" + player + "</strong> won a mini tic tac toe game! ");

  } else if ($(".minigame").find("td:not(.disabled)").length === 0) {
    minigame.addClass("blue");
    minigame.addClass("disabled");
    minigame.unbind("click");
    switchPlayer(player, "Mini tic tac toe ended in a draw! Boring! ");
  } else {
    switchPlayer(player, "");
  }
  console.log(player);
};

function updateGameStatus(markers, player) {
  if (checkRows(markers) || checkColumns(markers) || checkDiagonals(markers)) {
    window.alert(player + " won!");
    gameIsOver = true;
  } else if ($(".game").find("td:not(.disabled)").length === 0) {
    window.alert(`It's a draw!`);
    gameIsOver = true;
  }
};

// Switches the player value from 0 to 1 and vice versa
function switchPlayer(player, alert) {
  $("#turn").removeClass((player === "x") ? "green" : "yellow").addClass((player === "x") ? "yellow" : "green");
  $("#turn").html(alert+ ((player === "x") ? "Player <strong>o</strong>" : "Player <strong>x</strong>") + " turn!");
};

// Returns true if all cells in a row
//  are marked with the same marker, otherwise returns false
function checkRows(markers) {
  return (($(markers).filter(".row-1").length === 3) || ($(markers).filter(".row-2").length === 3) || ($(markers).filter(".row-3").length === 3));
};

// Returns true if all cells in a column
//  are marked with the same marker, otherwise returns false
function checkColumns(markers) {
  return (($(markers).filter(".col-1").length === 3) || ($(markers).filter(".col-2").length === 3) || ($(markers).filter(".col-3").length === 3));
};

// Returns true if all cells in the major diagonal
//  are marked with the same marker, otherwise returns false
function checkDiagonals(markers) {
  //No middle marker
  if ($(markers).filter(".col-2").filter(".row-2").length === 0) {
    return false;
  }

  if ($(markers).filter(".col-1").filter(".row-1").length === 1 && $(markers).filter(".col-3").filter(".row-3").length === 1) {
    return true;
  }

  if ($(markers).filter(".col-1").filter(".row-3").length === 1 && $(markers).filter(".col-3").filter(".row-1").length === 1) {
    return true;
  }

  return false;


};