var Tpl = {
  cache : {},
  
  // this could be good, but I need to plug in to the right place in the loading mechanism
  /*loadAll : function(callback){
    /*Ext.Ajax.request({
      url: 'app/templates/template.html',
      method: 'get',
      success: function(msg){
        Ext.get('templates').setHTML(msg.responseText)
        callback()
      }
   });
  },*/

  get : function(tplId) {
    if (!Tpl.cache[tplId]) {
      try {
        Tpl.cache[tplId] = Ext.get(tplId).getHTML().trim()
      } catch (e) {
        Wrt.log('Template "' + tplId + '" not defined!')
      }
    }

    return Tpl.cache[tplId]
  }
}
