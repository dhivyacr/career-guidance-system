const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// 1. Mock Career Database
// This acts as the "Benchmark" the system uses to compare student skills.
const careerData = [
  { jobRole: "Frontend Developer", requiredSkills: ["React", "JavaScript", "CSS", "HTML"] },
  { jobRole: "Backend Developer", requiredSkills: ["Node.js", "Express", "MongoDB", "JavaScript"] },
  { jobRole: "Data Scientist", requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"] },
  { jobRole: "Cloud Engineer", requiredSkills: ["AWS", "Docker", "Kubernetes", "Linux"] }
];

// 2. CREATE OR UPDATE PROFILE + GENERATE RECOMMENDATIONS
// This route calculates the match percentage and identifies missing skills.
router.post('/', async (req, res) => {
  try {
    const { userId, academicDetails, skills, interests } = req.body;

    // Logic: Calculate Recommendations and Skill Gaps
    const recommendations = careerData.map(career => {
      // Find skills the student has that match this career
      const matchedSkills = career.requiredSkills.filter(skill => skills.includes(skill));
      
      // Find skills the student is missing
      const missingSkills = career.requiredSkills.filter(skill => !skills.includes(skill));
      
      // Calculate match percentage
      const matchPercentage = (matchedSkills.length / career.requiredSkills.length) * 100;

      return {
        jobRole: career.jobRole,
        matchPercentage,
        missingSkills
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage); // Rank by best match

    // Save/Update Profile with Results in MongoDB
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          academicDetails, 
          skills, 
          interests,
          recommendations, 
          // If the top match is >= 75%, mark as Placement Ready for the Advisor
          placementReady: recommendations[0]?.matchPercentage >= 75 
        } 
      },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. GET PROFILE BY USER ID
// Used by the Student Dashboard to display their recommendations.
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    if (!profile) return res.status(404).json("Profile not found");
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. GET ALL PROFILES
// Used by the Placement Advisor to monitor all students.
router.get('/admin/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'username email');
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;