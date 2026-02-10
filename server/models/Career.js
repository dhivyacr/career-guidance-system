const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    careerName: String,
    requiredSkills: [String], // e.g., ["Java", "Spring Boot", "SQL"]
    description: String
});

module.exports = mongoose.model('Career', CareerSchema);