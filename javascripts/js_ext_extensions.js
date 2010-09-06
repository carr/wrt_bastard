if (typeof (document.querySelectorAll) == 'undefined') {
  document.querySelectorAll = Element.prototype.querySelectorAll = function(selectors) {
    return Sizzle(selectors, this)
  }
}