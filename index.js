// Simple API server for simulating conversations in our ChatNow example app


var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var firstResponse = 'Hi, I\'m Alice with AwesomeCo support! How can I help you today?';
var responses = [
	'Sure thing, let\'s see what we can do.',
	'Okay, I can help with that.',
	'Can you provide me some more details about the situation?',
	'I\'d love to help out with that!',
	'Great, I can definitely help you get that done.',
	'Totally understand. Let\'s see what we can do.',
	'Glad you asked, we can take care of that.',
	'Did that seem to resolve it for you?',
	'Anything else I can help you with?',
	'What else can I take care of for you today?',
	'Thanks!'
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set up routing
var router = express.Router();

var isFirstResponse = true;
var awaitingResponse = true;

router.get('/messages', function (req, res) {
	var responseMessage;
	if (isFirstResponse) {
		responseMessage = firstResponse;
		isFirstResponse = awaitingResponse = false;
	} else if (awaitingResponse) {
		responseMessage = responses[getRandomInt(0, responses.length - 1)];
		awaitingResponse = false;
	}

	if (responseMessage) {
		console.log('Responding with: ' + responseMessage);
		res.json({
			message: responseMessage,
			timestamp: Date.now(),
			isOwnMessage: false,
		});
	} else {
		console.log('Awaiting input from our customer, no response yet...');
		res.json({});
	}
});

router.post('/messages', function (req, res) {
	console.log('Received the following message:\n', req.body);
	awaitingResponse = true;
	res.send()
});

app.use('/', router);


// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);