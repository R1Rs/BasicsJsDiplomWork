/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static url = "";
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {

    let options = {
      url: this.url,
      data,
      responseType: "json",
      method: "GET",
      callback: (err, response) => {
        if (response.success == true) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      } 
    };

    createRequest(options);
  } 

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let newData = Object.assign({_method:"PUT"}, data);
    let options = {
      url: this.url,
      data: newData,
      responseType: "json",
      method: "POST",
      callback: (err, response) => {
        if (response.success == true) {
          callback(null, response);
        } else {
          callback(err, null);
        }
      }
    };
    createRequest(options);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id, data, callback = f => f ) {
    let newData = Object.assign({id}, data)
    let options = {
      url: `${this.url}/${id}`,
      data: newData,
      responseType: "json",
      method: "GET",
      callback: (err, response) => {
        if (response.success == true) {
          callback(null, response);
        } else {
          callback(err, response);
        }
      }
    };
    createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id, data, callback = f => f ) {
    let newData = Object.assign({id, _method:"DELETE"}, data);
    let options = {
      url: this.url,
      data: newData,
      responseType: "json",
      method: "POST",
      callback: (err, response) => {
        if (response.success == true) {
          callback(null, response);
        } else {
          callback(err, response);
        }
      }
    };
    createRequest(options);
  }
}

