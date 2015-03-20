function Input(text, rule) {
	this.text = text;
	this.rule = rule;
}
Input.prototype = {
	toString : function() {
		return this.text;
	}
}

function Rule(inputs, cinputs, context, responses, action, dialogueId) {
	this.inputs = [];
	for (var i = 0, x = inputs.length; i < x; i++) {
		this.inputs.push(new Input(inputs[i], this));
	}
	this.cinputs = [];
	if (cinputs != null) {
		for (var j = 0, y = cinputs.length; j < y; j++) {
			this.cinputs.push(new Input(cinputs[j], this));
		}
	}
	this.context = context;
	this.responses = responses;
	this.action = action;
	this.dialogueId = dialogueId;
}

Rule.prototype = {
	execute : function() {
		if (typeof this.responses != "undefined" && this.responses != null) {
			var i = Math.floor(Math.random() * this.responses.length);
			chatbot.response = this.responses[i];
		}
		if (typeof this.action != "undefined" && this.action != null) {
			this.action();
		}
		if (typeof this.context != "undefined" && this.context != null) {
			chatbot.context = this.context;
		}
	}
}

function Matcher() {

}

Matcher.prototype = {
	addInputs : function(inputs) {
		if (typeof inputs != "undefined") {
			for (var i = 0, x = inputs.length; i < x; i++) {
				var input = inputs[i].text.toLowerCase();
				input = input.replace(/\!/g, ' !');
				input = input.replace(/\?/g, ' ?');
				input = input.replace(/\,/g, ' ,');
				input = input.replace(/\./g, ' .');
				input = input.replace(/\(/g, ' (');
				input = input.replace(/\)/g, ' )');
				input = input.replace(/\*/g, ' *');
				input = input.replace(/\:/g, ' :');
				input = input.replace(/\;/g, ' ;');
				input = input.replace(/\-/g, ' -');
				var words = input.split(" ");
				console.log("adding words: " + words.join());
				for (var j = 0, y = words.length; j < y; j++) {
					var token = words[j];
					this[token] = this[token] || [];
					if (this[token].indexOf(inputs[i]) < 0) {
						this[token].push(inputs[i]);
					}
				}
			}
		}
	},

	findAnswer : function(question) {
		var q = question;
		q = q.replace(/\!/g, ' !');
		q = q.replace(/\?/g, ' ?');
		var words = question.toLowerCase().split(" ");
		console.log("tokens: " + words.join())
		var selectedInputs = [];
		for (var i = 0, x = words.length; i < x; i++) {
			if (typeof this[words[i]] != "undefined") {
				console.log("found token: " + words[i])
				var foundInputs = this[words[i]];
				for (var j = 0, y = foundInputs.length; j < y; j++) {
					foundInputs[j].score = foundInputs[j].score || 0;
					foundInputs[j].score += 1.0 / y;
					if (selectedInputs.indexOf(foundInputs[j]) < 0) {
						selectedInputs.push(foundInputs[j]);
					}
				}
			}
		}
		console.log("selected inputs: " + selectedInputs.join())
		var bestInput = [];
		var highestScore = 0;
		for (var k = 0, z = selectedInputs.length; k < z; k++) {
			if (selectedInputs[k].score > highestScore) {
				highestScore = selectedInputs[k].score;
				bestInput = [];
				bestInput.push(selectedInputs[k]);
			}
			if (selectedInputs[k].score == highestScore) {
				bestInput.push(selectedInputs[k]);
			}
		}
		for (var k = 0, z = selectedInputs.length; k < z; k++) {
			delete selectedInputs[k].score;
		}
		if (bestInput.length > 0) {
			var n = Math.floor(Math.random() * bestInput.length);
			return bestInput[n];
		}
		// check default
		if (typeof this["default"] != "undefined" && this["default"] != null) {
			var n = Math.floor(Math.random() * this["default"].length);
			return this["default"][n];
		}
		return null;
	}
}

function Chatbot() {
	this.memory = new Object();
	this.context = "";
	this.dialogueId = "";
	this.mainMatcher = new Matcher();
	this.contextMatchers = new Object();
	this.dialogueMatchers = new Object();
	this.question="";
}

Chatbot.prototype = {
	addRule : function(rule) {
		if (typeof rule.dialogueId != "undefined"  && rule.dialogueId != null) {
			this.dialogueMatchers[rule.dialogueId] = this.dialogueMatchers[rule.dialogueId]
					|| (new Matcher());
			console.log("adding dialogue: " + rule.dialogueId);
			console.log("adding dialogue: " + rule.inputs.join());
			this.dialogueMatchers[rule.dialogueId].addInputs(rule.inputs);
			return;
		}
		if (typeof rule.inputs != "undefined" && rule.inputs != null) {
			console.log("adding generic matcher: " + rule.inputs.join());
			this.mainMatcher.addInputs(rule.inputs);
		}
		if (typeof rule.context != "undefined" && rule.context != null 
				&& typeof rule.cinputs != "undefined" && rule.cinputs !=null) {
			this.contextMatchers[rule.context] = this.contextMatchers[rule.context]
					|| (new Matcher());
			console.log("adding context matcher: " + rule.context);			
			console.log("adding context matcher: " + rule.cinputs.join());
			this.contextMatchers[rule.context].addInputs(rule.cinputs);
		}
	},

	answer : function(question) {
		this.question=question;
		var foundInput = null;
		if (this.dialogueId.length > 0) {
			if (typeof this.dialogueMatchers[this.dialogueId] !== "undefined") {
				console.log("dialogue mode");
				foundInput = this.dialogueMatchers[this.dialogueId].findAnswer(question);
			}
			this.dialogueId = "";
		}
		if (foundInput == null) {
			if (this.context.length > 0) {
				if (typeof this.contextMatchers[this.context] !== "undefined") {
					console.log("context mode");
					foundInput = this.contextMatchers[this.context].findAnswer(question);
				}
				this.context = "";
			}
		}
		if (foundInput == null) {
			console.log("generic mode");
			foundInput = this.mainMatcher.findAnswer(question);
		}
		if (foundInput != null) {
			console.log("execute: " + foundInput);
			foundInput.rule.execute();
		}
	}
}

var chatbot = new Chatbot();

function ask(event,text) {
	if (event.keyCode == 13) {
		chatbot.answer(text.value);
		var divv = document.getElementById('answer');
		divv.innerHTML = chatbot.response;
	}
}

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
