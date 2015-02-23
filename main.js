(function(){


//
// Bookmark Model
//

//
// Bookmark Collection
//

//
// Tag View
//
var TagView = Backbone.View.extend({

  template: _.template($('#tag-template').text()),

  render: function(){
    this.$el.html(this.template());
  }


});

//
// Tag Item View
//

//
// Bookmark View
//
var BookMarkView = Backbone.View.extend({

  template: _.template($('#bookmark-template').text()),

  render: function(){
    this.$el.append(this.template());
  }


});

//
// Bookmark Item View
//

//
// Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tag/:name': 'showTag'
  },

  initialize: function(){
    this.tagView = new TagView({el: '.app-container'});
    this.bookMarkView = new BookMarkView({el: '.app-container'});
  },

  index: function(){
    console.log('index');
    this.tagView.render();
    this.bookMarkView.render();


  },

  showTag: function(){
    console.log('showTag');

  }

});

//
// Glue Code
//
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
});

})();
