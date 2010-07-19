(function() {
  var cache = {}
  var cachedTemplates = {}

  // loads a new template from templates/name.html file, caches it in
  // cachedTemplates and invokes a callback
      this.load_template = function load_template(name, callback) {
        $.ajax( {
          url : "templates/" + name + ".html",
          context : document.body,
          success : function(data) {
            cachedTemplates[name] = data
            callback(data)
          }
        })
      },

      // renders a collection of hashes, rendering each hash with the "render"
      // function and applying the result
      // in the "holder" DOM node
      // loads the template or caches it if already loaded
      this.render_collection = function render_collection(holder, name, collection, callback) {
        if (cachedTemplates[name] == null) {
          this.load_template(name, function() {
            render_cached_collection(holder, name, collection, callback)
          })
        } else {
          render_cached_collection(holder, name, collection, callback)
        }
      },

      this.render_cached_collection = function render_cached_collection(holder, name, collection, callback) {
        holder.each(function(index, element) {
          element.innerHTML = ''
        })

        for ( var i in collection) {
          holder.append(render(cachedTemplates[name], collection[i]))
        }

        if (callback != undefined) {
          callback()
        }
      },

      this.render = function render(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || render(document.getElementById(str).innerHTML) :

        // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                // Convert the template into pure JavaScript
                str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(
                    /\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join(
                    "\\'") + "');}return p.join('');")

        // Provide some basic currying to the user
        return data ? fn(data) : fn
      }
})()
