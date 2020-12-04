
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
    let callback = options.callback;

    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        let response = xhr.response;
        callback(null, response);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
        let err = xhr.status;
        callback(err, null);
    } 
}) 

    if (method == "GET" && data) {
        xhr.open("GET", `${url}?mail=${data.email}&password=${data.password}`);
        xhr.send();
    } else if (method == "GET") {
        xhr.open("GET", url);
        xhr.send();
    } else {
        let formData = new FormData;
        formData.append("name", `${data.name}`);
        formData.append("mail", `${data.email}`);
        formData.append("password", `${data.password}`);
        xhr.open(`${method}`, `${url}`);
        xhr.send(formData);
    }
}; 


