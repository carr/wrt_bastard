function initExtensions() {
  Ext.currentStackable = null

  Ext.StackablePanel = Ext.Panel.extend( {
    cardStack : null,

    layout : 'card',

    stack : function(card, options) {
      if (options && !options.keepPrevious && this.cardStack.length > 0) {
        this.cardStack.pop()
      }

      this.cardStack.push(card)
      this.setCard(card)
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

        if (this.cardStack.length == 0 && this.items.length > 0) {
          this.stack(this.getActiveItem())
        }
        Ext.currentStackable = this
      }
    }
  })

  Ext.KeyButton = Ext.extend(Ext.Button, {
    renderTpl : new Ext.XTemplate(Tpl.get('keyButton'), {
      compiled : true
    })
  })
}
