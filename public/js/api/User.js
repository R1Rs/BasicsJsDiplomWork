/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static url = "/user";

  static setCurrent(user) {
    localStorage.user = {
      id: user.id,
      name: user.name
    }
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
   localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return localStorage.user;
    } else {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let options = {
      url: this.url+"/current",
      data,
      responseType: "json",
      method: "GET"
    };
    let response = createRequest(options);
    if (response.success == "true") {
      this.setCurrent(response.user);
    } else {
      this.unsetCurrent();
    }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let options = {
      url: this.url+"/login",
      data,
      responseType: "json",
      method: "POST"
    };
    let response = createRequest(options);
    if (response.success == "true") {
      this.setCurrent(response.user);
    } else if (response.success == "false") {
      alert (response.error);
    }
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let options = {
      url: this.url+"/register",
      data,
      responseType: "json",
      method: "POST"
    };
    let response = createRequest(options);
    if (response.success == "true") {
      this.setCurrent(response.user);
    } else {
      alert (response.error); 
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let options = {
      url: this.url+"/logout",
      data,
      responseType: "json",
      method: "POST"
    };
    let response = createRequest(options);
    if (response.success == "true") {
      this.unsetCurrent();
    }
  }
}
