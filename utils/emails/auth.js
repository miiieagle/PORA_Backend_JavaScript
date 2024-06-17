const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../../config/envConfig");

exports.signUpMsg = async (email) => {
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
            html: `<b> Hi </b> <br/>
                <p>
                We've received your mail
                </p>
                </br>
                <b>
                <p>Best regards,</p>
                <p>Resida Team</p>
                </b>
                `,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

exports.signUpOtp = async (email, OTP) => {
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
            subject: "OTP sent",
            html: `<b> Hi </b> <br/>
                <p>
                Here is the OTP sent to you to verify your email address ${OTP}
                </p>
                </br>
                <b>
                <p>Best regards,</p>
                <p>Resida Team</p>
                </b>
                `,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
