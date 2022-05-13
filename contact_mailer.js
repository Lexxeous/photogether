module.exports = function(contact_body) {
  const nodemailer = require('nodemailer'); // module for handling emails
  const dotenv = require('dotenv'); // set up config for ".env" file
  dotenv.config();

  const html_body = `
    <h3>You have a new contact request from Photogether!</h3>
    <h4>Contact Details:</h4>
    <ul>  
      <li>First Name: ${contact_body.f_name}</li>
      <li>Last Name: ${contact_body.l_name}</li>
      <li>Email Address: ${contact_body.email}</li>
      <li>Phone #: ${contact_body.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${contact_body.message}</p>`;

    const auth_env = {
      user: process.env.CONTACT_EMAIL_USERNAME,
      pass: process.env.CONTACT_EMAIL_PASSWORD
    }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // can use EITHER {service: "gmail"} OR {host: "smtp.google.com"}
    port: 587, // use the TLS port
    secure: false, // true for 465 (SSL), false for other ports
    auth: auth_env,
    tls:{
      rejectUnauthorized: false // allow unauthorized TLS connections
    }
  });

  // Setup email data object
  let mail_options = {
    from: '"Photogether" <photogether.hire@gmail.com>',
    to: "agibson@gibsonusa.net", // comma separated list of receivers
    subject: 'Photographer and Videographer Platform Contact Request',
    html: html_body
  };

  return {
    transporter: transporter,
    mail_options: mail_options
  }
};