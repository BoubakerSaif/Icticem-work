const express = require("express");
const router = express.Router();

const visitController = require("../controllers/visit.controller");
const { AuthMiddleware } = require("../middelware/AuthMiddleware");

router.post("/", AuthMiddleware, visitController.createVisit);
router.get("/", visitController.getVisits);
router.get("/:id", visitController.getVisit);
router.delete("/:id", AuthMiddleware, visitController.deleteVisit);
router.put("/:id", AuthMiddleware, visitController.updateVisit);

module.exports = router;
