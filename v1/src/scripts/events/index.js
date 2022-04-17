const mailer = require("nodemailer");
const eventEmitter = require("./eventEmitter.js");

module.exports = () => {
  eventEmitter.on("send_email", async (mailInfo) => {
    let transporter = mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }});
    let info = await transporter.sendMail(mailInfo);
  });
};
