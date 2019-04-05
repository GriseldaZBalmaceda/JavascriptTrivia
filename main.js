var quizModelView = function () {
    //index is an observable since we will want to display different questions 
    this.index = ko.observable(0);
    //the correct Answers array will hold our users correct answers. Or should we just have an array with our Users answers and then in the end just compare
    //the array with the quiz answers?
    this.correctAnswers = ko.observableArray([]);
    this.quiz = [
        //using the constructor I went ahead and populated the quiz array with our questions
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
//we will start witht the first question inside the quiz array
    this.currentQuestion = ko.observable(this.quiz[0]);

    //created this currentAnswer so maybe we can compare the users answers with the current question answer and then push true or false in the correct answers array?
    this.currentAnswer = ko.observable(this.currentQuestion.answers)
 
//this function takes the current index and adds 1. We then sset the current question with the new index 
    this.nextQuestion = function () {
        console.log('next')
        this.index(this.index() + 1)
        this.currentQuestion(this.quiz[this.index()])
    }
//this function is the same as  nextQuestion but it removes an index to display previous question
    this.previousQuestion = function () {
        console.log('previous')
        this.index(this.index() - 1)
        this.currentQuestion(this.quiz[this.index()])
    }
    //created this function so we can display question that is selected via the li group.
     this.showQuestion = function (index) {
        this.currentQuestion(this.quiz[index])
    }
    //started this function to check the answers but I'm doing something wrong...thoughts?
    this.checkAnswer=function(guess){
    console.log(guess)
    if(guess===this.currentQuestion().answers){
        this.correctAnswers.push(guess)
        console.log('correct')
    }

    }
}

//created a viewModel constructor for the questions!
var quizViewModel = function (question, choices, answers) {
    this.question = question;
    this.choices = choices;
    this.answers = answers;
}


ko.applyBindings(quizModelView);