function initExtensions() {
  Ext.currentStackable = null

  Ext.StackablePanel = Ext.Panel.extend({
    cardStack : null,

    layout : 'card',

    stack : function(card, options) {
      if ((options && !options.keepPrevious || !options) && this.cardStack.length > 0) {
        this.cardStack.pop()
      }

      this.cardStack.push(card)
      if (options && !options.skipSetCard || !options) {
        this.setCard(card)
      }
    },

    // TODO i don't think this is working right; discuss with bjosip
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
      beforeshow : function() {
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
        this.getActiveItem().fireEvent('beforeshow')
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
