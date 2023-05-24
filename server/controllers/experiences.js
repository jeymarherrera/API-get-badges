const models = require("../../database/models");

const addExperience = async (req, res) => {
    try {
        const { body } = req;
        const userId = req.userId;
        const experience = await models.experiences.create({
            experience: body.experience,
            dateStart: body.dateStart,
            dateFinish: body.dateFinish,
            developerUsersId: userId,
        });

        return res.status(201).send(experience);

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send("Lo sentimos ha ocurrido un error en el servidor");
    }
};

const getExperiences = async (req, res) => {
    try {
      const experience = await models.experiences.findAll({
        attributes: { exclude: ["updatedAt"] },
        where: {
          statusDelete: false,
        },
      });
      return res.status(200).send(experience);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
  };
  
  const getExperienceById = async (req, res) => {
    try {
      const { experienceId } = req.params;
      const experience = await models.experiences.findOne({
        attributes: { exclude: ["updatedAt"] },
        where: {
          id: experienceId,
          statusDelete: false,
        },
      });
  
      if (!experience) return res.status(404).send("La experiencia no se encontró");
  
      return res.status(200).send(experience);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
  };
  
  const getExperiencesByCreator = async (req, res) => {
    try {
      const userId = req.userId;
      const experience = await models.experiences.findAll({
        attributes: { exclude: ["updatedAt"] },
        where: {
          developerUsersId: userId,
          statusDelete: false,
        },
      });
      return res.status(200).send(experience);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Lo sentimos ha ocurrido un error en el servidor");
    }
  };
  
  const updateExperience = async (req, res) => {
    try {
      const { experienceId } = req.params;
      const userId = req.userId;
      const { body } = req;
  
      const experience = await models.experiences.findOne({
        where: {
          id: experienceId,
          developerUsersId: userId,
          statusDelete: false,
        },
      });
  
      if (!experience) return res.status(404).send("La experience no se encontró");
  
      await experience.update({
        experience: body.experience,
        dateStart: body.dateStart,
        dateFinish: body.dateFinish,
      });
  
      return res.status(200).send({ experience: experience });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lo sentimos ha ocurrido un error");
    }
  };
  
  const deleteExperience = async (req, res) => {
    try {
      const { experienceId } = req.params;
      const userId = req.userId;
  
      const experience = await models.experiences.findOne({
        where: {
          id: experienceId,
          developerUsersId: userId,
          statusDelete: false,
        },
      });
  
      if (!experience) return res.status(404).send("La experiencia no se encuentra");
  
      await experience.update({
        statusDelete: true,
      });
  
      return res.status(200).send("Se ha eliminado la experiencia");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lo sentimos ocurrio un error en el servidor");
    }
  };


module.exports = { addExperience, getExperiences, getExperienceById, getExperiencesByCreator, updateExperience, deleteExperience };