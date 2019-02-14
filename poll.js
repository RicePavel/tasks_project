
function Poll(pollData) {

    var form;

    this.render = function(id) {
        var element_ul = $('<ul></ul>');
        for (var i = 0; i < pollData.length; i++) {
            var questionData = pollData[i];
            var element_li = $('<li>' + questionData.text + '</li>');
            element_ul.append(element_li);
            var element_innerUl = $('<ul></ul>');
            element_ul.append(element_innerUl);
            for (var n = 0; n < questionData.answers.length; n++) {
                element_innerUl.append('<li><input type="radio" name="q_' + i + '" value="' + n + '" />' + questionData.answers[n] + '</li>');
            }
        }
        var element_form = $('<form action="#"></form>');
        form = element_form;
        element_form.append(element_ul);
        element_form.append('<input type="submit" value="Проверить" />');
        $('#' + id).append(element_form);
        element_form.submit(function() {
            var result = checkAnswers();
            displayResult(result);
            return false;
        });
    };

    function displayResult(result) {
        alert('Правильных ответов: ' + result.right + ' (' + result.percentRight + '%) \n' +
            'Неправильных ответов: ' + result.not_right + ' \n' +
            'Без ответа: ' + result.no + ' \n');
    }

    function checkAnswers() {
        var countRightAnswers = 0;
        var countNotRightAnswers = 0;
        var countNoAnswers = 0;
        var formData = form.serializeArray();
        for (var i = 0; i < pollData.length; i++) {
            var questionData = pollData[i];
            var answer = getInputValue(formData, 'q_' + i);
            if (answer === '') {
                countNoAnswers++;
            } else if (Number(answer) === Number(questionData.rightAnswer)) {
                countRightAnswers++;
            } else {
                countNotRightAnswers++;
            }
        }
        var totalCount = pollData.length;
        var percentRight = Math.round((countRightAnswers / pollData.length) * 100);
        return {
            right: countRightAnswers,
            not_right: countNotRightAnswers,
            no: countNoAnswers,
            percentRight: percentRight
        };
    }

    function getInputValue(formData, name) {
        for (var i = 0; i < formData.length; i++) {
            if (formData[i].name === name) {
                return formData[i].value;
            }
        }
        return '';
    }

}