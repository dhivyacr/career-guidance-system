const profileRoute = require('./routes/profile');
const authRoute = require('./routes/auth');

app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);