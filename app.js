const appState ={
    resultThumbnails: [],
}
const urlYoutube ="https://www.googleapis.com/youtube/v3/search";
function getJsonElement(searchTerm,callback ){
    const query = {
        part:'snippet',
        key: 'AIzaSyBJaTa4o4ogOUb44z5YIoA6h692_IXy-js',
        q: searchTerm,
    }
    $.getJson(urlYoutube,query,callback);
}