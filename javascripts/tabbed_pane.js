function TabbedPane() {
  this.type = Display.isTouch() ? 'touch' : 'keypad';
  this.tabs = [];
}

TabbedPane.prototype.add = function(symbol, title, screen) {
  this.tabs.push( {
    symbol : symbol,
    title : title,
    screen : new screen()
  });
};

TabbedPane.prototype.draw = function(callback) {
  var that = this;

  load_template('layout_' + this.type, function(data) {
    $('#layout')[0].innerHTML = data;
    $('body').addClass(that.type);

    if (Display.isTouch()) {
      that.drawTouch();
    } else {
      that.drawKeypad();
      that.click(that.tabs[0]);
    }

    callback();
  });
};

TabbedPane.prototype.drawTouch = function() {
  var that = this;
  var tabs = this.tabs;

  render_collection($('#tab_row'), 'tabs', tabs, function() {
    for ( var i in tabs) {
      var link = $('.' + tabs[i].symbol);
      link[0].action = tabs[i].symbol;

      link.bind('click', function() {
        that.clickTab(this);
      });
    }

    $('.tabs td').width(100 / tabs.length + '%');
    that.clickTab($('.tabs a')[0]);
  });

  if (window.widget) {
    window.menu.hideSoftkeys();
  }
};

TabbedPane.prototype.drawKeypad = function() {
  var that = this;

  if (window.widget) {
    widget.setNavigationEnabled(false);
    window.menu.setRightSoftkeyLabel("", null);
    window.menu.showSoftkeys();
    menu.clear();
    for ( var i in that.tabs) {
      var command = new MenuItem(that.tabs[i].title, parseInt(i));
      command.onSelect = function(id) {
        // workaround for stupid X6 phone that doesn't get UTF
        Dialog.showLoading(i18n.loading);
        that.click(that.tabs[id]);
      };
      menu.append(command);
    }
  }
};

TabbedPane.prototype.clickTab = function(link) {
  Dialog.showLoading(i18n.loading);

  var item = this.getItemByAction(link.action);
  this.click(item);

  $('.tabs .current').removeClass('current');
  $(link).addClass('current');
  $(link).blur();
};

TabbedPane.prototype.click = function(item) {
  if (item.screen.showHeader) {
    this.setTitle(item.title);
    $('#header').show();
  } else {
    $('#header').hide();
  }

  $('#content').html('');

  // setira content koji mu vrati funkcija
  item.screen.show(function(data) {
    $('#content').html(data);
    Dialog.hide();
  });
};

TabbedPane.prototype.getItemByAction = function(action) {
  var item;
  for ( var i in this.tabs) {
    if (this.tabs[i].symbol == action) {
      item = this.tabs[i];
    }
  }
  return item;
};

TabbedPane.prototype.setTitle = function(title) {
  $('#header_text')[0].innerHTML = title;
};

TabbedPane.prototype.clear = function() {
  this.tabs = null;
  this.onClick = null;
};