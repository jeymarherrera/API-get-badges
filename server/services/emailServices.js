const config = require('../../config/config');
const transporter = config.TRANSPORTER;

async function sendTokenByEmail(email, token) {
    const message = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: 'Token de Autenticación',
        html: `<p>Para iniciar sesión, haga clic en el siguiente enlace o cópielo y péguelo en su navegador:</p><p><a href="${process.env.APP_BASE_URL}/verify?X-AUTH-TOKEN=${token}">${process.env.APP_BASE_URL}/verify?X-AUTH-TOKEN=${token}</a></p>`,
    };

    try {
        const info = await transporter.sendMail(message);
        console.log(`El mensaje fue enviado: ${info.messageId}`);
    } catch (error) {
        console.error(error);
        throw new Error('Error al enviar el correo electrónico');
    }
}

module.exports = { sendTokenByEmail };