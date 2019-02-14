
function StatisticPoll(pollData) {

    var form;
    
    /*
     [
        [0, 0, 1],
        [1, 2, 0]
     ]
     */
    var statisticArray = [];

    var completed = false;
    
    var id;

    for (var i = 0; i < pollData.length; i++) {
        var answers = [];
        for (var n = 0; n < pollData[i].answers.length; n++) {
            answers.push(0);
        }
        statisticArray.push(answers);
    }

    this.render = function(containerId) {
        id = containerId;
        renderPoll(id);
    };
    
    function renderPoll(id) {
        var element_ul = $('<ol></ol>');
        for (var i = 0; i < pollData.length; i++) {
            var questionData = pollData[i];
            var element_li = $('<li>' + questionData.text + '</li>');
            element_ul.append(element_li);
            var element_innerUl = $('<ol id="question_' + i + '" ></ol>');
            element_ul.append(element_innerUl);
            for (var n = 0; n < questionData.answers.length; n++) {
                element_innerUl.append('<li id="answer_' + n + '" ><input class="radio_input" type="radio" name="q_' + i + '" value="' + n + '" />' + questionData.answers[n] + '<span class="result"></span></li>');
            }
            element_innerUl.append('<li>Свой ответ: <input type="text"/></li>');
        }
        var element_form = $('<form action="#"></form>');
        form = element_form;
        element_form.append(element_ul);
        element_form.append('<input class="submit_input" type="submit" value="Проверить" />');
        $('#' + id).html(element_form);
        element_form.submit(function() {
            if (completed) {
                completed = false;
                renderPoll(id);
            } else {
                completed = true;
                element_form.find('.submit_input').val('пройти еще раз');
                element_form.find('.radio_input').hide();
                setResult();
                displayResult();
            }
            return false;
        });
    }

    function setResult() {
        // подсчет результатов
        for (var questionNumber = 0; questionNumber < pollData.length; questionNumber++) {
            var answer = getAnswer(questionNumber);
            if (answer !== '') {
                answer = Number(answer);
                statisticArray[questionNumber][answer]++;
            }
        }
    }
    
    function displayResult() {
        for (var q = 0; q < statisticArray.length; q++) {
            var sum = 0;
            for (var a = 0; a < statisticArray[q].length; a++) {
                sum += statisticArray[q][a];
            }
            var percent = 0;
            if (sum !== 0) {
                for (var a = 0; a < statisticArray[q].length; a++) {
                    percent = Math.round((statisticArray[q][a] / sum) * 100);
                    if (percent !== 0) {
                        $('#' + id + ' #question_' + q + ' #answer_' + a + ' .result').text('(' + percent + '%)');
                    }
                }
            }
        }
    }

    function getAnswer(questionNumber) {
        var answer = getInputValue('q_' + questionNumber);
        return answer;
    }

    function getInputValue(name) {
        var formData = form.serializeArray();
        for (var i = 0; i < formData.length; i++) {
            if (formData[i].name === name) {
                return formData[i].value;
            }
        }
        return '';
    }

}