const models = require("../../database/models");

const addSocialMedia = async (req, res) => {
  try {
    const { body } = req;
    const userId = req.userId;
    const socialMedia = await models.socialmediaUsers.create({
      socialMedia: body.socialMedia,
      url: body.url,
      developerUsersId: userId,
    });

    return res.status(201).send(socialMedia);

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getSocialMedia = async (req, res) => {
  try {
    const socialMedia = await models.socialmediaUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
    });
    return res.status(200).send(socialMedia);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getSocialMediaById = async (req, res) => {
  try {
    const { socialMediaId } = req.params;
    const socialMedia = await models.socialmediaUsers.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: socialMediaId,
        statusDelete: false,
      },
    });

    if (!socialMedia) return res.status(404).send("La red social no se encontró");

    return res.status(200).send(socialMedia);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getSocialMediaByCreator = async (req, res) => {
  try {
    const userId = req.userId;
    const socialMedia = await models.socialmediaUsers.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        developerUsersId: userId,
        statusDelete: false,
      },
    });
    return res.status(200).send(socialMedia);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const updateSocialMedia = async (req, res) => {
  try {
    const { socialMediaId } = req.params;
    const userId = req.userId;
    const { body } = req;

    const socialMedia = await models.socialmediaUsers.findOne({
      where: {
        id: socialMediaId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!socialMedia) return res.status(404).send("La red social no se encontró");

    await socialMedia.update({
      socialMedia: body.socialMedia,
      url: body.url
    });

    return res.status(200).send({ socialMedia: socialMedia });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
};

const deleteSocialMedia = async (req, res) => {
  try {
    const { socialMediaId } = req.params;
    const userId = req.userId;

    const socialMedia = await models.socialmediaUsers.findOne({
      where: {
        id: socialMediaId,
        developerUsersId: userId,
        statusDelete: false,
      },
    });

    if (!socialMedia) return res.status(404).send("La red social no se encuentra");

    await socialMedia.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado la red social");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};


module.exports = { addSocialMedia, getSocialMedia, getSocialMediaById, getSocialMediaByCreator, updateSocialMedia, deleteSocialMedia };