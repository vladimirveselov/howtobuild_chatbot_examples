function calc(expression) {
    expression = expression.replace(/дважды/g, '2 *');
    expression = expression.replace(/трижды/g, '3 *');
    expression = expression.replace(/четырежды/g, '4 *');
    expression = expression.replace(/п€тью/g, '5 *');
    expression = expression.replace(/шестью/g, '6 *');
    expression = expression.replace(/семью/g, '7 *');
    expression = expression.replace(/восемью/g, '8 *');
    expression = expression.replace(/дев€тью/g, '9 *');
    expression = expression.replace(/дес€тью/g, '10 *');
    expression = expression.replace(/один/g, '1');
    expression = expression.replace(/два/g, '2');
    expression = expression.replace(/три/g, '3');
    expression = expression.replace(/четыре/g, '4');
    expression = expression.replace(/п€ть/g, '5');
    expression = expression.replace(/шесть/g, '6');
    expression = expression.replace(/семь/g, '7');
    expression = expression.replace(/восемь/g, '8');
    expression = expression.replace(/дев€ть/g, '9');
    expression = expression.replace(/дес€ть/g, '10');
    expression = expression.replace(/умножить/g, '*');
    expression = expression.replace(/прибавить/g, '+');
    expression = expression.replace(/вычесть/g, '-');
    expression = expression.replace(/плюс/g, '+');
    expression = expression.replace(/минус/g, '-');
    expression = expression.replace(/делить/g, '/');
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
    return "Ќе могу посчитать";
}