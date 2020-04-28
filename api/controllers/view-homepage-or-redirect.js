module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function () {
    var api_key = 'sails.custom.mailgunSecret';
    var domain = 'www.web-webinar.ru';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'lphp@mail.ru',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    if (this.req.me) {
      throw {redirect: '/welcome'};
    }

    return {};

  }


};
