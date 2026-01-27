const nodemailer = require('nodemailer');

// Create transporter object with SMTP server details
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmadhashmi1304@gmail.com', // your Gmail address
    pass: 'eohs zoxb roui ncfq'           // your Gmail password or app-specific password
  }
});

// Email options
let mailOptions = {
  from: 'ahmadhashmi1304@gmail.com',
  to: 'bindharshit5173945@gmail.com',
  subject: 'Hello from Nodemailer By Abdullah ',
  text: 'This is a test email sent using Nodemailer!'
};

// Send the email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
