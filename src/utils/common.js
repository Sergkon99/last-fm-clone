const maxTagsLen = 33;
const sepTagsLen = 3;

/**
* Получить продолжительность в формате 'ММ:СС'.
*
* @param {number} duration Продолжительность в секундах.
* @return {string} Продолжительность в формате 'ММ:СС'.
*/
export function getDurationString(duration) {
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
export function getTagsString(tags) {
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