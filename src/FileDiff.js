import Constants from "./Constants";

class FileDiff {

  constructor() {
    this.bindHeaders();

    FileDiff.addToolBarItems();
    FileDiff.toggleFileDetails = FileDiff.toggleFileDetails.bind(this);

    if (localStorage.getItem(Constants.STORAGE_KEY) === Constants.STATE_COLLAPSED) {
      FileDiff.hideAllBodies();
    }
  }

  /**
   * Binds the file headers to make the adjacent
   * file details show/hide upon click
   */
  bindHeaders() {
    document.querySelectorAll(`.${Constants.FILE_HEADER_CLASS}`).forEach(item => {
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

    header.nextElementSibling.classList.toggle(Constants.DETAIL_SHOWN_CLASS);
    header.nextElementSibling.classList.toggle(Constants.DETAIL_HIDDEN_CLASS);
  }

  /**
   * Gets header element for the clicked element
   * @param event
   * @returns {*}
   */
  static getHeaderElement(event) {
    let isSelf = event.target.classList.contains(Constants.FILE_HEADER_CLASS),
      isParent = event.target.parentElement.classList.contains(Constants.FILE_HEADER_CLASS);

    if (isSelf) {
      return event.target;
    }

    if (isParent) {
      return event.target.parentElement;
    }

    return null;
  }

  /**
   * Adds toolbar buttons (show/hide diffs)
   */
  static addToolBarItems() {
    // Ignore if the buttons are already there
    if (document.getElementsByClassName('rvt-tools').length !== 0) {
      return;
    }

    let btnGroup = '<div class="BtnGroup rvt-tools">' +
      `<a id="${Constants.COLLAPSE_ALL_BUTTON_ID}" class="${Constants.TOOL_BUTTON_CLASS}" href="#" aria-label="Collapse All">Collapse All Files</a>` +
      `<a id="${Constants.SHOW_ALL_BUTTON_ID}" class="${Constants.TOOL_BUTTON_CLASS}" href="#" aria-label="Show All">Show All Files</a>` +
      '</div>';

    document.querySelector(Constants.DIFF_BAR_SELECTOR).insertAdjacentHTML('afterBegin', btnGroup);

    document.getElementById(Constants.COLLAPSE_ALL_BUTTON_ID).addEventListener('click', FileDiff.hideAllBodies);
    document.getElementById(Constants.SHOW_ALL_BUTTON_ID).addEventListener('click', FileDiff.showAllBodies);
  }

  /**
   * Hides all the visible diff file bodies
   * @param event
   */
  static hideAllBodies(event) {
    event.preventDefault();

    document.querySelectorAll(`.${Constants.DETAIL_SHOWN_CLASS}`).forEach(function (item) {
      item.classList.remove(Constants.DETAIL_SHOWN_CLASS);
      item.classList += ` ${Constants.DETAIL_HIDDEN_CLASS}`;
    });

    localStorage.setItem(Constants.STORAGE_KEY, Constants.STATE_COLLAPSED);
  }

  /**
   * Shows all the hidden diff file bodies
   * @param event
   */
  static showAllBodies(event) {
    event.preventDefault();

    document.querySelectorAll(`.${Constants.DETAIL_HIDDEN_CLASS}`).forEach(function (item) {
      item.classList.remove(Constants.DETAIL_HIDDEN_CLASS);
      item.classList += ` ${Constants.DETAIL_SHOWN_CLASS}`;
    });

    localStorage.setItem(Constants.STORAGE_KEY, Constants.STATE_EXPANDED);
  }
}

new FileDiff();

