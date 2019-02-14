
function Calendar(id) {

    var year;

    var month;

    var monthsNames = [
        'Январь','Февраль','Март','Апрель','Май','Июль','Июнь','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
    ];

    this.render = function() {
        var container = $('#' + id);
        container.html('<div class="header"><div class="letter"></div><div class="arrows"><span class="back"> < </span><span class="forward"> > </span></div></div>');
        container.append('<div style="clear: both;"></div>');
        container.append('<div class="week"><div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div></div>');
        container.append('<div style="clear: both;"></div>');
        container.append('<div class="cellContainer"></div>');

        var date = new Date();
        year = date.getFullYear();
        month = date.getMonth();

        $('#' + id).find('.back').click(function() {
            if (month !== 0) {
                month--;
            } else {
                month = 11;
                year--;
            }
            renderMonth()
        });
        $('#' + id).find('.forward').click(function() {
            if (month !== 11) {
                month++;
            } else {
                month = 0;
                year++;
            }
            renderMonth()
        });

        renderMonth();
    };
    
    function renderMonth() {
        var nowDate = new Date();

        var days = getDaysInMonth(year, month);
        $('#' + id + ' .cellContainer').empty();
        for (var i = 1; i <= days; i++) {
            var cellElement = $('<div class="calendarCell">' + i + '</div>');
            if (nowDate.getFullYear() == year && nowDate.getMonth() == month && nowDate.getDate() == i) {
                cellElement.addClass('currentDay');
            }
            $('#' + id + ' .cellContainer').append(cellElement);
        }
        $('#' + id).append('<div style="clear: both;"></div>');
        var dayOfWeek = new Date(year, month, 1).getDay();
        if (dayOfWeek === 0) {
            dayOfWeek = 7;
        }
        var margin = 30;
        $('.calendarCell').eq(0).css('margin-left', margin * (dayOfWeek - 1));
        $('#' + id + ' .letter').text(year + ' ' + monthsNames[month]);
    }

    function getDaysInMonth(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    }



    
}


