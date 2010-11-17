var Template = {
  cache : {},

  get : function(tplId) {
    if (!Tpl.cache[tplId]) {
      try {
        if (senchaVersion == '0.9.3') {
          Tpl.cache[tplId] = new Ext.XTemplate(Ext.get(tplId).getHTML().trim(), {compiled: true});
        } else {
          Tpl.cache[tplId] = new Ext.XTemplate(Ext.util.Format.trim(document.getElementById(tplId).innerHTML), {compiled: true});
        }
      } catch (e) {
        alert('Template "' + tplId + '" not defined! - ' + e)
        throw('Template "' + tplId + '" not defined!')
      }
    }
    return Tpl.cache[tplId]
  }
}

// DEPRECATED USAGE - remove in future versions
var Tpl = Template