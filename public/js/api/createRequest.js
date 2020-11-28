/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let url = options.url;
    let headers = options.headers;
    let data = options.data;
    let responseType = options.responseType;
    let method = options.method;

    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;

    if (method = "GET") {
        xhr.open("GET", `${url}?mail=${data.mail}&password=${data.password}`);
        xhr.send();
    } else {
        let formData = new FormData;
        formData.append("mail", `${data.mail}`);
        formData.append("password", `${data.password}`);
        xhr.open(`${method}`, `${url}`); 
        xhr.send(formData);
    }

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.response;
            callback(null, response);
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            let err = xrh.status;
            callback(err, null);
        }

    })

    function callback (err, response) {
        console.log(err);
        console.log(response); 
        if (response) {
            return response;
        }
    }
};
