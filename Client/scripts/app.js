var users = {};
var friends = {};
var rooms = {'lobby': true};

$(document).ready(function(){

  var Message = Backbone.Model.extend({
    url: 'http://127.0.0.1:8080',
    urlRoot: 'http://127.0.0.1:8080'
  });

  var Messages = Backbone.Collection.extend({
    model: Message,
    url: 'http://127.0.0.1:8080',
    parse: function(response){
      return response;
    }
  });

  var MessageList = Backbone.View.extend({
    el: 'body',
    events: {'click button': 'submitMessage',
             'click .username': 'addFriend',
             'keypress .message': 'submitMessage'},
    addFriend: function(e) {
      var username = $(e.target).text();
      if(friends[username]){
        $(e.target).removeClass('friend');
        friends[username] = undefined;
      }else{
        $(e.target).addClass('friend');
        friends[username] = true;
      }
    },
    render: function(){
      var messages = new Messages();
      var that = this;
      var fetchFunction = function() {
        messages.fetch({
          //data: {limit: 50, order:'-createdAt'},
          success: function(messages){
            var template = _.template($('#receivedMessage').html(), {messages: messages.models});
            $(".messages").html(template);
          }
        });
      };
      fetchFunction();
      setInterval(fetchFunction, 1000); // milliseconds
    },
    submitMessage: function(e){
      if(e.type === 'click' || e.keyCode === 13){  // 13 is the ENTER key
        var message = {};
        var searchbar = window.location.search;
        message.username = searchbar.replace('?username=','');
        message.text = $('.message').val();
        message.roomname = $('.roomSelect').val();
        $(".message").val('');  // clear textbox
        var newMessage = new Message().save(message);
      }
    }
  });

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  var router = new Router();
  var messageList = new MessageList();

  router.on('route:home', function() {
    messageList.render();
  });

  Backbone.history.start();

});
