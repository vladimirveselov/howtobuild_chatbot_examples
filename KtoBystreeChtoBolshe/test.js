function MyClass(name, size, speed, weight) {
  this.name = name;
  this.size = size;
  this.speed = speed;
  this.weight = weight;
}

MyClass.prototype = {
  compareTo: function(compareWith, propertyName) {
    console.log("compare " + this.name + " with " + compareWith.name);
    console.log("compare " + this[propertyName] + " with " + compareWith[propertyName]);
    if (compareWith instanceof MyClass) { 
      if (this[propertyName] > compareWith[propertyName]) {
        return 1;
      }
      if (this[propertyName] < compareWith[propertyName]) {
        return -1;
      }
      return 0;
    }
  }
}

var database = new Object;
database["������"]=new MyClass("������",0.3,20,2);
database["��������"]=new MyClass("��������",0.2,0.07,0.5);
database["������"]=new MyClass("������",0.1,0,0.1);
database["����"]=new MyClass("����",0.6,0,2);

function Chatbot (name) {
  this.name = name;
  this.memory = new Object();
}

Chatbot.prototype = {

  whatIsFasterRegExp : /��� ������� (������|��������|������|����) ��� (������|��������|������|����)/g,
  whatIsLargerRegExp : /��� ������ (������|��������|������|����) ��� (������|��������|������|����)/g,
  whoIsFaster: function (expression) {
    var match = this.whatIsFasterRegExp.exec(expression);
    if (typeof match == "undefined" || match == null) {
       return 0;
    }
    console.log(match.join());
    var class1 = match[1];
    var class2 = match[2];
    if (typeof database[class1] == "undefined" || 
       typeof database[class2] == "undefined") {
      return 0;
    }
    var compareResult = database[class1].compareTo(database[class2],"speed");
    console.log("result: " + compareResult);
    if (compareResult > 0) {
      this.response = class1 + " ������� ��� " + class2;
    } else if (compareResult < 0) {
      this.response = class2 + " ������� ��� " + class1;
    } else {
      this.response = "�������� � " +class1 + " ����� �� ��� � " + class2; 
    }
    return 100;
  },

  whoIsLarger: function (expression) {
    var match = this.whatIsLargerRegExp.exec(expression);
    if (typeof match == "undefined" || match == null) {
       return 0;
    }
    console.log(match.join());
    var class1 = match[1];
    var class2 = match[2];
    if (typeof database[class1] == "undefined" && 
       typeof database[class2] == "undefined") {
      return 0;
    }
    var compareResult = database[class1].compareTo(database[class2],"size");
    console.log("result: " + compareResult);
    if (compareResult > 0) {
      this.response = class1 + " ������ ��� " + class2;
    } else if (compareResult < 0) {
      this.response = class1 + " ������ ��� " + class2;
    } else {
      this.response = "������ � " +class1 + " ����� �� ��� � " + class2; 
    }
    return 100;
  },

  answer: function(question) {
    this.question = question;
    if (this.whoIsFaster(question)>50) {
      return this.response;
    }
    if (this.whoIsLarger(question)>50) {
      return this.response;
    }
    this.response = "�� ����";
    return this.response;
  }

}
