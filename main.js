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

createTags: function(){
  this.tagArrays = this.collection.pluck('tags');
  this.tagArray = _.uniq(_.flatten(this.tagArrays));
  console.log(this.tagArray);
},

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
        tags: ['search', 'maps', 'gmail', 'news', 'drive', 'weather', 'photos']
      },
      {
        title: 'Facebook',
        url: 'https://www.facebook.com',
        description: 'Connect and share with friends around the world',
        tags: ['friends', 'photos', 'news']
      }]);

      this.tagView = new TagView({el: '.js-tag-view', collection: this.bookmarks});
      this.bookMarkView = new BookMarkView({el: '.js-bookmark-view', collection: this.bookmarks});

  },

  index: function(){
    console.log('index');
    this.bookMarkView.render();
    this.tagView.createTags();



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
