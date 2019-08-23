const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const loggedDev = await Dev.findById(user);

    const targetDev = await Dev.findById(devId);
    if (!targetDev) {
      return response.status(400).json({ error: 'Dev not exists' });
    }

    if (!loggedDev.likes.includes(targetDev._id)) {
      loggedDev.likes.push(targetDev._id);
      await loggedDev.save();
    }

    if (loggedDev.dislikes.includes(targetDev._id)) {
      loggedDev.dislikes.pop(targetDev._id);
      await loggedDev.save();
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      return response.json({ message: 'DEU MATCH!' });
    }

    return response.json(loggedDev);
  }
}