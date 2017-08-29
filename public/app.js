fetch('/data/data.json')
.then(response => response.json())
.then(createCard).catch(() => console.log('Oops! Something went wrong'))

function createCard(data){
	const rootDiv = document.querySelector('.root');

	const heading = document.createElement('h1');
	const name = document.createTextNode(data.people[0].name);
	heading.appendChild(name);
	rootDiv.appendChild(heading); 

	const subtitle = document.createElement('h5');
	const text = document.createTextNode(data.people[0].date+' in '+data.people[0].category);
	subtitle.appendChild(text);
	rootDiv.appendChild(subtitle);

	const blurb = document.createElement('p');
	const blurbText = document.createTextNode(data.people[0].blurb);
	blurb.appendChild(blurbText);
	rootDiv.appendChild(blurb);

	const img = document.createElement('img');
	img.src = data.people[0].photo;
	rootDiv.appendChild(img);
}
