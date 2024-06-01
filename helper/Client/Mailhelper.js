const mailer = require('nodemailer')

module.exports.sendMail = async (option) =>{
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user:  process.env.SMTP_USER,
            pass:  process.env.SMTP_PASS,
        },
      });

    const info =  {
        from: 'timetabte123@gmail.com',
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.message, // plain text body
        
    }
    
    await transporter.sendMail(info)
}

