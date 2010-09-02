if (typeof (document.querySelectorAll) == 'undefined') {
  document.querySelectorAll = Element.prototype.querySelectorAll = function(selectors) {
    return Sizzle(selectors, this)
  }
}

Ext.KeyButton = Ext.extend(Ext.Button, {
  renderTpl : new Ext.XTemplate(Tpl.get('keyButton'), {
    compiled : true
  })
})
