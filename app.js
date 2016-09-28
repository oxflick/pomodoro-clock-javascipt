var adder = document.getElementById('settimecount').innerHTML;
var adderbreak = document.getElementById('setbreakcount').innerHTML;
var alertmessage = document.getElementById('alertmessage');

// functions below add and deduct time after user clicks plus or minus

function addTime() {
	adder++;
	document.getElementById('settimecount').innerHTML = adder;
}

function deductTime() {
	if ( adder == 0) {
		return alertmessage.innerHTML = "You can only set 0 and/or more minutes";
	}	else {
		adder--;
		document.getElementById('settimecount').innerHTML = adder;	
	}
}

function addBreakTime() {
	adderbreak++;
	document.getElementById('setbreakcount').innerHTML = adderbreak;
}

function deductBreakTime() {
	if ( adderbreak == 0) {
		return alertmessage.innerHTML = "You can only set 0 and/or more minutes";
	}	else {
		adderbreak--;
		document.getElementById('setbreakcount').innerHTML = adderbreak;	
	}
}

// below is everything about timer

var timer = document.getElementById('timergoing');
var totalSeconds;

//here we add the message when it's a session or break or times is up
var session = document.getElementById('state');

// we will save the setTimout in this var and then will clearTimout when we click button stop
var timerrunning;

var TimeStr;
var snd = new Audio("GiggleBoy.wav");
var toggleBtn;

// timer for the session

function goToggle() {
	toggleBtn = document.getElementById('starttimer').innerHTML;
	if ( toggleBtn == "Start") {
		document.getElementById('starttimer').innerHTML = "Stop";
		goTimer();
	} else if (toggleBtn == "Stop") {
		document.getElementById('starttimer').innerHTML = "Start";
		clearTimeout(timerrunning);
	}	
}

function resetTimer() {
	timer.innerHTML = "00 : 00 : 00";  
    window.clearInterval('Tick()');

}


function goTimer() {
	totalSeconds = adder*60;
	UpdateTimer();
	timerrunning = window.setTimeout("Tick()", 1000);
	alertmessage.innerHTML = "Session";
}

//each time Tick is called we want to set the timer to 1 second to make the timer continue

function Tick() {
	if (totalSeconds <= 0 && alertmessage.innerHTML == "Session") {
		startBreak();
	} if (totalSeconds <= 0 && alertmessage.innerHTML == "Time for Break") {
		alertmessage.innerHTML = "Time is Up";
		return;
	} else {
		totalSeconds -= 1;
		UpdateTimer();
		timerrunning = window.setTimeout("Tick()", 1000);
	}
}

// here we exctracting from our seconds: days, hours, minutes and seconds

function UpdateTimer() {
	var seconds = totalSeconds;
	var days = Math.floor(seconds / 86400);
	seconds -= days * 86400;

	var hours = Math.floor(seconds / 3600);
	seconds -= hours * (3600);

	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * (60);

	TimeStr = ((days > 0) ? days + " days " : "") + LeadingZero(hours) + ":" + LeadingZero(minutes) + ":" + LeadingZero(seconds);
	timer.innerHTML = TimeStr;
}

//it will return the hours, minutes or seconds with a leading 0 if they only had one number before

function LeadingZero(Time) {
	return (Time < 10) ? "0" + Time : + Time;  
}

// starting a break after main timer run out

function startBreak() {
	totalSeconds = adderbreak*60;
	UpdateTimer();
	alertmessage.innerHTML = "Time for Break";
    snd.play();
}






