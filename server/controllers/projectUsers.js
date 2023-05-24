const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const addProject = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.userId;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const project = await models.projectUsers.create({
      project: body.project,
      image,
      url: body.url,
      developerUsersId: userId,
    });

    return res.status(201).send(project);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getProjects = async (req, res) => {
  try {
    const project = await models.projectUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
    });
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await models.projectUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: projectId,
        statusDelete: false,
      },
    });

    if (!project) return res.status(404).send("El proyecto no se encontró");

    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getProjectsByCreator = async (req, res) => {
  try {
    const userId = req.userId;
    const project = await models.projectUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        developerUsersId: userId,
        statusDelete: false,
      },
    });
    return res.status(200).send(project);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId;
    const { body } = req;

    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;
   
    const project = await models.projectUsers.findOne({
      where: {
        id: projectId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!project) return res.status(404).send("El proyecto no se encontró");

    await project.update({
      project: body.project,
      image,
      url: body.url,
    });

    return res.status(200).send({ project: project });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId;

    const project = await models.projectUsers.findOne({
      where: {
        id: projectId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!project) return res.status(404).send("El proyecto no se encuentra");

    await project.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado el proyecto");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};


module.exports = { addProject, getProjects, getProjectById, getProjectsByCreator, updateProject, deleteProject };