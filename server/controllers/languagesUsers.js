const models = require("../../database/models");

const addLanguage = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.userId;
    const language = await models.languagesUsers.create({
      language: body.language,
      level: body.level,
      developerUsersId: userId,
    });

    return res.status(201).send(language);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getLanguages = async (req, res) => {
  try {
    const language = await models.languagesUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
    });
    return res.status(200).send(language);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getLanguageById = async (req, res) => {
  try {
    const { languageId } = req.params;
    const language = await models.languagesUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: languageId,
        statusDelete: false,
      },
    });

    if (!language) return res.status(404).send("El idioma no se encontró");

    return res.status(200).send(language);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getLanguagesByCreator = async (req, res) => {
  try {
    const userId = req.userId;
    const language = await models.languagesUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        developerUsersId: userId,
        statusDelete: false,
      },
    });
    return res.status(200).send(language);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const updateLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;
    const userId = req.userId;
    const { body } = req;

    const language = await models.languagesUsers.findOne({
      where: {
        id: languageId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!language) return res.status(404).send("El idioma no se encontró");

    await language.update({
      language: body.language,
      level: body.level,
    });

    return res.status(200).send({ language: language });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;
    const userId = req.userId;

    const language = await models.languagesUsers.findOne({
      where: {
        id: languageId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!language) return res.status(404).send("El idioma no se encuentra");

    await language.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado el idioma");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};


module.exports = { addLanguage, getLanguages, getLanguageById, getLanguagesByCreator, updateLanguage, deleteLanguage };