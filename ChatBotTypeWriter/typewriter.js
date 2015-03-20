var currentQuestion;
var typingCharacter;
var inputElement;
var answerElement;
var logElement;
var answers;
var stopNow = false;

function doStop() {
	stopNow = true;
}

function typeQAStart()  {
	stopNow = false;
	currentQuestion = 0;
	inputElement.value = "";
	answerElement.innerHTML = "";
	answers = [];
	typeQA();
}

function typeQA() {
	if (currentQuestion >= questions.length) {
		return;
	}
	typeQuestionStart();
}
	
function typeQuestionStart() {
	typingCharacter = 0;
	inputElement.value = "";
	typeQuestion();
}
function typeQuestion() {
	if (stopNow) {
		return;
	}
	console.log("q char:" + typingCharacter);
	console.log("length:" + questions[currentQuestion].length);
	if (typingCharacter >= questions[currentQuestion].length) {
		typeQuestionFinish();
		return;
	}
	inputElement.value += questions[currentQuestion].charAt(typingCharacter);
	typingCharacter++;
	setTimeout(typeQuestion, 150);
}
	
function typeQuestionFinish() {
	if (stopNow) {
		return;
	}
	chatbot.answer(questions[currentQuestion]);
	var answer = chatbot.response;
	answers.push(answer);
	setTimeout(typeAnswerStart, 2000);
}
	
function typeAnswerStart() {
	typingCharacter = 0;
	answerElement.innerHTML = "";
	typeAnswer();
}
	
function typeAnswer() {
	if (stopNow) {
		return;
	}
	console.log("char:" + typingCharacter);
	if (typingCharacter >= answers[currentQuestion].length) {
		typeAnswerFinish();
		return;
	}
	answerElement.innerHTML += answers[currentQuestion].charAt(typingCharacter);
	typingCharacter++;
	setTimeout(typeAnswer, 150);
}
function typeAnswerFinish() {
	if (stopNow) {
		return;
	}
	var toLog = "Шаг: " + (currentQuestion+1) + "<br>";
	toLog += "Вопрос: " + questions[currentQuestion] + "<br>";
	toLog += "Ответ: " + answers[currentQuestion] + "<br>";
	if (typeof chatbot.context != "undefined" && chatbot.context != null &&
	   chatbot.context.length > 0) {
		toLog += "Контекст: " + chatbot.context + "<br>";
	}
	if (typeof chatbot.dialogueId != "undefined") {
		toLog += "Dialogue ID: " + chatbot.dialogueId + "<br>";
	}
	for (var memoryProp in chatbot.memory) {
		toLog += " memory." + memoryProp + ": " + chatbot.memory[memoryProp] + "<br>";
	}
	logElement.innerHTML = toLog + "<br>" + logElement.innerHTML;
	typingQuestion = false;
	currentQuestion++;
	setTimeout(typeQA,2000);
}

