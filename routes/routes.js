module.exports = function(config){

  let module = {};

  //Handle the webhook subscription request from Facebook
  module._setupTokenCheck = function (app) {
    app.get('/webhook', function(request, response) {
        if (request.query['hub.mode'] === 'subscribe' &&
    		request.query['hub.verify_token'] === config.VERIFY_TOKEN) {
            console.log('Validated webhook');
            response.status(200).send(request.query['hub.challenge']);
        } else {
            console.error('Failed validation. Make sure the validation tokens match.');
            response.sendStatus(403);
        }
    });
  }

  module._setupHeartbeat = function(app) {
    app.get('/', function(request, response) {
      response.set('Content-Type', 'text/html');
      response.status(200).send('<iframe src="https://giphy.com/embed/a0h7sAqON67nO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/borat-great-success-a0h7sAqON67nO">via GIPHY</a></p>');
    })
  }

  return module;

}
