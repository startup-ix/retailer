var sharedEvents = require('./emitters.js');

function sendSMS(message)
{
  // Your accountSid and authToken from twilio.com/user/account
  var accountSid = "AC24fb80e2c5d50a36492442b25907540b";
  var authToken = "f80dc219dcd5796d673feea6c2fae3d4";
  var client = require('twilio')(accountSid, authToken);
  client.sms.messages.create({
    body: message,
    to: "+917769054754",
    //from: "+15005550006"
    from: "+16122559341"
  }, function(err, message) {
    process.stdout.write(err.message);
  });
}

sharedEvents.on("sendSMSMsg",function(message) {
  console.log("Received sendSMSMsg in twilio_sms.");
  sendSMS(message);
});
