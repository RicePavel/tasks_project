
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
            /*
            container.find('.back').click(function () {
                if (currentIndex !== undefined && currentIndex <= (history.length - 1)) {
                    currentIndex--;
                    container.find('input').val(history[currentIndex]);
                }
            });
            container.find('.up').click(function () {
                if (currentIndex !== undefined && currentIndex > 0) {
                    currentIndex++;
                    container.find('input').val(history[currentIndex]);
                }
            });
            */
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

});











