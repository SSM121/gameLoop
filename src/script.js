//get the start time of the wb page load and store it in a variable
var prevTime = performance.now();
//setup array that holds all of the current events
var events = [];
var renderDiv = document.getElementById("output");

function gameLoop(timestamp){
	var elapsed = timestamp - prevTime;
	prevTime = timestamp;
	r = update(elapsed);
	render(r);
	for(i = 0; i < events.length; i++){
		if(events[i].times <= 0){
			events.splice(i, 1);
		}
	}
	window.requestAnimationFrame(gameLoop);

}

function update(elapsed){
	var r = [];
	for(i of events){
		i.curr = i.curr + elapsed;
		if(i.curr > i.total)
		{
			r.push(i);
			i.times = i.times - 1;
			i.curr = 0
		}

	}

	return r;
}

function render(r){
	//"draw" all the events in R
	for(i of r){
		renderDiv.innerHTML += "Event: " + i.name + " (" + i.times + " remaining) <br>";
	}
	//scroll to bottom
	renderDiv.scrollTop = renderDiv.scrollHeight;
}

window.requestAnimationFrame(gameLoop);
