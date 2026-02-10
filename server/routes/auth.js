const jwt = require('jsonwebtoken');

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found!");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password!");

    // Create Token with Role (Student/Admin)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "5h" }
    );

    res.status(200).json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});