const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

const careerData = [
  { jobRole: "Frontend Developer", requiredSkills: ["React", "JavaScript", "CSS", "HTML"] },
  { jobRole: "Backend Developer", requiredSkills: ["Node.js", "Express", "MongoDB", "JavaScript"] },
  { jobRole: "Data Scientist", requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL"] },
  { jobRole: "Cloud Engineer", requiredSkills: ["AWS", "Docker", "Kubernetes", "Linux"] }
];

router.post('/', async (req, res) => {
  try {
    const { userId, academicDetails, skills, interests } = req.body;

    // --- FIX STARTS HERE: NORMALIZE USER SKILLS ---
    // Convert user input array to lowercase and trim spaces
    const normalizedUserSkills = skills.map(s => s.toLowerCase().trim());

    const recommendations = careerData.map(career => {
      // Normalize career database skills for comparison
      const normalizedRequiredSkills = career.requiredSkills.map(s => s.toLowerCase().trim());

      // Find matches using normalized (lowercase) strings
      const matchedSkills = career.requiredSkills.filter(skill => 
        normalizedUserSkills.includes(skill.toLowerCase().trim())
      );
      
      const missingSkills = career.requiredSkills.filter(skill => 
        !normalizedUserSkills.includes(skill.toLowerCase().trim())
      );
      
      const matchPercentage = (matchedSkills.length / career.requiredSkills.length) * 100;

      return {
        jobRole: career.jobRole,
        matchPercentage,
        missingSkills
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
    // --- FIX ENDS HERE ---

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          academicDetails, 
          skills, // We still save the original casing for display
          interests,
          recommendations, 
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

// ... rest of your routes (GET /:userId and GET /admin/all) remain the same
router.get('/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId });
    if (!profile) return res.status(404).json("Profile not found");
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'username email');
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;