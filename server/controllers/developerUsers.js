const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const addDeveloperUser = async (req, res) => {
  try {
    const { body } = req;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const findEmail = await models.emails.findOne({ where: { email: body.email } });

    if (findEmail) {
      res.json({ message: 'Correo en uso!' });
    }
    else {

      const email = await models.emails.create({
        email: body.email,
        rol: body.rol,
      });

      const developerUser = await models.developerUsers.create({
        name: body.name,
        image,
        country: body.country,
        emailsId: email.id,
      });

      return res.status(201).send(developerUser);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const getDeveloperUser = async (req, res) => {
  try {
    const developerUsers = await models.developerUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
      include:
      {
        model: models.emails,
        as: 'emailsDev',
        attributes: ['email', 'rol'],
      },
    });
    return res.status(200).send(developerUsers);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const getDeveloperUserById = async (req, res) => {
  try {
    const { developerUserId } = req.params
    const developerUser = await models.developerUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: developerUserId,
        statusDelete: false,
      },
      include:
      {
        model: models.emails,
        as: 'emailsDev',
        attributes: ['email', 'rol'],
      },
    });

    return res.status(200).send(developerUser);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const updateDeveloperUsers = async (req, res) => {
  try {
    const userId = req.userId;
    const { body } = req;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const developerUser = await models.developerUsers.findOne({
      where: {
        id: userId,
        statusDelete: false,
      },
    });

    if (!developerUser)
      return res.status(404).send("Usuario no se encontró");

    const emails = await models.emails.findOne({
      where: {
        id: developerUser.emailsId,
      },
    });

    if (emails)
      await emails.update({
        email: body.email,
      });

    await developerUser.update({
      name: body.name,
      image,
      country: body.country,
    });
    return res.status(200).send({ developerUser: developerUser, emails: emails });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error interno en el servidor");
  }
};

const deleteDeveloperUser = async (req, res) => {
  try {
    const userId = req.userId;

    const developerUser = await models.developerUsers.findOne({
      where: {
        id: userId,
        statusDelete: false,
      },
      include: [
        {
          model: models.emails,
          as: 'emailsDev',
          attributes: ['id', 'email', 'rol', 'statusDelete'],
        },
      ],
    });

    if (!developerUser) {
      return res.status(404).send("Usuario no se encontró");
    }

    if (!developerUser.emailsDev) {
      return res.status(404).send("El correo electrónico no se encuentra");
    }

    await developerUser.emailsDev.update({
      statusDelete: true,
    });

    await developerUser.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado el desarrollador");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrió un error en el servidor");
  }
};

module.exports = {
  addDeveloperUser,
  getDeveloperUser,
  getDeveloperUserById,
  updateDeveloperUsers,
  deleteDeveloperUser,
};