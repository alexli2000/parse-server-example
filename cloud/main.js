Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendNewMessagePush', function(req, res) {
  // request has 2 parameters: params passed by the client and the authorized user
    var params = req.params;
    var userId = params.userId;
    var title = params.title;
    var message = params.body;
    var channel = params.channel;
    var pushType = params.type;

    var query = new Parse.Query(Parse.Installation);
    query.equalTo('channels', channel);
    query.notEqualTo('isSilenced', true);
    query.notEqualTo('user', req.user);
    Parse.Push.send({
      where: query,
      data: {
        alert: {
          title: title,
          body: message
        },
        type: pushType,
        objectId: channel,
        userId: userId
      }
    }, { useMasterKey: true }).then(() => {
      res.success('Sent message');
    }, (error) => {
      res.error("Push failed to send push with error: " + error.message);
    });
});

Parse.Cloud.define('addChannel', function(req, res) {
    var params = req.params;
    var channelId = params.channelId;
    var userId = params.userId;

    var user = new Parse.User();
    user.id = userId;

    var query = new Parse.Query(Parse.Installation);
    query.equalTo('user', user);

    query.find({ useMasterKey: true }).then(function(results) {
        console.log("Successfully retrieved " + results.length + " installations.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          object.addUnique("channels", channelId);
          object.save(null, {"useMasterKey":true});
        }
        res.success('Added channel to installations');
      }, function(error) {
        res.error("Error: " + error.code + " " + error.message);
      });
});
