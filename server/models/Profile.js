const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  academicDetails: {
    cgpa: { type: Number },
    department: { type: String },
    year: { type: String }
  },
  skills: [String],
  interests: [String],
  recommendations: [
    {
      jobRole: String,
      matchPercentage: Number,
      missingSkills: [String]
    }
  ],
  placementReady: { type: Boolean, default: false }
});

module.exports = mongoose.model('Profile', ProfileSchema);