/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */

  onSubmit( options ) {
    let element = this.element;
    function callback(err, response) {
      if (response.success == true) {
        console.log("регистрация успешна");
        let elementForClose = element.closest("#modal-register");

        App.setState("user-logged");
        new Modal(elementForClose).close();
      } else {
        console.log("ошибка при регистрации: " + err);
      }
    }
    User.register(options, callback);
  }
}
