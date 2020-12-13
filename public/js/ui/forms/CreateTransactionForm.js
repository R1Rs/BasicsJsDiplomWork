/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() { 
    let userData = User.current();
    let callback = (err, response) => {
      if (response.success == true) {
        this.clear();
        this.renderItem(response.data);
      } else {
        console.log("ошибка при обновлении счетов: " + err);
      }
    }
    Account.list(userData, callback);
  }

  getAccountHTML( item ) {
    let formSelect = document.querySelectorAll(".accounts-select");
    let name = item.name;
    let id = item.id;

    formSelect.forEach(elem => {
      elem.insertAdjacentHTML("beforeend", `<option value="${id}">${name}</option>`)
    })
  }

  clear() {
    let formSelect = document.querySelectorAll(".accounts-select");
    formSelect.forEach(elem => elem.innerHTML = "")
  }
  
  renderItem( item ) { 
    item.forEach(element => {this.getAccountHTML(element)});
  }

 
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    
      let element = this.element;
  
      Transaction.create(options, callback);
  
      function callback(err, response) {
        if (response.success == true) {

        if (element.closest("#modal-new-income")) {
          new Modal(element.closest("#modal-new-income")).close();
          } else if (element.closest("#modal-new-expense")) {
            new Modal(element.closest("#modal-new-expense")).close();
          }
          App.update();

        } else {
          console.log("ошибка при транзакции: " + err);
       }
     }
   }
 }

