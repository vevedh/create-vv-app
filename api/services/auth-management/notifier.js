import _cloneDeep from 'lodash';

export const sanitizeUserForClient = (user) => {
  user = _cloneDeep(user);

  delete user.password;
  delete user.verifyExpires;
  delete user.verifyToken;
  delete user.verifyShortToken;
  delete user.verifyChanges;
  delete user.resetExpires;
  delete user.resetToken;
  delete user.resetShortToken;

  return user;
};

export const authNotifier = (app) => {
  const getLink = (type, hash) => {
    return (
      `http://localhost:${process.env.LISTEN_BACKEND_PORT}/login?type=` +
      type +
      '&token=' +
      hash
    );
  };

  const sendEmail = async (email) => {
    try {
      const result = await app.service('mailer').create(email);
      return Object(result).hasOwnProperty('accepted');
    } catch (error) {
      return false;
    }
  };

  return async (type, user, notifierOptions = {}) => {
    if (type === 'resendVerifySignup') {
      return await sendEmail({
        //from: process.env.mail_smtp,
        to: user.email,
        subject: 'Please confirm your e-mail address',
        text: 'Click here: ' + getLink('verify', user.verifyToken),
      });
    } else if (type === 'verifySignup') {
      return await sendEmail({
        //from: process.env.mail_smtp,
        to: user.email,
        subject: 'E-Mail address verified',
        text: 'Registration process complete. Thanks for joining us!',
      });
    } else if (type === 'sendResetPwd') {
      const tokenLink = getLink('reset', user.resetToken);

      return await sendEmail({
        to: user.email,
        subject: 'Send Reset Password',
        html: tokenLink,
      });
    } else if (type === 'resetPwd') {
      console.log('Send reset password :', tokenLink);
      const tokenLink = getLink('reset', user.resetToken);
      return await sendEmail({
        to: user.email,
        subject: 'Reset Password',
        html: tokenLink,
      });
    } else if (type === 'passwordChange') {
      return await sendEmail({});
    } else if (type === 'identityChange') {
      const tokenLink = getLink('verifyChanges', user.verifyToken);
      return await sendEmail({
        to: user.email,
        subject: 'Change your identity',
        html: tokenLink,
      });
    }
  };
};
