Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendNewMessagePush', function(req, res) {
  // request has 2 parameters: params passed by the client and the authorized user
    var params = req.params;
    //var user = request.user;

    var message = params.message;
    var channel = params.channel;
    //var customData = params.customData;

    Parse.Push.send({
      channels: [channel],
      data: {
        alert: message,
      }
    }, { useMasterKey: true }).then(() => {
      res.success('Sent message');
    }, (e) => {
      res.error("Push failed to send with error: " + e.message);
    });
});
