function initExtensions() {
  Ext.currentStackable = null

  Ext.StackablePanel = Ext.Panel.extend({
    cardStack : null,

    scrollStack : null,

    showedFirstTime : false,

    layout : 'card',

    stack : function(card, options) {
      options = options || {}
      if (options.keepPrevious == undefined) {
        options.keepPrevious = true;
      }

      if (!options.keepPrevious && this.cardStack.length > 0) {
        this.cardStack.pop()
      }

      if (options.keepPrevious) {
        this.saveScroll()
      }

      this.cardStack.push(card)
      if (!options.skipSetCard) {
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
        this.restoreScroll()
      } else {
        throw "Called back with only 1 card on stack!"
      }
    },

    // remove all the cards from the stack, leaving just the first
    clear : function() {
      this.cardStack = [ this.cardStack[0] ]
      this.setCard(this.cardStack[0])
    },

    listeners : {
      activate : function() { // prebacio sa beforeshow jer ne radi na 0.9.6 senchi
        if (this.cardStack == null) {
          this.cardStack = []
          this.scrollStack = []
        }

        if (this.cardStack.length == 0 && this.items.items.length > 0) {
          this.stack(this.items.items[0], {
            skipSetCard : true
          })
        }

        if (Ext.currentStackable != null) {
          Ext.currentStackable.saveScroll()
        }
        Ext.currentStackable = this
        Ext.currentStackable.restoreScroll()
      },

      change : function() {
        if (this.showedFirstTime) {
          this.stackTop().fireEvent('beforeshow')
        } else {
          this.showedFirstTime = true
        }
      }
    },

    saveScroll : function() {
      this.scrollStack.push(document.body.scrollTop)
      document.body.scrollTop = 0
    },

    restoreScroll : function() {
      if (this.scrollStack.length > 0) {
        document.body.scrollTop = this.scrollStack.pop()
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
        id : 'msgBoxBtn',
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
      if (!Display.isTouch()) {
        Utility.focus('msgBoxBtn')
      }
    },
    showMessageWithTitle : function(title, message) {
      Ext.getCmp('msgBoxTitle').setTitle(title)
      Ext.getCmp('msgBoxMsg').html = message
      this.show()
      if (!Display.isTouch()) {
        Utility.focus('msgBoxBtn')
      }
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
