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
	}
}
