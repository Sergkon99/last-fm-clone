const apiRoot = 'https://ws.audioscrobbler.com/2.0';
const apiKey = '8ef354377433e8ae799fd09796eecff0';
const maxTagsLen = 33;
const sepTagsLen = 3;

let searchArtistBlock = document.querySelector('#search-artists');
let searchAlbumsBlock = document.querySelector('#search-albums');
let searchTracksBlock = document.querySelector('#search-tracks');

let artistBlock = document.querySelector('#artists');
let tracksBlock = document.querySelector('#tracks');

let inputSearch = document.querySelector('input');

/**
* Получить продолжительность в формате 'ММ:СС'.
*
* @param {number} duration Продолжительность в секундах.
* @return {string} Продолжительность в формате 'ММ:СС'.
*/
function getDurationString(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    return `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}

/**
* Получить теги в виде строки.
*
* @param {json} tags Слоаврь с тегами.
* @return {string} Теги в формате 'tag1 | tag2 | ...'.
*/
function getTagsString(tags) {
    let tagsArr = [];
    let curLen = 0;
    for(let i = 0; i < tags.length; ++i) {
        curLen += tags[i]['name'].length + sepTagsLen;
        if(curLen > maxTagsLen)
            break;
        tagsArr.push(tags[i]['name']);
    }
    return tagsArr.join(' | ');
}

/**
* Отправить запрос на сервер.
*
* @param {json} params Query-параметры get запроса.
* @return {json} Результат запроса.
*/
async function sendAPIRequest(params) {
    let getParamsList = [];
    for(key in params) {
        getParamsList.push(`${key}=${params[key]}`);
    }
    const getParams = getParamsList.join('&');
    const response = await fetch(`${apiRoot}/?${getParams}&api_key=${apiKey}&format=json`, {method: 'POST'})
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(err => console.warn(`Ошибка при обращении к API: ${err}`));

    if(Object.keys(response).indexOf('error') !== -1) {
        console.warn(`Не удалось получить данные из API. Ошибка: ${JSON.stringify(response)}`);
        return {};
    }
    return response;
}

/**
* Добавить трек(при поиске) на страницу.
*
* @param {json} track Данные трека.
* @return {void}
*/
async function addSearchTrack(track) {
    sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist'], limit: 1})
        .then(response => response['track'] ?? {})
        .then(trackInfo => {
            const trackTitle = trackInfo['name'];
            const trackLink = trackInfo['url'];
            const trackArtistName = (trackInfo['artist'] ?? {})['name'] || 'Неизвестный исполнитель';
            let trackImg = '';
            try {
                trackImg = trackInfo['album']['image'][3]['#text'];
            } catch(err) {
                console.log(`Ошибка получения изобраения ${err}`);
                trackImg = '';
            }
            const trackDuration = Math.floor(parseInt(trackInfo['duration']) / 1000);
            const template = `
                <a class="section-list-item remove-link-decoration" href="${trackLink}">
                    <img class="section-list-item-column" src="${trackImg}" alt="">
                    <div class="section-list-item-column">${trackTitle}</div>
                    <div class="section-list-item-column">${trackArtistName}</div>
                    <div class="section-list-item-column">${getDurationString(trackDuration)}</div>
                </a>
            `;
            if(typeof trackTitle !== 'undefined')
                searchTracksBlock.insertAdjacentHTML('beforeend', template);
        })
        .catch(err => console.warn(`Ошибка при установке трека ${err}`));
}

/**
* Добавить альбом(при поиске) на страницу.
*
* @param {json} album Данные альбома.
* @return {void}
*/
async function addSearchAlbum(album) {
    sendAPIRequest({method: 'album.getinfo', album: album['name'], artist: album['artist'], limit: 1})
        .then(response => response['album'] ?? {})
        .then(albumInfo => {
            const albumName = albumInfo['name'];
            const albumLink = albumInfo['url'];
            let albumImg = '';
            try {
                albumImg = albumInfo['image'][3]['#text'];
            } catch(err) {
                console.log(`Ошибка при получении изобраения ${err}`);
                albumImg = '';
            }
            const albumTags = getTagsString((albumInfo['tags'] ?? {})['tag'] || []);
            const template = `
                <div class="section-blocks-item-box">
                    <a class="section-blocks-item-search-link" href="${albumLink}">
                    <div class="blacker_blur"></div>
                    <img class="section-blocks-item-box-img" src="${albumImg}" alt="">
                    <div class="section-blocks-item-box-description">
                        <div class="text-main-white">${albumName}</div>
                        <div class="text-secondary">${albumTags}</div>
                    </div>
                    </a>
                </div>
            `;
            if(typeof albumName !== 'undefined')
                searchAlbumsBlock.insertAdjacentHTML('beforeend', template);
        })
        .catch(err => console.warn(`Ошибка при установке альбома ${err}`));
} 

/**
* Добавить исполнителя(при поиске) на страницу.
*
* @param {json} artist Данные исполнителя.
* @return {void}
*/
async function addSearchArtist(artist) {
    sendAPIRequest({method: 'artist.getinfo', artist: artist['name'], limit: 1})
        .then(response => response['artist'] ?? {})
        .then(artistInfo => {
            const artistName = artistInfo['name'];
            const artistLink = artistInfo['url'];
            let artistImg = '';
            try {
                artistImg = artistInfo['image'][3]['#text'];
            } catch(err) {
                console.log(`Не удалось получить изобраение ${err}`);
                artistImg = '';
            }
            const artistTags = getTagsString((artistInfo['tags'] ?? {})['tag'] || []);
            const template = `
                <a class="section-blocks-item-box" href="${artistLink}">
                    <div class="blacker_blur"></div>
                    <img class="section-blocks-item-box-img" src="${artistImg}" alt="">
                    <div class="section-blocks-item-box-description">
                        <div class="text-main-white">${artistName}</div>
                        <div class="text-secondary">${artistTags}</div>
                    </div>
                </div>
            `;
            if(typeof artistName !== 'undefined')
                searchArtistBlock.insertAdjacentHTML('beforeend', template);
        })
        .catch(err => console.warn(`Ошибка при установке исполнителя ${err}`));
}

/**
* Добавить исполнителя(список популярных) на страницу.
*
* @param {json} artist Данные исполнителя.
* @return {void}
*/
async function addTopArtist(artist) {
    sendAPIRequest({method: 'artist.getinfo', mbid: artist['mbid'], limit: 1})
        .then(response => response['artist'] ?? {})
        .then(artistInfo => {
            const artistName = artistInfo['name'];
            const artistLink = artistInfo['url'];
            const artistImg = artistInfo['image'][3]['#text'];
            const artistTags = getTagsString(artistInfo['tags']['tag']);
            const template = `
                <a class="section-blocks-item-ring" href="${artistLink}">
                    <img class="section-blocks-item-ring-img" src="${artistImg}" alt="${artistName}">
                    <div class="section-blocks-item-ring-description">
                        <div class="text-main">${artistName}</div>
                        <div class="text-secondary">${artistTags}</div>
                    </div>
                </a>
            `;
            if(typeof artistName !== 'undefined')
                artistBlock.insertAdjacentHTML('beforeend', template);
        })
        .catch(err => console.warn(`Ошибка при установке исполнителя ${err}`));
}

/**
* Добавить трек(список популярных) на страницу.
*
* @param {json} track Данные трека.
* @return {void}
*/
async function addTopTracks(track) {
    sendAPIRequest({method: 'track.getInfo', track: track['name'], artist: track['artist']['name'], limit: 1})
        .then(response => response['track'] ?? {})
        .then(trackInfo => {
            const trackTitle = trackInfo['name'];
            const trackLink = trackInfo['url'];
            const trackArtistName = (trackInfo['artist'] ?? {})['name'] || 'Неизвестный исполнитель';
            const trackImg = (trackInfo['album'] ?? {})['image'][3]['#text'];
            const tracksTags = getTagsString(trackInfo['toptags']['tag']);
            const template = `
                <div class="section-blocks-rect-item">
                    <a href="${trackLink}">
                        <img class="section-blocks-rect-item-img" src="${trackImg}" alt="">
                    </a>
                    <div class="section-blocks-rect-item-description">
                        <div class="text-main">${trackTitle}</div>
                        <div class="text-main">${trackArtistName}</div>
                        <div class="text-secondary">${tracksTags}</div>
                    </div>
                </div>
            `;
            if(typeof trackTitle !== 'undefined')
                tracksBlock.insertAdjacentHTML('beforeend', template);
        })
        .catch(err => console.warn(`Ошибка при установке трека ${err}`));
}

/**
* Заполнить список популярных исполнителей.
*
* @return {void}
*/
function fillTopArtists() {
    sendAPIRequest({method: 'chart.gettopartists', limit: 8})
        .then(response => (response['artists'] ?? {})['artist'] ?? [])
        .then(artists => artists.map(artist => addTopArtist(artist)))
        .catch(err => console.warn(`Ошибка при получении списка исполнителей ${err}`));
}

/**
* Заполнить список популярных треков.
*
* @return {void}
*/
function fillTopTracks() {
    sendAPIRequest({method: 'chart.gettoptracks', limit: 8})
        .then(response => (response['tracks'] ?? {})['track'] ?? [])
        .then(tracks => tracks.map(track => addTopTracks(track)))
        .catch(err => console.warn(`Ошибка при получении списка треков ${err}`));
}

/**
* Заполнить результаты поиска.
*
* @return {void}
*/
async function fillSearchResult(search) {
    sendAPIRequest({method: 'artist.search', artist: search, limit: 8})
        .then(response => response['results']['artistmatches']['artist'])
        .then(artists => (artists ?? []).map(artist => addSearchArtist(artist)))
        .catch(err => console.warn(`Ошибка при поиске исполнитлей ${err}`));
    
    sendAPIRequest({method: 'album.search', album: search, limit: 8})
        .then(response => response['results']['albummatches']['album'])
        .then(albums => (albums ?? []).map(album => addSearchAlbum(album)))
        .catch(err => console.warn(`Ошибка при поиске альбомов ${err}`));

    sendAPIRequest({method: 'track.search', track: search, limit: 8})
        .then(response => response['results']['trackmatches']['track'])
        .then(tracks => (tracks ?? []).map(track => addSearchTrack(track)))
        .catch(err => console.warn(`Ошибка при поиске треков ${err}`));
}

/**
* Очистить результаты поиска.
*
* @return {void}
*/
function clearSearchResults() {
    searchAlbumsBlock.innerHTML = '';
    searchArtistBlock.innerHTML = '';
    searchTracksBlock.innerHTML = '';
}

/**
* Основная функция инициализции страницы.
*
* @return {void}
*/
function main() {
    const href = window.location.href;
    if(href.indexOf('index') !== -1) { // Мы на главной
        fillTopArtists();
        fillTopTracks();
    } else if(href.indexOf('search') !== -1) { // Мы на странице поиска
        const queryParamsStr = window.location.search;
        const queryParams = new URLSearchParams(queryParamsStr);
        if(queryParams && queryParams.get('q')) {
            const searchValue = queryParams.get('q');
            let searchContent = document.querySelector('.search-content');
            let searchCaption = document.querySelector('#search-section-caption');
            searchContent.style.display = 'block';
            searchCaption.innerHTML = `Результаты поиска "${searchValue}"`;
            inputSearch.value = searchValue;
            clearSearchResults();
            fillSearchResult(searchValue);
        } else {
            window.location.replace('./index.html');
        }
    }
}

inputSearch.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if(typeof inputSearch.value !== 'string' || inputSearch.value === '') {
            window.location.replace('./index.html');
        }
        else {
            window.location.replace(`./search.html?q=${inputSearch.value}`);
        }
    }
});

main();
