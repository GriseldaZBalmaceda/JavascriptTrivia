var quizModelView = function () {
    self = this;
    self.index = ko.observable(0);
    self.duringQuiz = ko.observable(true)
    self.final = ko.observable(false)
    self.previous = ko.observable(false)
    self.next = ko.observable(true)
    self.submitButton = ko.observable(false)
    self.incorrectAnswers = ko.observable(0)
    self.finalScore = ko.observable(10)
    self.finalMessage = ko.observable('Testing')
    self.quiz = [
        new quizViewModel("In JavaScript you cannot use what reserved words as variables, labels, or function names?", ["Reserved Words", "Strings", "Data Types", "Number"], "Reserved Words"),
        new quizViewModel("Which of the following is used for declaring variables in a function, but is block scoped?", ["Null", "var", "const", "let"], "let"),
        new quizViewModel("A variable declared outside a JavaScript function, becomes what?", ["Local", "Global", "Invalid", "Number"], "Global"),
        new quizViewModel("In JavaScript, a variable must be declared before it is used.", ["True", "False"], "False"),
        new quizViewModel("JavaScript function parameters are delimited by:", ["comma", "semicolon", "colon", "period"], "comma"),
        new quizViewModel("Which of the following comparison checks for equal value and type?", ["y = 1", "y == 1", "y === 1", "y <> 1"], "y === 1"),
        new quizViewModel("Data  used to track different characteristics related to a user which stored in small text files on your computer are called:", ["JSON", "XML", "Cache", "Cookies"], "Cookies"),
        new quizViewModel("A built-in method used to convert a JavaScript object into a string.", ["JSON.stringify()", "JSONify()", "Convert2JSON()", "JSON.Convert.Object()"], "JSON.stringify()"),
        new quizViewModel("Which of the following is used to add an HTML element using JavaScript?", ["document.createElement(element)", "document.appendChild(element)", "document.write(text)", "document.replaceChild(new, old)"], "document.appendChild(element)"),
        new quizViewModel("In JavaScript, which of the following is used to comment lines:", ["/* and */", "//", "Data Types", "<!-- and  -->"], "<!-- and  -->"),
    ];
    self.click = ko.observable(false)
    self.currentQuestion = ko.observable(self.quiz[0]);
    self.currentAnswer = ko.observable(self.quiz[0].answer)
    self.checkAnswer = function (guess) {
        if (guess.choice === self.currentAnswer()) {

        } else {
            self.currentQuestion().inCorrect(true)
        }
    }
    self.nextQuestion = function () {

        self.index(self.index() + 1)
        self.previous(true);
        if (self.index() === 9) {
            self.next(false);
            self.submitButton(true)
            self.currentQuestion(self.quiz[self.index()])
            self.currentAnswer(self.quiz[self.index()].answer)
        } else {
            self.currentQuestion(self.quiz[self.index()])
            self.currentAnswer(self.quiz[self.index()].answer)
        }






    }

    self.previousQuestion = function () {
        self.index(self.index() - 1)
        if (self.index() === 0) {
            self.previous(false)
            self.currentQuestion(self.quiz[self.index()])
            self.currentAnswer(self.quiz[self.index()].answer)
        } else {
            self.currentQuestion(self.quiz[self.index()])
            self.currentAnswer(self.quiz[self.index()].answer)


        }


    }
    self.showQuestion = function (question) {
        self.currentQuestion(question)
        self.currentAnswer(question.answer)
        self.index(quiz.indexOf(question))
        if (self.index() > 0) {
            self.previous(true)
        } else {
            self.previous(false)
        }
        if (self.index() === 9) {
            self.next(false)
            self.submitButton(true)
        } else {
            self.next(true)
            self.submitButton(false)
        }
    }



    self.selected = function (choiceSelected) {
        if (choiceSelected.clicked() === false) {
            choiceSelected.clicked(true);
            self.currentQuestion().choices().forEach(function (choice) {

                choice.select(false)
                choiceSelected.select(true)

            })
            self.checkAnswer(choiceSelected)
        } else if (choiceSelected.clicked() === true) {
            choiceSelected.clicked(false)
            self.currentQuestion().choices().forEach(function (choice) {
                choice.select(true)
            })
            self.currentQuestion().inCorrect(false)

        }
    }

    self.submit = function () {
        self.duringQuiz(false)
        self.final(true);
        for (var i = 0; i < self.quiz.length; i++) {
            if (self.quiz[i].inCorrect() === true) {
                self.incorrectAnswers(self.incorrectAnswers() + 1)
            }
        }
        self.finalScore(self.finalScore() - self.incorrectAnswers())

        if (self.finalScore()) {

        }
    }

}

var choicesViewModel = function (choice) {
    var self = this;
    self.choice = choice;
    self.select = ko.observable(false);
    self.clicked = ko.observable(false)


}


var quizViewModel = function (question, choiceOptions, answer) {
    var self = this;
    self.guess = ko.observable([]);
    self.answer = answer;
    self.click = 0
    self.question = question;
    self.choices = ko.observableArray([])
    self.inCorrect = ko.observable(false)
    for (var i = 0; i < choiceOptions.length; i++) {
        self.choices().push(new choicesViewModel(choiceOptions[i]));
    }
}


var finalScore = function (question, checked) {

}

ko.applyBindings(quizModelView);