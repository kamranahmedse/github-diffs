class FileDiff {

  constructor() {
    this.bindHeaders();

    FileDiff.toggleFileDetails = FileDiff.toggleFileDetails.bind(this);
  }

  /**
   * Binds the file headers to make the adjacent
   * file details show/hide upon click
   */
  bindHeaders() {
    document.querySelectorAll('.file-header').forEach(item => {
      item.addEventListener('click', FileDiff.toggleFileDetails);
    });
  }

  /**
   * Toggles file details for the clicked file element
   * @param event
   */
  static toggleFileDetails(event) {
    let header = FileDiff.getHeaderElement(event);

    if (!header) {
      return;
    }

    header.nextElementSibling.classList.toggle('Details-content--shown');
    header.nextElementSibling.classList.toggle('Details-content--hidden');
  }

  /**
   * Gets header element for the clicked element
   * @param event
   * @returns {*}
   */
  static getHeaderElement(event) {
    let isSelf = event.target.classList.contains('file-header'),
      isParent = event.target.parentElement.classList.contains('file-header');

    if (isSelf) {
      return event.target;
    }

    if (isParent) {
      return event.target.parentElement;
    }

    return null;
  }
}


new FileDiff();
