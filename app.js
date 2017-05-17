const appState = {
    resultThumbnails: [],
}
const urlYoutube ="https://www.googleapis.com/youtube/v3/search";
function getJsonElement(searchTerm,callback ){
    const query = {
        part:'snippet',
        key: 'AIzaSyBJaTa4o4ogOUb44z5YIoA6h692_IXy-js',
        q: searchTerm,
    }
    $.getJSON(urlYoutube,query,callback);
}

const search = "cats";

function storeThumbs(appState, thumbs){
	thumbs.forEach(thumb => appState.resultThumbnails.push(thumb));
	
}

function getThumbs(response){
	console.log("yo i did something");
	const urls = response.items.map(el=>(el.snippet.thumbnails.medium.url));
	console.log(appState.resultThumbnails);
	return urls;
}

function renderThumbs(appState, element){
	let thumbnails = appState.resultThumbnails;
	console.log(appState.resultThumbnails);

	let html = `<ul>`;

	for(let i=0; i < thumbnails.length; i++){
		console.log(thumbnails[i]);
		html+=`<li><img src=${thumbnails[i]} alt="cat_${i}"></li>`;
	}

	// html+= (thumbnails.forEach(thumb =>
	// 	`<li><img src=${thumb} alt="cat"></li>`)).join();

	html += `</ul>`;
	console.log(html);
	element.html(html);
	element.removeClass('hidden');
}



function addListeners(){

	$('form').on('submit', function(event){
		event.preventDefault();
		const search = $('#search-youtube').val();
		console.log(search);
		getJsonElement(search, getThumbs);
		console.log(appState.resultThumbnails);
		renderThumbs(appState, $('.thumbnails'));
	});

}

$(function () {

addListeners();

});

//getJsonElement(search, storeThumbs);

