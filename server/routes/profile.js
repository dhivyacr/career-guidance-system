const router = require('express').Router();
const Profile = require('../models/Profile');

// Mock Career Database - In a real app, you might move this to a MongoDB Collection
const careerData = [
  { jobRole: "Frontend Developer", requiredSkills: ["React", "JavaScript", "CSS", "HTML"] },
  { jobRole: "Backend Developer", requiredSkills: ["Node.js", "Express", "MongoDB", "JavaScript"] },
  { jobRole: "Data Scientist", requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"] },
  { jobRole: "Cloud Engineer", requiredSkills: ["AWS", "Docker", "Kubernetes", "Linux"] }
];

// CREATE OR UPDATE PROFILE + GENERATE RECOMMENDATIONS
router.post('/', async (req, res) => {
  try {
    const { userId, academicDetails, skills, interests } = req.body;

    // 1. Calculate Recommendations and Skill Gaps
    const recommendations = careerData.map(career => {
      const matchedSkills = career.requiredSkills.filter(skill => skills.includes(skill));
      const missingSkills = career.requiredSkills.filter(skill => !skills.includes(skill));
      const matchPercentage = (matchedSkills.length / career.requiredSkills.length) * 100;

      return {
        jobRole: career.jobRole,
        matchPercentage,
        missingSkills
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by highest match

    // 2. Save/Update Profile with Results
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          academicDetails, 
          skills, 
          interests,
          recommendations, // Store calculated results
          placementReady: recommendations[0]?.matchPercentage >= 75 // Example logic
        } 
      },
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PROFILE BY USER ID
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;