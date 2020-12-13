/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
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
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener("click", (triger) => {
      if (triger.target.firstElementChild.classList.contains("fa-thumbs-o-up")) {
        App.getModal("newIncome").open();
      } else if (triger.target.firstElementChild.classList.contains("fa-thumbs-o-down")) {
        App.getModal("newExpense").open();
      }
    }
    )
  }
}
