import Constants from "./Constants";

class FileDiff {

  constructor() {
    this.toggleFileDetails = this.toggleFileDetails.bind(this);
  }

  initialize() {
    if (!fileDiff.canLoadExtension()) {
      return false;
    }

    fileDiff.bindHeaders();
    fileDiff.addToolBarItems();
    fileDiff.applyPreferences();

    return true;
  }

  applyPreferences() {
    // Restore the last known state
    if (localStorage.getItem(Constants.STORAGE_KEY) === Constants.STATE_COLLAPSED) {
      this.hideAllBodies();
    }
  }

  /**
   * Binds the file headers to make the adjacent
   * file details show/hide upon click
   */
  bindHeaders() {
    document.querySelectorAll(`.${Constants.FILE_HEADER_CLASS}`).forEach(item => {
      item.addEventListener('click', this.toggleFileDetails);
    });
  }

  /**
   * Toggles file details for the clicked file element
   * @param event
   */
  toggleFileDetails(event) {
    let header = this.getHeaderElement(event);

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
  getHeaderElement(event) {
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

  canLoadExtension() {
    let isAlreadyLoaded = document.getElementsByClassName('rvt-tools').length !== 0,
      isDiffPage = document.getElementsByClassName(Constants.DIFF_BODY_SELECTOR).length !== 0;

    return !isAlreadyLoaded && isDiffPage;
  }

  /**
   * Adds toolbar buttons (show/hide diffs)
   */
  addToolBarItems() {
    // Ignore if the buttons are already there
    if (document.getElementsByClassName('rvt-tools').length !== 0) {
      return;
    }

    let btnGroup = '<div class="BtnGroup rvt-tools">' +
      `<a id="${Constants.COLLAPSE_ALL_BUTTON_ID}" class="${Constants.TOOL_BUTTON_CLASS}" href="#" aria-label="Collapse All">Collapse All Files</a>` +
      `<a id="${Constants.SHOW_ALL_BUTTON_ID}" class="${Constants.TOOL_BUTTON_CLASS}" href="#" aria-label="Show All">Show All Files</a>` +
      '</div>';

    document.querySelector(Constants.DIFF_BAR_SELECTOR).insertAdjacentHTML('afterBegin', btnGroup);

    document.getElementById(Constants.COLLAPSE_ALL_BUTTON_ID).addEventListener('click', this.hideAllBodies);
    document.getElementById(Constants.SHOW_ALL_BUTTON_ID).addEventListener('click', this.showAllBodies);
  }

  /**
   * Hides all the visible diff file bodies
   * @param event
   */
  hideAllBodies(event) {
    event && event.preventDefault();

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
  showAllBodies(event) {
    event.preventDefault();

    document.querySelectorAll(`.${Constants.DETAIL_HIDDEN_CLASS}`).forEach(function (item) {
      item.classList.remove(Constants.DETAIL_HIDDEN_CLASS);
      item.classList += ` ${Constants.DETAIL_SHOWN_CLASS}`;
    });

    localStorage.setItem(Constants.STORAGE_KEY, Constants.STATE_EXPANDED);
  }
}

let fileDiff = new FileDiff();

// Ugh! Required on page switch because page isn't
// reloaded and extension is not initialized
window.setInterval(function () {
  fileDiff.initialize();
}, 500);
