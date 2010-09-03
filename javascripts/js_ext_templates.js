var Tpl = {
  cache : {},

  get : function(tplId) {
    if (!Tpl.cache[tplId]) {
      try {
        Tpl.cache[tplId] = Ext.get(tplId).getHTML().trim()
      } catch (e) {
        Utility.log('Template "' + tplId + '" not defined!')
      }
    }

    return Tpl.cache[tplId]
  }
}
