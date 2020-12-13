/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
    } else {
      throw new Error("не передан элемент");
    }
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
    this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener("click", (el) => {
    
      el.target.classList.contains("remove-account") ? this.removeAccount() : false;
      el.target.closest(".transaction__remove") ? this.removeTransaction(el.target.dataset.id) : false;
    })
  }
  

  /** 
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {

      if (confirm("Вы действительно хотите удалить счёт?")) {
        Account.remove(this.lastOptions.account_id, {}, callback);
        this.clear();
      } else {
        return false;
      }

       function callback(err, response) {
        if (response.success == true) {
          App.update();
        } else {
          console.log(err);
        }
      }
    }
  }
  
  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
      if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
        Transaction.remove(id, {}, (err, response) => {
          if (response.success == true) { 
            App.update();
          } else {
            console.log(err);
          }
        })
      }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    
    if (options == undefined) {
      return false;
    }

    this.lastOptions = options;

    let callbackForAccountGet = (err, response) => {
        if (response.success == true) {
          this.renderTitle(response.data.name);
        } else {
          console.log(err);
        }
      }
    Account.get(options.account_id, {}, callbackForAccountGet);   
    
    let callbackForTransactionList = (err, response) => {
        if (response.success == true) {
          this.renderTransactions(response.data);
        } else {
          console.log(err);
        }
    }

    Transaction.list(options, callbackForTransactionList);
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    let title = document.querySelector(".content-title");
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    return `${new Date(date).toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' })} в ${new Date(date).toLocaleString('ru', {hour: '2-digit', minute: '2-digit'})}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let id = item.id;
    let type = "transaction_" + item.type.toLocaleLowerCase();
    let name = item.name;
    let date = this.formatDate(item.created_at);
    let sum = item.sum;
    return (`<div class="transaction ${type} row">
            <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <!-- дата -->
                  <div class="transaction__date">${date}</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="transaction__summ">
              <!--  сумма -->
                  ${sum} <span class="currency">₽</span>
              </div>
            </div>
            <div class="col-md-2 transaction__controls">
                <!-- в data-id нужно поместить id -->
                <button class="btn btn-danger transaction__remove" data-id=${id}>
                    <i class="fa fa-trash"></i>  
                </button>
            </div>
           </div>`)
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let content = document.querySelector(".content");
    content.innerHTML = "";

    data.forEach(element => {
    content.innerHTML += this.getTransactionHTML(element);
    });
   }
}
