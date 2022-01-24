require('../models/connectDB')
const Branch = require('../models/Branch')

exports.branches = async (req, res) => {
  try {
    const branches = await Branch.find()
    res.json(branches);
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

exports.addBranch = async (req, res) => {
  const newBranch = new Branch({
    name: req.body.name,
    rooms: req.body.rooms,
    cancelBranch: req.body.cancelBranch,
    editBranch: req.body.editBranch,
    location: req.body.location

  });

  try {
    await newBranch.save();
    res.json(newBranch);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

exports.deleteBranch = async (req, res) => {
  const branchId = req.params.id;
  try {
    const data = await Branch.deleteOne({ _id: branchId });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}


exports.editBranch = async (req, res) => {
  const branchId = req.params.id;
  const newBranch = {
    name: req.body.name,
    rooms: req.body.rooms,
    location: req.body.location
  };
  try {
    const updatebranch = await Branch.findByIdAndUpdate({ _id: branchId }, newBranch);
    res.json(updatebranch);
  } catch (error) {
    res.status(400).json({ message: error })
  }
}