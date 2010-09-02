var Tpl = {
  cache : {},

  get : function(tplId) {
    if (!Tpl.cache[tplId]) {
      Tpl.cache[tplId] = Ext.get(tplId).getHTML().trim()
    }
    
    return Tpl.cache[tplId]
  }
}
