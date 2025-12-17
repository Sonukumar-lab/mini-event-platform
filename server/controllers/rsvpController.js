const Event = require("../models/Event");

/* ===================== JOIN EVENT ===================== */
exports.joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,

        // creator cannot join own event
        createdBy: { $ne: userId },

        // user not already joined
        "attendees.user": { $ne: userId },

        // capacity check (atomic)
        $expr: {
          $lt: [{ $size: "$attendees" }, "$capacity"]
        }
      },
      {
        $push: {
          attendees: {
            user: userId,
            phone
          }
        }
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message:
          "Unable to join (Event full, already joined, or invalid event)"
      });
    }

    res.json(event);
  } catch (err) {
    console.error("JOIN EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== LEAVE EVENT ===================== */
exports.leaveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          attendees: { user: req.user.id }
        }
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error("LEAVE EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
