
function MultiplyPoll(pollDataArray) {

    var form;
    var dataObject = new MultiplyPollData(pollDataArray);

    this.start = function(id) {
        form = $('<form action="#"></form>');
        $('#' + id).append(form);
        renderForm(dataObject.getCurrentQuestionData(), dataObject.isLastQuestion());
        form.submit(function () {
            if (dataObject.isLastQuestion()) {
                dataObject.loadAnswer(getAnswerData());
                displayResult(dataObject.getResult());
            } else {
                var answerData = getAnswerData();
                dataObject.loadAnswer(answerData);
                dataObject.next();
                renderForm(dataObject.getCurrentQuestionData(), dataObject.isLastQuestion());
            }
            return false;
        });
    };

    function renderForm(questionData, lastQuestion) {
        form.empty();
        renderQuestion(questionData);
        if (lastQuestion) {
            form.append('<input type="submit" value="Узнать результат"/>');
        } else {
            form.append('<input type="submit" value="Следующий вопрос"/>');
        }
    }

    function displayResult(result) {
        alert('Правильных ответов: ' + result.right + ' (' + result.percentRight + '%) \n' +
            'Неправильных ответов: ' + result.notRight + ' \n' +
            'Без ответа: ' + result.no + ' \n');
    }

    function getAnswerData() {
        var arr = [];
        var formData = form.serializeArray();
        for (var i = 0; i < formData.length; i++) {
            arr.push(formData[i].value);
        }
        return arr;
    }


    function renderQuestion(questionData) {
        var element_ul = $('<ul><li>' + questionData.text + '</li></ul>');
        form.append(element_ul);
        var element_innerUl = $('<ul></ul>');
        element_ul.append(element_innerUl);
        for (var n = 0; n < questionData.answers.length; n++) {
            element_innerUl.append('<li><input type="checkbox" name="q" value="' + n + '" />' + questionData.answers[n] + '</li>');
        }
    }

}

function MultiplyPollData(pollData) {

    var currentQuestionNumber = 0;

    var answersArray = [];

    this.getCurrentQuestionData = function () {
        if (pollData[currentQuestionNumber]) {
            return pollData[currentQuestionNumber];
        } else {
            return {};
        }
    };

    this.isLastQuestion = function() {
        return currentQuestionNumber >= (pollData.length - 1);
    };

    this.loadAnswer = function(answerData) {
        if ((currentQuestionNumber + 1) <= pollData.length) {
            for (var i = 0; i < answerData.length; i++) {
                answerData[i] = Number(answerData[i]);
            }
            answersArray[currentQuestionNumber] = answerData;
        }
    }

    this.next = function() {
        if ((currentQuestionNumber + 1) < pollData.length) {
            currentQuestionNumber++;
        }
    };

    this.getResult = function() {
        var result = {right: 0, notRight: 0, no: 0, percentRight: 0};
        for (var i = 0; i < pollData.length; i++) {
            var answer = answersArray[i] ? answersArray[i] : [];
            var rightAnswer = pollData[i].rightAnswers;
            if (answer.length === 0) {
                result.no++;
            } else if (compareArrays(answer, rightAnswer)) {
                result.right++;
            } else {
                result.notRight++;
            }
        }
        var count = pollData.length;
        if (count !== 0) {
            result.percentRight = Math.round((result.right / count) * 100);
        }
        return result;
    }

    function compareArrays(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) === -1) {
                return false;
            }
        }
        for (var i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) === -1) {
                return false;
            }
        }
        return true;
    }

}