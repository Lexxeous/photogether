"use strict";

// ––––––––––––––––––––––––––––––––––––––––––––––– REQUIRED PACKAGES ––––––––––––––––––––––––––––––––––––––––––––––– //

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// ––––––––––––––––––––––––––––––––––––––––––––––– DEFINE EXPRESS APP –––––––––––––––––––––––––––––––––––––––––––––– //

const app = express();
app.use(express.static(__dirname + "/public")); // set default file path for public resources (images, stylesheets, etc...)

// ––––––––––––––––––––––––––––––––––––––––––––– MIDDLEWARE AND ENGINES –––––––––––––––––––––––––––––––––––––––––––– //

// Declare view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ––––––––––––––––––––––––––––––––––––––––––––––– HANDLE GET REQUESTS ––––––––––––––––––––––––––––––––––––––––––––– //

app.get('/contact', (req, res) => {
  res.render('contact', {layout: false});
});

app.get('/', (req, res) => {
  res.render('index', {layout: false});
});

app.get('/login', (req, res) => {
  res.render('login', {layout: false});
});

app.get('/explore', (req, res) => {
  res.render('explore', {layout: false});
});

app.get('/signup', (req, res) => {
  res.render('signup', {layout: false});
});

app.get('/recover_account', (req, res) => {
  res.render('recover_account', {layout: false});
});

app.get('/*', (req, res) => {
  res.render('404', {layout: false});
});

// –––––––––––––––––––––––––––––––––––––––––––––– HANDLE POST REQUESTS ––––––––––––––––––––––––––––––––––––––––––––– //

// Handle the POST request sent to the "/sendEmail" route
app.post('/send_contact_email', (req, res) => {
  const contact_mailer = require("./public/js/contact_mailer.js")(req.body)

  contact_mailer.transporter.sendMail(contact_mailer.mail_options, (err, info) => {
    if (err) {
      console.log(err);
      res.render('contact', {msg: "Contact request failed to send. :(", layout: false});
      return
    }
    else{
      res.render('contact', {msg: "Contact request sent! :)", layout: false});
      return
    }
  });
});
  
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  console.log('')
});