var quizModelView = function () {
    self = this;
    self.index = ko.observable(0);
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
  
    self.correct = ko.observable(0)
    self.click = ko.observable(0)

    self.currentQuestion = ko.observable(self.quiz[0]);
    self.currentAnswer = ko.observable(self.quiz[0].answer)

    self.checkAnswer = function (guess) {
        if (guess === self.currentAnswer()) {
            self.correct(self.correct() + 1)
            console.log('correct')
        } else {
            console.log('false')
        }

    }

    self.nextQuestion = function () {
        self.currentQuestion(self.quiz[self.index()])
        self.currentAnswer(self.quiz[self.index()].answer)
        self.index(self.index() + 1)
    }

    self.previousQuestion = function () {

        self.currentQuestion(self.quiz[self.index()])
        self.currentAnswer(self.quiz[self.index()].answer)
        self.index(self.index() - 1)
    }
    self.showQuestion = function (index) {
        self.currentQuestion(self.quiz[index])
    }

    self.selected = function (choiceSelected) {
        if (self.click() < 1) {

            self.currentQuestion().choices().forEach(function (choice) {
                choice.select(false)
            })
            choiceSelected.select(true)
            self.checkAnswer(choiceSelected.choice)


        } else if (self.click() >= 2) {
            self.currentQuestion().choices().forEach(function (choice) {
                choice.select(true)
            })

        }


    }
   
}

var choicesViewModel = function (choice) {
    var self = this;
    self.choice = choice;
    self.select = ko.observable(true);

}


var quizViewModel = function (question, choiceOptions, answer) {
    var self = this;
    self.guess = ko.observable([]);
    self.answer = answer;
    self.click = 0
    self.question = question;
    self.choices = ko.observableArray([])
    for (var i = 0; i < choiceOptions.length; i++) {
        self.choices().push(new choicesViewModel(choiceOptions[i]));
    }
}


var finalScore = function(question,checked){

}



//found this and thought maybe we want to try a custom binding for our dbl click 

// ko.bindingHandlers.click = {
//     init: function(element, valueAccessor, allBindingsAccessor, viewModel, context) {
//         var accessor = valueAccessor();
//         var clicks = 0;
//         var timeout = 200;

//         $(element).click(function(event) {
//             if(typeof(accessor) === 'object') {
//                 var single = accessor.single;
//                 var double = accessor.double;
//                 clicks++;
//                 if (clicks === 1) {
//                     setTimeout(function() {
//                         if(clicks === 1) {
//                             single.call(viewModel, context.$data, event);
//                         } else {
//                             double.call(viewModel, context.$data, event);
//                         }
//                         clicks = 0;
//                     }, timeout);
//                 }
//             } else {
//                 accessor.call(viewModel, context.$data, event);
//             }
//         });
//     }
// };

ko.applyBindings(quizModelView);