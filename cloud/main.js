
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('sendNewMessagePush', function(req, res) {
  // request has 2 parameters: params passed by the client and the authorized user
    var params = request.params;
    //var user = request.user;
    console.log(1);
    // extract out the channel to send
    //var action = params.action;
    var message = params.message;
    //var customData = params.customData;
    console.log(2);
    // use to custom tweak whatever payload you wish to send
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("channels", "global");

    console.log(3);

    Parse.Push.send({
  channels: ['global'],
  data: {
    alert: message,
    badge: 'increment',
    sound: 'default'
  }
}, { useMasterKey: true }).then(() => {
  console.log('Push ok');
}, (e) => {
  console.log('Push error', e);
});

    response.success('success');
});
