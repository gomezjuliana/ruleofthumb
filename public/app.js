fetch('/data/data.json')
.then(response => response.json())
.then(createCards).catch(() => console.log('Oops! Something went wrong'))

function createCards(data){
	for (let x = 0; x<data.people.length; x++){
		const rootDiv = document.querySelector('.root');
		const containerDiv = document.createElement('div');
		rootDiv.appendChild(containerDiv);

		containerDiv.style.backgroundImage = `url(${data.people[x].photo})`;

		const heading = document.createElement('h1');
		const name = document.createTextNode(data.people[x].name);
		heading.appendChild(name);
		containerDiv.appendChild(heading); 

		const subtitle = document.createElement('h5');
		const text = document.createTextNode(data.people[x].date+' in '+data.people[x].category);
		subtitle.appendChild(text);
		containerDiv.appendChild(subtitle);

		const blurb = document.createElement('p');
		const blurbText = document.createTextNode(data.people[x].blurb);
		blurb.appendChild(blurbText);
		containerDiv.appendChild(blurb);

		const vote = createVotingForm();
		containerDiv.appendChild(vote)

		const counterDiv = document.createElement('div');
		counterDiv.classList.add('counter');
		containerDiv.appendChild(counterDiv);

		const yesBar = document.createElement('div');
		yesBar.classList.add('yes');
		counterDiv.appendChild(yesBar);

		const noBar = document.createElement('div');
		noBar.classList.add('no');
		counterDiv.appendChild(noBar);
	}
}

function createVotingForm(){
	const form = document.createElement('form');
	form.classList.add('form');

	//yes input
	const yesLabel = document.createElement('label');
	yesLabel.setAttribute('for', 'yes');
	form.appendChild(yesLabel);

	const yesInput = document.createElement('input');
	yesInput.setAttribute('type', 'radio');
	yesInput.setAttribute('name', 'vote');
	yesInput.id = "yes";
	yesLabel.appendChild(yesInput);

	const yesSpan = document.createElement('span');
	yesLabel.appendChild(yesSpan);

	//no input
	const noLabel = document.createElement('label');
	noLabel.setAttribute('for', 'no');
	form.appendChild(noLabel);

	const noInput = document.createElement('input');
	noInput.setAttribute('type', 'radio');
	noInput.setAttribute('name', 'vote');
	noInput.id = "no";
	noLabel.appendChild(noInput);

	const noSpan = document.createElement('span');
	noLabel.appendChild(noSpan);

	//button
	const button = document.createElement('input');
	button.setAttribute('type', 'submit');
	button.setAttribute('name', 'vote');
	form.appendChild(button);

	let totalVotes = 0;
	let upVotes = 0;
	let downVotes = 0;

	form.addEventListener('submit', (e) => voteCalc(e, totalVotes, upVotes, downVotes));
	return form;
}

function voteCalc(e, totalVotes, upVotes, downVotes){
	e.preventDefault();

	const upVote = document.getElementById('yes');

	const yesBar = document.querySelector('.yes');
	const noBar = document.querySelector('.no');

	++totalVotes

	if (upVote.checked){
		++upVotes
		yesBar.style.width = (upVotes/totalVotes) * 100+"%";
		noBar.style.width = 100 - ((upVotes/totalVotes) * 100)+"%";
	} else {
		++downVotes
		noBar.style.width = (downVotes/totalVotes) * 100+"%";
		yesBar.style.width = 100 -((downVotes/totalVotes) * 100)+"%";
	}

	console.log(totalVotes, upVotes, downVotes);
}