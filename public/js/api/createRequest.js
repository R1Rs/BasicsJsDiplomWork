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

    function listener () {
        xhr.send();
        xhr.addEventListener("readystatechange", () => {
        console.log(xhr.readyState, xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.response;
            console.log(response.success);
            callback(response)
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            let err = xhr.status;
            console.log(err);
            callback(err);
        } 
    })
    }
    if (method == "GET" && data) {
        xhr.open("GET", `${url}?mail=${data.mail}&password=${data.password}`);
        // xhr.send();
        listener();

    } else if (method == "GET") {
        xhr.open("GET", url);
        listener();

    } else {
        let formData = new FormData;
        formData.append("mail", `${data.mail}`);
        formData.append("password", `${data.password}`);
        xhr.open(`${method}`, `${url}`);
        // xhr.send(formData);
        listener() ;

    }
    function callback (a) {
        console.log(a);
       return a;
    }
};


