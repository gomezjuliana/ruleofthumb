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

		const vote = createVotingButtons();
		containerDiv.appendChild(vote)
	}
}

function createVotingButtons() {
	const div = document.createElement('div');

	const upVote = document.createElement('img');
	upVote.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/100266-200.png";
	div.appendChild(upVote);

	const downVote = document.createElement('img');
	downVote.src= "https://d30y9cdsu7xlg0.cloudfront.net/png/70800-200.png";
	div.appendChild(downVote);

	const button = document.createElement('button');
	const label = document.createTextNode('Vote Now');
	button.appendChild(label);
	div.appendChild(button);
	return div;
}
