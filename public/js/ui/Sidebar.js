/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector(".sidebar-toggle").addEventListener("click", () => {
      document.querySelector(".sidebar-mini").classList.toggle("sidebar-open");
      document.querySelector(".sidebar-mini").classList.toggle("sidebar-collapse");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let allMenuItem = document.querySelectorAll(".menu-item");
    allMenuItem.forEach(el => el.addEventListener("click", findMenu))
    function findMenu(el) {
      if (el.target.closest(".menu-item_register")) {
        let register = App.getModal("register").element;
        new Modal(register).open();
      } else if (el.target.closest(".menu-item_login")) {
        let login = App.getModal("login").element;
        new Modal(login).open();
      } else if (el.target.closest(".menu-item_logout")) {
        let user = User.current();
        let responseLogout = User.logout(user, (err, response) => {
          if (response.success == true) {
            App.setState("init");
          } else if (err) {
            console.log(err)
          }
        } );
      }
    }
  }
}
