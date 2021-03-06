const appState = {
	resultItems: [],
    resultThumbnails: [],
	search: "",
}
const urlYoutube ="https://www.googleapis.com/youtube/v3/search";
function getJsonElement(searchTerm,callback ){
    const query = {
        part:'snippet',
        key: 'AIzaSyBJaTa4o4ogOUb44z5YIoA6h692_IXy-js',
        q: searchTerm,
		maxResults:12,
		type:"video",
    }
    $.getJSON(urlYoutube,query,callback);
}

///////////////////////////////////////////////////////////////////////
//////////        State Modification      /////////////////////////////
///////////////////////////////////////////////////////////////////
function resetState(appState){
	appState.resultThumbnails = [];
	appState.resultItems = [];
	// appState.search="";
}
// .snippet.thumbnails.medium.url
function getThumbs(appState){
	return appState.resultItems.map(el=>appState.resultThumbnails.push(el.snippet.thumbnails.medium.url));
}
function getItems(response,appState){
	return response.items.map(el=>appState.resultItems.push(el));
}

///////////////////////////////////////////////////////////////////////
//////////       Render              //////////////////////////////////
///////////////////////////////////////////////////////////////////
function renderThumbs(appState, element){
	let thumbnails = appState.resultThumbnails;
	let items = appState.resultItems;
	let html = `<div class="results">
				<a href="#_"class="lightbox" id="hiddenbox"><iframe src=""> </iframe></a>`;
	
	/* Make the images clickable, leading the user to the YouTube video, on YouTube
	for(let i=0; i < thumbnails.length; i++){
		html+=`<span class ="pic"><a href="https://www.youtube.com/watch?v=${items[i].id.videoId}">
		<img id = ${i} src=${thumbnails[i]} alt="${appState.search}_${i}"></a></span>`;
	}
*/
	for(let i=0; i < thumbnails.length; i++){
		html+=`<span class="pic"><a href="#hiddenbox"><img id=${i} src=${thumbnails[i]} alt="${appState.search}_${i}"></a></span>`;
		// <span class="pic"><a href="#_" class="lightbox" id="img${i}"><iframe src="https://www.youtube.com/embed/${items[i].id.videoId}" width=300px>
		// </iframe></a></span>`;
	}
	html += `</div>`;
	element.html(html);
	element.removeClass('hidden');
}

function renderIFrame(appState, img, iframe){
	const id = img.attr("id");
	const source = `https://www.youtube.com/embed/${appState.resultItems[id].id.videoId}`;
	iframe.attr("src", source);
}

function callback(response){
	console.log(response);
	resetState(appState);
	getItems(response,appState);
	getThumbs(appState);
	renderThumbs(appState,$('.thumbnails'));
}


///////////////////////////////////////////////////////////////////////
//////////        Event Listeners      //////////////////////////////////
///////////////////////////////////////////////////////////////////

function addListeners(){

	$('form').on('submit', function(event){
		event.preventDefault();
		appState.search = $('#search-youtube').val();
		getJsonElement(appState.search, callback);
	});

	$('div.thumbnails').on('click', 'img', function(event){
		//event.preventDefault();
		renderIFrame(appState, $(this), $(this).closest('.results').find('iframe'));
	});

}

$(function () {

addListeners();

});

//getJsonElement(search, storeThumbs);

