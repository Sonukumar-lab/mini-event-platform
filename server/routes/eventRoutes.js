const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

router.post("/", auth, upload.single("image"), createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", auth, upload.single("image"), updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
