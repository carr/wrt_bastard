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
  
  init : function(){
    Ext.KeyButton = Ext.extend(Ext.Button, {
      renderTpl : new Ext.XTemplate(Tpl.get('keyButton'), {
        compiled : true
      })
    })    
  },

  get : function(tplId) {
    if (!Tpl.cache[tplId]) {
      var tpl = Ext.get(tplId)
      //var tpl = frame.document.getElementById(tplId)      
      if(tpl == null){
        alert("No such template " + tplId)
        return
      }
      //tpl = new Ext.Element(tpl)
      Tpl.cache[tplId] = tpl.getHTML().trim()
    }
    
    return Tpl.cache[tplId]
  }
}
