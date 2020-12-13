/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    
    let element = this.element;

    User.login(options, callback);

    function callback(err, response) {
       if (response.success == true) {
         App.setState("user-logged");
         let elementForClose = element.closest("#modal-login");
         new Modal(elementForClose).close();
       } else {
         console.log("ошибка авторизации: " + err);
       }
    }
  }
}
