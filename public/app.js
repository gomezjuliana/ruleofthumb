fetch('/data/data.json')
.then(response => response.json())
.then(createCards).catch(() => console.log('Oops! Something went wrong'))

function createCards(data){
	for (let x = 0; x<data.people.length; x++){
		const rootDiv = document.querySelector('.root');
		const containerDiv = document.createElement('div');
		containerDiv.classList.add('containerDiv');
		rootDiv.appendChild(containerDiv);

		containerDiv.style.backgroundImage = `url(${data.people[x].photo})`;

		const contentDiv = document.createElement('div');
		contentDiv.classList.add('contentDiv');
		containerDiv.appendChild(contentDiv);

		const heading = document.createElement('h1');
		const name = document.createTextNode(data.people[x].name);
		heading.appendChild(name);
		contentDiv.appendChild(heading); 

		const subtitle = document.createElement('h5');
		const text = document.createTextNode(data.people[x].date+' in '+data.people[x].category);
		subtitle.appendChild(text);
		contentDiv.appendChild(subtitle);

		const blurb = document.createElement('p');
		const blurbText = document.createTextNode(data.people[x].blurb);
		blurb.appendChild(blurbText);
		contentDiv.appendChild(blurb);


		const counterDiv = document.createElement('div');
		counterDiv.classList.add('counter');

		const yesBar = document.createElement('div');
		yesBar.classList.add('yes');
		counterDiv.appendChild(yesBar);

		const noBar = document.createElement('div');
		noBar.classList.add('no');
		counterDiv.appendChild(noBar);
		
		const vote = createVotingForm(counterDiv, x);
		contentDiv.appendChild(vote);

		contentDiv.appendChild(counterDiv);
	}
}

function createVotingForm(counterDiv, x){
	function voteCalc(e){
		e.preventDefault();

		const upVote = form.querySelector('.input-yes');

		const yesBar = counterDiv.querySelector('.yes');
		const noBar = counterDiv.querySelector('.no');

		if (upVote.checked){
			++upVotes
		} else {
			++downVotes
		}
		const totalVotes = upVotes + downVotes;

		yesBar.style.width = (upVotes/totalVotes) * 100+"%";
		noBar.style.width = 100 - ((upVotes/totalVotes) * 100)+"%";

		console.log(totalVotes, upVotes, downVotes);
	}

	const form = document.createElement('form');
	form.classList.add('form');

	//yes input
	const yesLabel = document.createElement('label');
	yesLabel.setAttribute('for', `yes-${x}`);
	form.appendChild(yesLabel);

	const yesInput = document.createElement('input');
	yesInput.setAttribute('type', 'radio');
	yesInput.setAttribute('name', 'vote');
	yesInput.id = `yes-${x}`;
	yesInput.classList.add('input-yes');
	yesLabel.appendChild(yesInput);

	const yesSpan = document.createElement('span');
	yesLabel.appendChild(yesSpan);

	//no input
	const noLabel = document.createElement('label');
	noLabel.setAttribute('for', `no-${x}`);
	form.appendChild(noLabel);

	const noInput = document.createElement('input');
	noInput.setAttribute('type', 'radio');
	noInput.setAttribute('name', 'vote');
	noInput.id = `no-${x}`
	noLabel.appendChild(noInput);

	const noSpan = document.createElement('span');
	noLabel.appendChild(noSpan);

	//button
	const button = document.createElement('input');
	button.setAttribute('type', 'submit');
	button.setAttribute('name', 'vote');
	form.appendChild(button);

	let upVotes = 0;
	let downVotes = 0;

	form.addEventListener('submit', voteCalc);

	return form;
}