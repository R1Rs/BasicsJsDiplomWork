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
    User.register(options, callback);

    function callback(err, response) {
      if (response.success == true) {
        let elementForClose = element.closest("#modal-register");

        App.setState("user-logged");
        new Modal(elementForClose).close();
      } else {
        console.log("ошибка при регистрации: " + err);
      }
    }
  }
}
