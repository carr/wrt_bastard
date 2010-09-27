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
      if (options && !options.skipSetCard) {
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
    scroll : 'vertical',
    styleHtmlContent : true,
    items : [ {
      id : 'msgBoxMsg',
      style : 'padding: 10px;',
      html : ''
    } ],
    dockedItems : [ {
      id : 'msgBoxTitle',
      xtype : 'toolbar',
      title : qtn_Info,
      dock : 'top'
    }, new Ext.KeyButton({
      width : 60,
      text : qtn_Ok,
      handler : function() {
        this.ownerCt.hide();
      },
      dock : 'bottom'
    }) ],
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
}
