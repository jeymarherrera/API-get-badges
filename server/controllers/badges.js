const models = require("../../database/models");
const { fileUpload } = require("../utils/uploadFiles");

const addBadge = async (req, res) => {
  try {
    const { body, userId } = req;
    let image = fileUpload(body.image, "/public");
    image = `${process.env.APP_BASE_URL}${image}`;

    const badge = await models.badges.create({
      name: body.name,
      image,
      knowledge: body.knowledge,
      speciality: body.speciality,
      criteria: body.criteria,
      skill: body.skill,
      platformEvent: body.platformEvent,
      generation: body.generation,
      companyUsersId: userId,
    });
    return res.status(201).send(badge);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getBadges = async (req, res) => {
  try {
    const badge = await models.badges.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        statusDelete: false,
      },
      include: [
        {
          model: models.companyUsers,
          as: 'userCompany',
          attributes: { exclude: ["emailsId", "createdAt", "updatedAt"] },
        },
      ],
    });
    return res.status(200).send(badge);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getBadgeById = async (req, res) => {
  try {
    const { badgeId } = req.params;
    const badge = await models.badges.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: badgeId,
        statusDelete: false,
      },
      include: [
        {
          model: models.companyUsers,
          as: 'userCompany',
          attributes: { exclude: ["createdAt", "updatedAt"] },
        }
      ],
    });

    if (!badge) return res.status(404).send("El badge no se encuentra");

    return res.status(200).send(badge);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const getBadgesByCreator = async (req, res) => {
  try {
    const userId = req.userId;
    const badge = await models.badges.findAll({
      attributes: { exclude: ["updatedAt"] },
      where: {
        companyUsersId: userId,
        statusDelete: false,
      },
      include: [
        {
          model: models.companyUsers,
          as: 'userCompany',
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    return res.status(200).send(badge);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Lo sentimos ha ocurrido un error en el servidor");
  }
};

const updateBadge = async (req, res) => {
  try {
    const { badgeId } = req.params;
    const userId = req.userId;
    const { body } = req;

    const badge = await models.badges.findOne({
      where: {
        id: badgeId,
        companyUsersId: userId,
        statusDelete: false,
      },
    });

    if (!badge) return res.status(404).send("El badge no se encuentra");

    let image = fileUpload(body.image, "/public");
    image = `http://localhost:5050${image}`;

    await badge.update({
      name: body.name,
      image,
      knowledge: body.knowledge,
      speciality: body.speciality,
      criteria: body.criteria,
      skill: body.skill,
      platformEvent: body.platformEvent,
      generation: body.generation,
    });

    return res.status(200).send({ badges: badge });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ha ocurrido un error");
  }
};

const deleteBadge = async (req, res) => {
  try {
    const { badgeId } = req.params;
    const userId = req.userId;

    const badge = await models.badges.findOne({
      where: {
        id: badgeId,
        companyUsersId: userId,
        statusDelete: false,
      },
    });

    if (!badge) return res.status(404).send("El badge no se encuentra");

    await badge.update({
      statusDelete: true,
    });

    return res.status(200).send("Se ha eliminado el badge");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
  }
};

module.exports = { addBadge, getBadges, getBadgeById, getBadgesByCreator, updateBadge, deleteBadge };
