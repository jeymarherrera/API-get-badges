const { Router } = require("express");

const { login, acceder } = require("../controllers/login");
const { verifyToken } = require("../middlewares/auth");

const {
  addBadge,
  getBadgeById,
  getBadges,
  getBadgesByCreator,
  updateBadge,
  deleteBadge,
} = require("../controllers/badges");

const {
  addCompanyUser,
  getCompanyUser,
  getCompanyUserById,
  updateCompanyUsers,
  deleteCompanyUser,
} = require("../controllers/companyUsers");

const {
  addDeveloperUser,
  getDeveloperUser,
  getDeveloperUserById,
  updateDeveloperUsers,
  deleteDeveloperUser,
} = require("../controllers/developerUsers");

const {
  addExperience,
  getExperienceById,
  getExperiences,
  getExperiencesByCreator,
  updateExperience,
  deleteExperience,
} = require("../controllers/experiences");

const {
  addLanguage,
  getLanguageById,
  getLanguages,
  getLanguagesByCreator,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languagesUsers");

const {
  addProject,
  getProjectById,
  getProjects,
  getProjectsByCreator,
  updateProject,
  deleteProject,
} = require("../controllers/projectUsers");

const {
  addSocialMedia,
  getSocialMediaById,
  getSocialMedia,
  getSocialMediaByCreator,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../controllers/socialMediaUsers");

const {
  addStudy,
  getStudyById,
  getStudies,
  getStudiesByCreator,
  updateStudy,
  deleteStudy,
} = require("../controllers/studiesUsers");

const router = Router();

router.post("/login", login);
router.get("/verify", verifyToken, acceder);

router.post("/badge", verifyToken, addBadge);
router.get("/badges", getBadges);
router.get("/myBadges", verifyToken, getBadgesByCreator);
router.get("/badge/:badgeId", getBadgeById);
router.put("/updateBadge/:badgeId", verifyToken, updateBadge);
router.delete("/deleteBadge/:badgeId", verifyToken, deleteBadge);

router.post("/company", addCompanyUser);
router.get("/companies", getCompanyUser);
router.get("/company/:companyUserId", getCompanyUserById);
router.put("/updateCompanyProfile", verifyToken, updateCompanyUsers);
router.delete("/deleteCompanyProfile", verifyToken, deleteCompanyUser);

router.post("/developer", addDeveloperUser);
router.get("/developers", getDeveloperUser);
router.get("/developer/:developerUserId", getDeveloperUserById);
router.put("/updateDeveloperProfile", verifyToken, updateDeveloperUsers);
router.delete("/deleteDeveloperProfile", verifyToken, deleteDeveloperUser);

router.post("/experience", verifyToken, addExperience);
router.get("/experiences", getExperiences);
router.get("/myExperiences", verifyToken, getExperiencesByCreator);
router.get("/experience/:experienceId", getExperienceById);
router.put("/updateExperience/:experienceId", verifyToken, updateExperience);
router.delete("/deleteExperience/:experienceId", verifyToken, deleteExperience);

router.post("/language", verifyToken, addLanguage);
router.get("/languages", getLanguages);
router.get("/myLanguages", verifyToken, getLanguagesByCreator);
router.get("/language/:languageId", getLanguageById);
router.put("/updateLanguage/:languageId", verifyToken, updateLanguage);
router.delete("/deleteLanguage/:languageId", verifyToken, deleteLanguage);

router.post("/project", verifyToken, addProject);
router.get("/projects", getProjects);
router.get("/myProjects", verifyToken, getProjectsByCreator);
router.get("/project/:projectId", getProjectById);
router.put("/updateProject/:projectId", verifyToken, updateProject);
router.delete("/deleteProject/:projectId", verifyToken, deleteProject);

router.post("/socialMedia", verifyToken, addSocialMedia);
router.get("/socialMedia", getSocialMedia);
router.get("/mySocialMedia", verifyToken, getSocialMediaByCreator);
router.get("/socialMedia/:socialMediaId", getSocialMediaById);
router.put("/updateSocialMedia/:socialMediaId", verifyToken, updateSocialMedia);
router.delete("/deleteSocialMedia/:socialMediaId", verifyToken, deleteSocialMedia);

router.post("/study", verifyToken, addStudy);
router.get("/studies", getStudies);
router.get("/myStudies", verifyToken, getStudiesByCreator);
router.get("/study/:studyId", getStudyById);
router.put("/updateStudy/:studyId", verifyToken, updateStudy);
router.delete("/deleteStudy/:studyId", verifyToken, deleteStudy);

module.exports = { router };
