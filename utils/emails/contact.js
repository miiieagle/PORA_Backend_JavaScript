const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE} = require("../../config/envConfig")


exports.contactUsMsg = async (email, first_name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                user: USER,
                pass: PASSMAILER,
            },
        });

        await transporter.sendMail({
            from: USER,
            to: email,
            subject: "Thanks for contacting us",
            html: `<b> Hi ${first_name}, </b><br>
            <p>
                We received your mail.........
            </p>
            <br>
            <b>
                <p>Best regards,</p>
                <p>RESIDA Team</p>
            </b>`,
        });

        console.log("Email sent successfully");
    } 
    catch (error) {
        console.log(error, "Email not sent");
    }
};
