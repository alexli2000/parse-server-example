Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendNewMessagePush', function(req, res) {
  // request has 2 parameters: params passed by the client and the authorized user
    var params = req.params;
    //var user = request.user;
    console.log(1);
    // extract out the channel to send
    //var action = params.action;
    var message = params.message;
    //var customData = params.customData;

    Parse.Push.send({
      channels: ['global'],
      data: {
        alert: 'test-message'
      }
    }, { useMasterKey: true }).then(() => {
      res.success('Sent message');
    }, (e) => {
      res.error("Push failed to send with error: " + e.message);
    });
});
