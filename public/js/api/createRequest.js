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
        
        xhr.addEventListener("readystatechange", () => {

            if (xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.response;
            callback(response)
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            let err = xhr.status;
            callback(err);
        } 
    })
    }

    if (method == "GET" && data) {
        xhr.open("GET", `${url}?mail=${data.mail}&password=${data.password}`);
        xhr.send();
        listener();

    } else if (method == "GET") { 
        xhr.open("GET", url);
        xhr.send();
        listener();

    } else {
        let formData = new FormData;
        formData.append("mail", `${data.mail}`);
        formData.append("password", `${data.password}`);
        xhr.open(`${method}`, `${url}`);
        xhr.send(formData);
        listener() ;
    }
    function callback (a) {
        if (a = "undefined") {
             return "опять 25";
        }
        console.log(a); 
       return a;
    }
    return callback();

}; 


