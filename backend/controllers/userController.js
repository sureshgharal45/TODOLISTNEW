const userModel = require("../models/userModel");

//create a new task or record
exports.createRecord = async (req, res) => {
  const { name, email, description, duedate } = req.body;
  if (!name || !description || !email || !duedate) {
    return res
      .status(200)
      .send({ message: "Some fields are missing", success: false });
  }

  const user = await userModel.create({
    name,
    description,
    email,
    duedate,
  });

  res.status(200).json({
    user,
    success: true,
  });
};

//get records by due dates
exports.getRecordsByDue = async (req, res) => {
  try {
    const selectedDate = req.query.date;

    let startDate = new Date();
    let endDate = new Date();

    if (selectedDate === "today") {
      startDate = new Date(startDate.toISOString().split("T")[0]);
      endDate.setDate(endDate.getDate() + 1);
      endDate = new Date(endDate.toISOString().split("T")[0]);
    } else if (selectedDate === "tomorrow") {
      startDate.setDate(startDate.getDate() + 1);
      startDate = new Date(startDate.toISOString().split("T")[0]);
      endDate.setDate(endDate.getDate() + 2);
      endDate = new Date(endDate.toISOString().split("T")[0]);
    }

    const records = await userModel.find({
      duedate: {
        $gt: startDate.toISOString().split("T")[0],
        $lte: endDate.toISOString().split("T")[0],
      },
    });

    res.status(200).json({
      records,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
