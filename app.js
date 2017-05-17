const appState = {
    resultThumbnails: [],
	search: "",
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

// const search = "cats";
function resetState(appState){
	appState.resultThumbnails = [];
	// appState.search="";
}
function getThumbs(response,appState){
	console.log("yo i did something");
	const urls = response.items.map(el=>appState.resultThumbnails.push(el.snippet.thumbnails.medium.url));
	console.log(appState.resultThumbnails);
	return urls;
}

function renderThumbs(appState, element){
	let thumbnails = appState.resultThumbnails;
	console.log(appState.resultThumbnails);

	let html = `<div class="results">`;

	for(let i=0; i < thumbnails.length; i++){
		console.log(thumbnails[i]);
		console.log(appState.search+"hi");
		html+=`<span class ="pic"><img id = ${i} src=${thumbnails[i]} alt="${appState.search}_${i}"></span>`;
	}

	// html+= (thumbnails.forEach(thumb =>
	// 	`<li><img src=${thumb} alt="cat"></li>`)).join();

	html += `</div>`;
	console.log(html);
	element.html(html);
	element.removeClass('hidden');
}
function render(response){
	resetState(appState);
	getThumbs(response, appState);
	renderThumbs(appState,$('.thumbnails'));
}


function addListeners(){

	$('form').on('submit', function(event){
		event.preventDefault();
		appState.search = $('#search-youtube').val();
		console.log(appState.search);
		getJsonElement(appState.search, render);
		console.log(appState.resultThumbnails);

	});

}

$(function () {

addListeners();

});

//getJsonElement(search, storeThumbs);

