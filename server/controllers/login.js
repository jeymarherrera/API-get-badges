const models = require("../../database/models");
const jwt = require("jsonwebtoken");
const { JWT } = require("../../config/config");
const emailService = require('../../server/services/emailServices');

const login = async (req, res) => {
  try {
    const { body } = req;

    const findEmail = await models.emails.findOne({ where: { email: body.email } });
    let findUser;

    if (findEmail) {
      findUser = await models.companyUsers.findOne({ where: { emailsId: findEmail.id } });

      if (!findUser) {
        findUser = await models.developerUsers.findOne({ where: { emailsId: findEmail.id } });
      }
    }

    if (!findUser) {
      return res.status(400).json({ message: 'Correo no encontrado' });
    }

    const token = jwt.sign({ userId: findUser.id, role: findEmail.rol }, JWT.SEED, { expiresIn: JWT.EXPIRES });

    emailService.sendTokenByEmail(findEmail.email, token);
    res.json({ message: 'Se ha enviado un enlace para iniciar sesión a su correo electrónico' });

  } catch (error) {
    console.error(error);
    res.status(500).send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const acceder = async (req, res) => {
  const role = req.role;
  if (role === 'Administrador') {
    return res.json({ message: 'Inicio de sesión exitoso como Administrador' });
  } else if (role === 'Developer') {
    return res.json({ message: 'Inicio de sesión exitoso como Developer' });
  } else if (role === 'Company') {
    return res.json({ message: 'Inicio de sesión exitoso como Company' });
  } else {
    return res.json({ message: 'Inicio de sesión exitoso' });
  }
};

module.exports = { login, acceder };