
 /**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    let element = this.element;

    Account.create(options, callback);

    function callback(err, response) {
      if (response.success == true) {
      let elementForClose = element.closest("#modal-new-account");
      new Modal(elementForClose).close();
      App.update();
      } else {
        console.log("ошибка при создании счёта: " + err);
      }
    }
  }
}
