const models = require("../../database/models");

const addStudy = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.userId;
    const study = await models.studiesUsers.create({
      study: body.study,
      dateStart: body.dateStart,
      dateFinish: body.dateFinish,
      developerUsersId: userId,
    });

    return res.status(201).send(study);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getStudies = async (req, res) => {
  try {
    const study = await models.studiesUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
    });
    return res.status(200).send(study);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getStudyById = async (req, res) => {
  try {
    const { studyId } = req.params;
    const study = await models.studiesUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: studyId,
        statusDelete: false,
      },
    });

    if (!study) return res.status(404).send("El estudio no se encontró");

    return res.status(200).send(study);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getStudiesByCreator = async (req, res) => {
  try {
    const userId = req.userId;
    const study = await models.studiesUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        developerUsersId: userId,
        statusDelete: false,
      },
    });
    return res.status(200).send(study);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const updateStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const userId = req.userId;
    const { body } = req;
    console.log(userId)
    const study = await models.studiesUsers.findOne({
      where: {
        id: studyId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });
    console.log(study)
    if (!study) return res.status(404).send("El estudio no se encontró");

    await study.update({
      study: body.study,
      dateStart: body.dateStart,
      dateFinish: body.dateFinish,
    });

    return res.status(200).send({ study: study });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
};

const deleteStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const userId = req.userId;

    const study = await models.studiesUsers.findOne({
      where: {
        id: studyId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!study) return res.status(404).send("El estudio no se encuentra");

    await study.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado el estudio");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};


module.exports = { addStudy, getStudies, getStudyById, getStudiesByCreator, updateStudy, deleteStudy };