
function HtmlTicTac(id) {

    var container = $('#' + id);
    container.append('<div class="tictac">' +
            '<div class="tictacField">' +
                '<div class="element" data-row="1" data-column="1"></div>' +
                '<div class="element" data-row="1" data-column="2"></div>' +
                '<div class="element" data-row="1" data-column="3"></div>' +
                '<div class="element" data-row="2" data-column="1"></div>' +
                '<div class="element" data-row="2" data-column="2"></div>' +
                '<div class="element" data-row="2" data-column="3"></div>' +
                '<div class="element" data-row="3" data-column="1"></div>' +
                '<div class="element" data-row="3" data-column="2"></div>' +
                '<div class="element" data-row="3" data-column="3"></div>' +
            '</div>' +
            '<div class="tictacStatistic">' +
                'Выиграл x: 0<br/>' +
                'Выиграл y: 0<br/>' +
                'Ничья: 0<br/>' +
            '</div>' +
            '<div style="clear:both;"></div>' +
            '<div class="status">Ходит: x</div>' +
            '<input type="button" id="resetButton" value="Начать сначала" />' +
        '</div>');

   var winnerX = 0;
   var winner0 = 0;
   var draw = 0;
   var over = false;
   
   var tictac = new Tictac();
   $('#' + id + ' .tictacField .element').click(function() {
        var row = $(this).attr('data-row');
        var column = $(this).attr('data-column');
        tictac.makeMove(row, column);
        if (tictac.gameIsOver() && over === false) {
            over = true;
            if (tictac.getWinner() === '') {
                draw++;
            } else if (tictac.getWinner() === 'x') {
                winnerX++;
            } else if (tictac.getWinner() === '0') {
                winner0++;
            }
            displayTictacStatistic();
        }
        displayTictac(tictac);
   });
   $('#' + id + ' #resetButton').click(function() {
       over = false;
       tictac.reset();
       displayTictac(tictac);
   });
   
   function displayTictacStatistic() {
       $('#' + id + ' .tictacStatistic').html('Выиграл x: ' + winnerX + '<br/>' +
                'Выиграл y: ' + winner0 + '<br/>' +
                'Ничья: ' + draw + '<br/>');
   }
   
   function displayTictac(tictac) {
       var arr = tictac.getFields();
       for (var i = 0; i <= 2; i++) {
          for (var n = 0; n <= 2; n++) {
             var val = arr[i][n];
             var element = $('#' + id + ' .tictacField .element[data-row=' + (i+1) + '][data-column=' + (n+1) + ']');
             if (val === '') {
                 element.removeAttr('data-filled');
             } else {
                 element.attr('data-filled', '1');
             }
             element.text(val);
          }  
       }
       var statusElement = $('#' + id + '  .status');
       if (tictac.gameIsOver()) {
           if (tictac.getWinner() === '') {
               statusElement.text('Ничья');
           } else {
               statusElement.text('Выиграл: ' + tictac.getWinner());
           } 
       } else {
           statusElement.text('Ходит: ' + tictac.getCurrentMove());
       }
   }

}


function Tictac() {
    
    var currentMove = 'x';
    
    var winner = '';
    
    var gameOver = false;
    
    var fields = [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', '']
    ];
    
    function checkResult() {
        for (var i = 0; i <= 2; i++) {
            if (fields[i][0] === fields[i][1] && fields[i][1] === fields[i][2] && fields[i][0] !== '') {
                gameOver = true;
                winner = fields[i][0];
                return;
            }
        }
        for (var i = 0; i <= 2; i++) {
            if (fields[0][i] === fields[1][i] && fields[1][i] === fields[2][i] && fields[0][i] !== '') {
                gameOver = true;
                winner = fields[0][i];
                return;
            }
        }
        if (fields[0][0] === fields[1][1] && fields[1][1] === fields[2][2] && fields[0][0] !== '') {
            gameOver = true;
            winner = fields[0][0];
            return;
        }
        if (fields[0][2] === fields[1][1] && fields[1][1] === fields[2][0] && fields[0][2] !== '') {
            gameOver = true;
            winner = fields[0][2];
            return;
        }
        if (allFilled()) {
            gameOver = true;
        }
    }
    
    function allFilled() {
        for (var i = 0; i <= 2; i++) {
            for (var n = 0; n <= 2; n++) {
                if (fields[i][n] === '') {
                    return false;
                }
            }
        }
        return true;
    }
    
    this.makeMove = function(row, column) {
        if (fields[row - 1][column - 1] === '' && !gameOver) {
            fields[row - 1][column - 1] = currentMove;
            if (currentMove === 'x') {
                currentMove = '0';
            } else {
                currentMove = 'x';
            }
        }
        checkResult();
    };
    
    this.gameIsOver = function() {
        return gameOver;
    };
    
    this.getWinner = function() {
        return winner;
    };
    
    this.reset = function() {
        currentMove = 'x';
        winner = '';
        gameOver = false;
        fields = [
           ['', '', ''], 
           ['', '', ''], 
           ['', '', '']
        ];
    };
    
    this.getFields = function() {
        return fields;
    };
    
    this.getCurrentMove = function() {
        return currentMove;
    }
    
}
