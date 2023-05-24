const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const addCompanyUser = async (req, res) => {
  try {
    const { body } = req;

    let logo = fileUpload(body.logo, "/public");
    logo = `${process.env.APP_BASE_URL}${logo}`;

    const findEmail = await models.emails.findOne({ where: { email: body.email } });

    if (findEmail) {
      res.json({ message: 'Correo en uso!' });
    }
    else {

      const email = await models.emails.create({
        email: body.email,
        rol: body.rol,
      });

      const companyUser = await models.companyUsers.create({
        name: body.name,
        logo,
        type: body.type,
        emailsId: email.id,
      });

      return res.status(201).send(companyUser);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const getCompanyUser = async (req, res) => {
  try {
    const companyUsers = await models.companyUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
    });
    return res.status(200).send(companyUsers);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const getCompanyUserById = async (req, res) => {
  try {
    const { companyUserId } = req.params
    const companyUser = await models.companyUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: companyUserId,
        statusDelete: false,
      },
      include:
      {
        model: models.emails,
        as: 'emailsCompany',
        attributes: ['email', 'rol'],
      },
    });

    return res.status(200).send(companyUser);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const updateCompanyUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const { body } = req;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const companyUser = await models.companyUsers.findOne({
      where: {
        id: userId,
        statusDelete: false,
      },
    });

    if (!companyUser)
      return res.status(404).send("La compañia no se encontró");

    const emails = await models.emails.findOne({
      where: {
        id: companyUser.emailsId,
      },
    });

    if (emails)
      await emails.update({
        email: body.email,
      });

    await companyUser.update({
      name: body.name,
      logo: body.logo,
      type: body.type,
    });
    return res.status(200).send({ companyUser: companyUser, emails: emails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const deleteCompanyUser = async (req, res) => {
  try {

    const userId = req.userId;

    const companyUser = await models.companyUsers.findOne({
      where: {
        id: userId,
        statusDelete: false,
      },
      include: [
        {
          model: models.emails,
          as: 'emailsCompany',
          attributes: ['id', 'email', 'rol', 'statusDelete'],
        },
      ],
    });

    if (!companyUser) {
      return res.status(404).send("La compañía no se encontró");
    }

    if (!companyUser.emailsCompany) {
      return res.status(404).send("El correo electrónico de la compañía no se encontró");
    }

    await companyUser.emailsCompany.update({
      statusDelete: true,
    });

    await companyUser.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado la compañia");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};

module.exports = {
  addCompanyUser,
  getCompanyUser,
  getCompanyUserById,
  updateCompanyUsers,
  deleteCompanyUser,
};
