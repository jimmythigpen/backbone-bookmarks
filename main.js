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
    var self = this;
    this.$el.html(this.template());
    this.children = this.collection.map(function(bookmark){
      var bookMarkItemView = new BookMarkItemView({model: bookmark});
      self.$('ul').append(bookMarkItemView.render().el);
      // return bookMarkItemView;
    });
    // return this;
  }
});

//
// Bookmark Item View
//
var BookMarkItemView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#bookmark-item-template').text()),

  render: function(){

    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});

//
// Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'tag/:name': 'showTag'
  },

  initialize: function(){
    this.bookmarks = new Backbone.Collection([
      {
        title: 'Google',
        url: 'https://www.google.com',
        description: 'The best search engine in the world',
        tags: ['search', 'maps', 'gmail', 'news', 'drive', 'weather']
      },
      {
        title: 'Facebook',
        url: 'https://www.facebook.com',
        description: 'Connect and share with friends around the world',
        tags: ['friends', 'photos']
      }]);

      this.tagView = new TagView({el: '.app-container'});
      this.bookMarkView = new BookMarkView({el: '.js-bookmark-view', collection: this.bookmarks});
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
