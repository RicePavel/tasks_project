
'use strict';

$(document).ready(function() {

    var a = 1;

    var ggg;
    if (a > 0) {
        ggg = function () {
            console.log('!');
        };
    } else {
        ggg = function () {
            console.log('!!');
        };
    }

    ggg();


    var arr = [1, 2, 3, 4];
    var functionArray = [function (i) {
        console.log(i);
    }, function (i) {
        console.warn(i);
    }];

    each(arr, functionArray);

    function each(arr, functionArray) {
        var arrFunctionNumber = 0;
        for (var arrNumber = 0; arrNumber < arr.length; arrNumber++) {
            var func;
            if (arrFunctionNumber < functionArray.length) {
                func = functionArray[arrFunctionNumber];
            }
            if (func !== undefined) {
                func(arr[arrNumber]);
            }
            if ((arrFunctionNumber + 1) < functionArray.length) {
                arrFunctionNumber++;
            } else {
                arrFunctionNumber = 0;
            }
        }
    }

    function getCounter() {

        var i = 0;

        return function () {
            i++;
            console.log(i);
        }

    }

    console.log('------------');

    var func = getCounter();
    func();
    func();
    func();
    func();

    function setHistoryInput(id) {

        var history = [];

        var currentIndex;

        var func = function () {
            var container = $('#' + id);
            container.find('input').change(function () {
                var val = $(this).val();
                history.push(val);
                currentIndex = history.length - 1;
            });
            container.find('.back').click(function () {
                if (currentIndex !== undefined && currentIndex > 0) {
                    currentIndex--;
                    container.find('input').val(history[currentIndex]);
                }
            });
            container.find('.up').click(function () {
                if (currentIndex !== undefined && currentIndex < (history.length - 1)) {
                    currentIndex++;
                    container.find('input').val(history[currentIndex]);
                }
            });
        }
        func();

    }

    setHistoryInput('textInputContainer1');
    setHistoryInput('textInputContainer2');
    
    var arr = [-1, 0, 4, 5, 2, -6];
    arr = arr.filter(function(number) {
        return number >= 0;
    });
    arr = arr.map(function(number) {
        return Math.sqrt(number);
    });
    console.log(arr);
    
    let [firstName, lastName, ...rest] = "Юлий Цезарь Император Рима".split(" ");
    
    var dataArray = [1, 2, 3, 'четыре', 5, 6];
    let [elem1, elem2, elem3, ...arr2] = dataArray;
    console.log(arr2);
   
    var obj = {name: 'Петр', 'surname': 'Петров', 'age': '20 лет'};
    let {name = 'Аноном', surname = 'Анонимович', age = '? лет'} = obj;
    console.log(name);
    console.log(surname);
    console.log(age);

    for (let value of dataArray) {
        console.log(value);
    }
    
    var str = 'огого ну и ну';
    var n = 0;
    for (let value of str) {
        if (value == 'о') {
            n++;
        }
    }
    console.log('-----');
    console.log(n);

    var set = new Set([1, 2, 3]);
    var sum = 0;
    for (let value of set) {
        sum += value;
    }
    console.log('sum = ' + sum);
    
    var str = '["Коля", "Вася", "Петя"]';
    var arrayFromJson = JSON.parse(str);
    console.log(arrayFromJson[2]);

    var width = localStorage.getItem('width');;
    var height = localStorage.getItem('height');;
    if (width !== null && height !== null) {
        $('#textarea_1').width(width);
        $('#textarea_1').height(height);
    }
    $('#textarea_1').mouseup(function() {
        var width = $(this).width();
        var height = $(this).height();
        localStorage.setItem('width', width);
        localStorage.setItem('height', height);
    });

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function StorageForm(id) {

        var form = $('#' + id);
        load();
        form.find('input').change(keep);
        form.find('textarea').change(keep);

        localStorage.setItem('obj', {name: '1', surname: '2'});
        var obj = localStorage.getItem('obj');

        function keep() {
            var data = form.serializeArray();
            localStorage.setItem('formdata_' + id, JSON.stringify(data));
        }

        function load() {
            var data = JSON.parse(localStorage.getItem('formdata_' + id));
            for (var i = 0; i < data.length; i++) {
                var name = data[i].name;
                var value = data[i].value;
                var element = form.find('[name=' + name + ']');
                if (element.get(0).tagName === 'INPUT' && (element.attr('type') === 'radio' || element.attr('type') === 'checkbox')) {
                    form.find('[name="' + name + '"][value="' + value + '"]').prop('checked', true);
                } else {
                    element.val(value);
                }
            }
        }

    }

    var storageForm = new StorageForm('localStorageForm');

});











