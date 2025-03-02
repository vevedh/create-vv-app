import { Mailer } from './mailer.class.js';
import { disallow } from 'feathers-hooks-common';
import nodemailer from 'nodemailer';
// see https://github.com/feathersjs-ecosystem/feathers-mailer

export const mailer = async (app) => {
  //const account = await nodemailer.createTestAccount(); // internet required

  //console.log('MAIL  SMTP PASSWORD :', process.env);

  //console.log('MAIL  TEST ACCOUNT :', account);

  const transporter = {
    host: process.env.mail_url,
    port: Number(process.env.mail_port),
    secure: process.env.mail_secure === 'true', // 487 only
    requireTLS: process.env.mail_tls === 'true',
    auth: {
      user: process.env.mail_smtp, // generated ethereal user
      pass: process.env.mail_secret, // generated ethereal password
    },
    /*tls: {
      ciphers: 'SSLv3',
    },*/
  };
  console.log('Transporter :', transporter);

  // Initialize our service with any options it requires

  app.use('mailer', new Mailer(transporter, { from: process.env.mail_smtp }));

  /*
  const result = await app.service('mailer').create({
    from: process.env.mail_smtp,
    to: 'vevedh@gmail.com',
    subject: 'test2',
    text: 'test2',
    html: 'test2',
  });

  console.log('test mail send', result);*/

  const sendEmail = async (email) => {
    try {
      const result = await app.service('mailer').create(email);
      return Object(result).hasOwnProperty('accepted');
      // app.services['mailer'].create(email);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Get our initialized service so that we can register hooks
  app.service('mailer').hooks({
    before: {
      all: [disallow('external')],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },

    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
  });

  app.service('mailer').hooks({
    after: {
      create: (context) => {
        console.log(nodemailer.getTestMessageUrl(context.result));
      },
    },
  });
};
