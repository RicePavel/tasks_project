
function NumbersGame(id, countNumbers, countSeconds) {

    var currentTime = (countSeconds > 0 ? countSeconds : 1);

    var currentNumber;

    var playNow = false;

    // результат игры. 1 или 0
    var gameResult;

    this.render = function() {
        var container = $('#' + id);
        var startInput = $('<input type="submit" class="startInput" value="Начать" />');
        container.append(startInput);
        container.append('<p class="startDescription">Начиная с "1" нажимайте на числа до тех пор, пока не дойдете до последнего</p>');
        startInput.click(function() {
            start();
        });
    };

    function start() {
        playNow = true;
        currentTime = (countSeconds > 0 ? countSeconds : 1);
        currentNumber = 0;
        gameResult = undefined;
        
        var container = $('#' + id);
        container.empty();
        /*
        $('#' + id + ' .startInput').hide();
        $('#' + id + ' .startDescription').hide();
        */

        container.append('<p class="topLetter">Времени осталось: <span class="countSeconds"></span></p>');
        var field = $('<div class="field"></div>');
        container.append(field);
        for (var i = 1; i <= countNumbers; i++) {
            var cell = $('<div class="cell notFilled"></div>');
            field.append(cell);
        }
        var restartInput = $('<input type="submit" class="restartInput" value="Начать сначала" />');
        container.append(restartInput);
        for (var n = 1; n <= countNumbers; n++) {
            var cellCount = container.find('.cell.notFilled').length;
            var index = randomInteger(1, cellCount);
            var cell = container.find('.cell.notFilled').eq(index - 1);
            cell.removeClass('notFilled');
            cell.addClass('filled');
            cell.text(n);
            cell.attr('data-number', n);
            var fontSize = randomInteger(12, 25);
            cell.css('font-size', fontSize + 'pt');
            cell.css('color', getRendomColor());
        }
        var timerId = setInterval(function() {
            currentTime--;
            if (currentTime === 0) {
                playNow = false;
                gameResult = 0;
                displayLose();
                clearInterval(timerId);
            } else {
                displayTime();
            }
        }, 1000);
        displayTime();
        $('.cell').click(function() {
            var number = $(this).attr('data-number');
            if (playNow && number !== undefined) {
                number = Number(number);
                if (number === (currentNumber + 1)) {
                    $(this).addClass('checked');
                    currentNumber++;
                    if (currentNumber === countNumbers) {
                        playNow = false;
                        gameResult = 1;
                        displayWin();
                        clearInterval(timerId);
                    }
                }
            }
        });
        restartInput.click(function() {
            clearInterval(timerId);
            start();
        });
    }

    function displayWin() {
        $('#' + id).find('.topLetter').html('Вы победили!');
    }
    
    function displayLose() {
        $('#' + id).find('.topLetter').html('Вы проиграли!');
    }

    function displayTime() {
        var container = $('#' + id);
        container.find('.countSeconds').text(currentTime);
    }

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    function getRendomColor() {
        var color = Math.floor(Math.random() * 16777216).toString(16);
        return '#000000'.slice(0, -color.length) + color;
    }


}