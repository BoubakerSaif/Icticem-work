const VisitModal = require("../models/Visit");
const mongoose = require("mongoose");

exports.createVisit = async (req, res) => {
  const { title, description, imageUrl } = req.body;

  const { id } = req.user;

  try {
    const newVisit = await VisitModal.create({
      title,
      description,
      imageUrl,
      user: id,
    });

    res.status(200).json(newVisit);
  } catch (error) {
    res.status(404).json({ message: "Something wrong" });
  }
};

exports.getVisits = async (req, res) => {
  try {
    const visits = await VisitModal.find();
    res.status(200).json(visits);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
exports.getVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const Visit = await VisitModal.findById(id);
    res.status(200).json(Visit);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};

exports.deleteVisit = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No visit exist with id: ${id}` });
    }
    const deletedVisit = await VisitModal.findByIdAndDelete(id);
    res.json(deletedVisit);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
exports.updateVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const UpdatedVisit = await VisitModal.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    res.json(UpdatedVisit);
  } catch (error) {
    res.status(404).json({ message: "Something  wrong" });
  }
};
