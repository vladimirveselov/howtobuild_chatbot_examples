function calc(expression) {
    expression = expression.replace(/������/g, '2 *');
    expression = expression.replace(/������/g, '3 *');
    expression = expression.replace(/���������/g, '4 *');
    expression = expression.replace(/�����/g, '5 *');
    expression = expression.replace(/������/g, '6 *');
    expression = expression.replace(/�����/g, '7 *');
    expression = expression.replace(/�������/g, '8 *');
    expression = expression.replace(/�������/g, '9 *');
    expression = expression.replace(/�������/g, '10 *');
    expression = expression.replace(/����/g, '1');
    expression = expression.replace(/���/g, '2');
    expression = expression.replace(/���/g, '3');
    expression = expression.replace(/������/g, '4');
    expression = expression.replace(/����/g, '5');
    expression = expression.replace(/�����/g, '6');
    expression = expression.replace(/����/g, '7');
    expression = expression.replace(/������/g, '8');
    expression = expression.replace(/������/g, '9');
    expression = expression.replace(/������/g, '10');
    expression = expression.replace(/��������/g, '*');
    expression = expression.replace(/���������/g, '+');
    expression = expression.replace(/�������/g, '-');
    expression = expression.replace(/����/g, '+');
    expression = expression.replace(/�����/g, '-');
    expression = expression.replace(/������/g, '/');
    var equationArray = [];
    var char;
    for (var i=0, x=expression.length; i<x; i++) {
        char = expression.charAt(i);
        switch(char) {
                case '0':
                    equationArray.push(char);
                    continue;
                case '1':
                    equationArray.push(char);
                    continue;
                case '2':
                    equationArray.push(char);
                    continue;
                case '3':
                    equationArray.push(char);
                    continue;
                case '4':
                    equationArray.push(char);
                    continue;
                case '5':
                    equationArray.push(char);
                    continue;
                case '6':
                    equationArray.push(char);
                    continue;
                case '7':
                    equationArray.push(char);
                    continue;
                case '8':
                    equationArray.push(char);
                    continue;
                case '9':
                    equationArray.push(char);
                    continue;
                case '+':
                    equationArray.push(char);
                    continue;
                case '-':
                    equationArray.push(char);
                    continue;
                case '*':
                    equationArray.push(char);
                    continue;
                case '/':
                    equationArray.push(char);
                    continue;
        }
    }
    var mathExpression = equationArray.join("");
    console.log("try to calc - " + mathExpression);
    var result = eval(mathExpression);
    if (typeof result != "undefined") {
       return mathExpression + " = " + result; 
    }
    return "�� ���� ���������";
}