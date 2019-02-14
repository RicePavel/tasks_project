
function HtmlCalculator(id) {
    var container = $('#' + id);
    container.append('<div class="calc" >' +
            '<div class="result">' +
                '<div class="button cancelButton">C</div>' +
                '<div class="outputResult"></div>' +
            '</div>' +
            '<div class="button" data-value="7">7</div>' +
            '<div class="button" data-value="8">8</div>' +
            '<div class="button" data-value="9">9</div>' +
            '<div class="button" data-value="/">/</div>' +
            
            '<div class="button" data-value="4">4</div>' +
            '<div class="button" data-value="5">5</div>' +
            '<div class="button" data-value="6">6</div>' +
            '<div class="button" data-value="*">*</div>' +
            
            '<div class="button" data-value="1">1</div>' +
            '<div class="button" data-value="2">2</div>' +
            '<div class="button" data-value="3">3</div>' +
            '<div class="button" data-value="-">-</div>' +
            
            '<div class="button" data-value="0">0</div>' +
            '<div class="button" data-value=".">.</div>' +
            '<div class="button" data-value="=">=</div>' +
            '<div class="button" data-value="+">+</div>' +
        '</div>');
    
    var calc = new Calculator();
    var resultDiv = $('#' + id + ' .outputResult');
    $('#' + id + ' .button').click(function() {
        var val = $(this).attr('data-value');
        if (val && val !== '=') {
            calc.addSymbol(val);
            resultDiv.text(calc.getExpression());
        } else if (val && val === '=') {
            calc.calculate();
            resultDiv.text(calc.getExpression());
        }
    });
    $('#' + id + ' .cancelButton').click(function() {
        calc.clear();
        resultDiv.text(calc.getExpression());
    });
}

function Calculator() {
    
    var exp = '';
    
    this.addSymbol = function(s) {
        exp += String(s);
    };
    
    this.getExpression = function() {
        return exp;
    };
    
    this.clear = function() {
        exp = '';
    };
    
    this.calculate = function() {
        try {
            exp = eval(exp);
        } catch (err) {
            
        }
    };
    
}