class FileDiff {

  constructor() {
    this.bindHeaders();

    FileDiff.addToolBarItems();
    FileDiff.toggleFileDetails = FileDiff.toggleFileDetails.bind(this);

    if (localStorage.getItem('gh-collapse:state') === 'collapsed') {
      FileDiff.hideAllBodies();
    }
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

  /**
   * Adds toolbar buttons (show/hide diffs)
   */
  static addToolBarItems() {
    // Ignore if the buttons are already there
    if (document.getElementsByClassName('rvt-tools').length !== 0) {
      return;
    }

    let btnGroup = '<div class="BtnGroup rvt-tools">' +
      '<a id="rvt-collapse-file-content" class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s" href="#" aria-label="Collapse All">Collapse All Files</a>' +
      '<a id="rvt-expand-file-content" class="btn btn-sm btn-outline BtnGroup-item tooltipped tooltipped-s" href="#" aria-label="Show All">Show All Files</a>' +
      '</div>';

    document.querySelector('.pr-review-tools .diffbar-item').insertAdjacentHTML('afterBegin', btnGroup);

    document.getElementById('rvt-collapse-file-content').addEventListener('click', FileDiff.hideAllBodies);
    document.getElementById('rvt-expand-file-content').addEventListener('click', FileDiff.showAllBodies);
  }

  /**
   * Hides all the visible diff file bodies
   */
  static hideAllBodies() {
    document.querySelectorAll('.Details-content--shown').forEach(function (item) {
      item.classList.remove('Details-content--shown');
      item.classList += ' Details-content--hidden';
    });

    localStorage.setItem('gh-collapse:state', 'collapsed');
  }

  /**
   * Shows all the hidden diff file bodies
   */
  static showAllBodies() {
    document.querySelectorAll('.Details-content--hidden').forEach(function (item) {
      item.classList.remove('Details-content--hidden');
      item.classList += ' Details-content--shown';
    });

    localStorage.setItem('gh-collapse:state', 'expanded');
  }
}

new FileDiff();

