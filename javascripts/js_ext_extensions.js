function initExtensions() {
  Ext.currentStackable = null

  Ext.StackablePanel = Ext.Panel.extend({
    cardStack : null,

    showedFirstTime : false,

    layout : 'card',

    stack : function(card, options) {
      options = options || {}
      if(options.keepPrevious == undefined){
        options.keepPrevious = true;
      }
      
      if ((options && !options.keepPrevious || !options) && this.cardStack.length > 0) {
        this.cardStack.pop()
      }

      this.cardStack.push(card)
      if (options && !options.skipSetCard || !options) {
        this.setCard(card)
      }
    },

    stackTop : function() {
      return this.cardStack[this.cardStack.length - 1];
    },

    back : function() {
      if (this.cardStack.length > 1) {
        var oldCard = this.cardStack.pop()
        if (oldCard.back) {
          oldCard.back()
        }

        this.setCard(this.cardStack[this.cardStack.length - 1])
      } else {
        throw "Called back with only 1 card on stack!"
      }
    },

    listeners : {
      activate : function() { // prebacio sa beforeshow jer ne radi na 0.9.6 senchi
        if (this.cardStack == null) {
          this.cardStack = []
        }

        if (this.cardStack.length == 0 && this.items.items.length > 0) {
          this.stack(this.items.items[0], {
            skipSetCard : true
          })
        }
        Ext.currentStackable = this
      },

      change : function() {
        if (this.showedFirstTime) {
          this.stackTop().fireEvent('beforeshow')
        } else {
          this.showedFirstTime = true
        }
      }
    }
  })

  Ext.KeyButton = Ext.extend(Ext.Button, {
    renderTpl : new Ext.XTemplate(Tpl.get('keyButton'), {
      compiled : true
    })
  })

  Ext.MessageBox = Ext.extend(Ext.Panel, {
    width : Display.getWidgetSize().width * 0.8,
    height : Display.getWidgetSize().height * 0.6,
    floating : true,
    centered : true,
    modal : true,
    hideOnMaskTap : false,
    cls : 'msgBox',
    btnCallback : null,
    items : [ {
      id : 'msgBoxMsg',
      html : ''
    } ],
    dockedItems : [ {
      id : 'msgBoxTitle',
      xtype : 'toolbar',
      title : qtn_Info,
      dock : 'top'
    }, {
      dock : 'bottom',
      items : [ new Ext.KeyButton({
        cls : 'button',
        text : qtn_Ok,
        handler : function() {
          this.ownerCt.ownerCt.hide()
          this.ownerCt.ownerCt.destroy()
          if (this.ownerCt.ownerCt.btnCallback) {
            this.ownerCt.ownerCt.btnCallback()
          }
        }
      }) ]
    } ],
    showMessage : function(message) {
      Ext.getCmp('msgBoxMsg').html = message
      this.show()
    },
    showMessageWithTitle : function(title, message) {
      Ext.getCmp('msgBoxTitle').setTitle(title)
      Ext.getCmp('msgBoxMsg').html = message
      this.show()
    }
  })

  Ext.LoadingBox = Ext.extend(Ext.Panel, {
    id : 'loadingBox',
    width : 180,
    height : 100,
    floating : true,
    centered : true,
    modal : true,
    hideOnMaskTap : false,
    cls : 'loadingBox',
    data : {
      message : qtn_Loading
    },
    tpl : new Ext.Template(Tpl.get('loadingBoxTpl'), {
      compiled : true
    })
  })
}
