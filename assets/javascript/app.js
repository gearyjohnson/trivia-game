
var trivia = [{
	question: "What famous composer has scored all the 'Star Wars' films so far?",
	answerList: ["(a) John Williams", "(b) Hans Zimmer", "(c) Danny Elfman", "(d) Johannes Brahms"],
	answer: 0
},{
	question: "What fatal flaw did the rebels exploit to destroy the first Death Star?",
	answerList: ["(a) An unstable nuclear reactor", "(b) An unstable hypermatter reactor", "(c) Incomplete structural antenna", "(d) An exposed thermal exhaust port"],
	answer: 3
},{
	question: "Who plays Chewbacca?",
	answerList: ["(a) Kenny Baker", "(b) Rick Baker", "(c) James Earl-Jones", "(d) Peter Mayhew"],
	answer: 3
},{
	question: "Where did Darth Vader reveal himself to be Luke's father?",
	answerList: ["(a) Dagobah", "(b) The Death Star", "(c) Endor", "(d) Cloud City"],
	answer: 3
},{
	question: "What location stood in for the Forest Moon of Endor?",
	answerList: ["(a) The Redwood forest in Northern Calif.", "(b) Daintree rainforest in Australia", "(c) The Black forest in Germany", "(d) Yosemite National Park in Nevada"],
	answer: 0
},{
	question: "How many sequels does Star Wars currently have released? (as of June 2018)",
	answerList: ["(a) 9", "(b) 10", "(c) 7", "(d) 5"],
	answer: 1
}];



var currentQuestion; 
var correct; 
var incorrect; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var selected;

var messages = {
	correct: "The force is strong with this one!",
	incorrect: "Train yourself to let go of everything you fear to lose.",
	endTime: "Out of time!",
	finished: "A Jedi's strength flows from the Force."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
    newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correct').empty();
	$('#incorrect').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
    answered = true;
    $('#answerList').append('<button>')
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+trivia.length);
	$('.question').html('<h3>' + trivia[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(trivia[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    
	countdown();
	
	$('.thisChoice').on('click',function(){
		selected = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(newCountdown, 1000);
}

function newCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
}};

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var correctAnswer = trivia[currentQuestion].answerList[trivia[currentQuestion].answer];
	var answer = trivia[currentQuestion].answer;
	
	if((selected == answer) && (answered == true)){
		correct++;
		$('#message').html(messages.correct);
	} else if((selected != answer) && (answered == true)){
		incorrect++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + correctAnswer);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + correctAnswer);
		answered = true;
	};
	
	if(currentQuestion == (trivia.length-1)){
		setTimeout(score, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
}};	


function score(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correct').html("Correct Answers: " + correct);
	$('#incorrect').html("Incorrect Answers: " + incorrect);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?').append('<button>');
}
;