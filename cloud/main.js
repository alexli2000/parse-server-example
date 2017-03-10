Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendNewMessagePush', function(req, res) {
  // request has 2 parameters: params passed by the client and the authorized user
    var params = req.params;
    //var user = request.user;
    var title = params.title;
    var message = params.message;
    var channel = params.channel;
    var pushType = params.type;

    var query = new Parse.Query(Parse.Installation);
    query.equalTo('channels', channel);
    query.notEqualTo('isSilenced', true);
    
    Parse.Push.send({
      where: query,
      data: {
        alert: {
          title: title,
          body: message,
          type: pushType,
          objectId: channel
        }
      }
    }, { useMasterKey: true }).then(() => {
      res.success('Sent message');
    }, (e) => {
      res.error("Push failed to send with error: " + e.message);
    });
});
