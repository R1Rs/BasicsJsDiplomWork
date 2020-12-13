
/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
    } else {
      throw new Error("не передан элемент");
    }
    this.registerEvents();
    this.update();
  }
  

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener("click", (el) => {
      if (el.target.classList.contains("create-account")) {
        let modalAccount = document.querySelector("#modal-new-account");
        new Modal(modalAccount).open();
      } else if (el.target.parentElement.classList.contains("account")) {
        this.onSelectAccount(el.target.parentElement);
      }
    })
  }
  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let userData = User.current();
    
    let callback = (err, response) => {
      if (response.success == true) {
        this.clear();
        this.renderItem(response.data);
      } else {
        console.log("ошибка при обновлении счетов: " + err);
      }
    }

    (userData) ? Account.list(userData, callback) : false ;
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = this.element.querySelectorAll(".account");
    accounts.forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let elementWithActive = element.parentElement.querySelectorAll(".active");
    
    elementWithActive.forEach(el => el.classList.remove("active"));
    element.classList.add("active");
    App.showPage("transactions", {"account_id": element.dataset.id })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let accountsPanel = document.querySelector(".accounts-panel");
    let name = item.name;
    let sum = item.sum;
    let id = item.id;
    accountsPanel.insertAdjacentHTML("beforeend", `<li class="account" data-id="${id}">
                                                  <a href="#">
                                                  <span>${name}</span> /
                                                  <span>${sum} ₽</span>
                                                  </li>`)
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    item.forEach(element => {this.getAccountHTML(element)});
  }
}
