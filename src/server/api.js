const apiRoot = 'https://ws.audioscrobbler.com/2.0';
const apiKey = '8ef354377433e8ae799fd09796eecff0';

/**
* Отправить запрос на сервер.
*
* @param {json} params Query-параметры get запроса.
* @return {json} Результат запроса.
*/
export async function sendAPIRequest(params) {
    let getParamsList = [];
    for(let key in params) {
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