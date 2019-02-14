
$(document).ready(function() {

    var pollData = [
        {
            text: 'JavaScript это тоже самое что и Java?',
            answers: ['Нет.', 'Да.', 'Когда как'],
            rightAnswer: 0
        },{
            text: 'Сколько параментров можно передавать в фукнцию?',
            answers: [
                'Только столько, сколько указано при ее созданиию',
                'Минимум 1.',
                'Сколько угодно.'
            ],
            rightAnswer: 2
        },{
            text: 'Что такое: "use strict"?',
            answers: [
                'Просто строка',
                'Фукцния',
                'Строгий режим'
            ],
            rightAnswer: 2
        }
    ];

    var poll = new Poll(pollData);
    poll.render('pollContainer');

    var secondPollData = [
        {
            text: 'JavaScript это тоже самое что и Java?',
            answers: ['Нет.', 'Да.', 'Когда как'],
            rightAnswers: [0]
        },{
            text: 'Сколько параментров можно передавать в фукнцию?',
            answers: [
                'Только столько, сколько указано при ее созданиию',
                'Минимум 1.',
                'Сколько угодно.'
            ],
            rightAnswers: [2]
        },{
            text: 'Что такое: "use strict"?',
            answers: [
                'Просто строка',
                'Фукцния',
                'Строгий режим'
            ],
            rightAnswers: [2]
        }
    ];
    var secondPoll = new MultiplyPoll(secondPollData);
    secondPoll.start('secondPollContainer');

    var statisticPollData = [
            {
                text: 'Какой язык вы предпочитаете?',
                answers: ["JavaScript", "HTML/CSS", "PHP", "C++", "Русский"],
            },
            {
                text: 'Какой редактор кода используете?',
                answers: ["Notepad++", "Блокнот", "Sublime Text"]
            },
            {
                text: 'Какой у вас опыт?',
                answers: ["6 месяцев", "Около года", "Пара лет", "Пол жизни"]
            }
    ];
    var statisticPoll = new StatisticPoll(statisticPollData);
    statisticPoll.render('statisticPollContainer');

    //var numbersGame = new NumbersGame('numbersGameContainer', 25, 70);
    var numbersGame = new NumbersGame('numbersGameContainer', 25, 70);
    numbersGame.render();
    
    var calendar = new Calendar('calendar');
    calendar.render();

    var sortedTable = new SortedTable('sortedTable');

});