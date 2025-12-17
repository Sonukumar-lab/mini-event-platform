const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { joinEvent, leaveEvent } = require("../controllers/rsvpController");

router.post("/join/:id", auth, joinEvent);
router.post("/leave/:id", auth, leaveEvent);

module.exports = router;
