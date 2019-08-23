const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(request, response) {
    const { user } = request.headers;
    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return response.json(users);
  },
  async store(request, response) {
    const { username } = request.body

    const userExists = await Dev.findOne({ github_username: new RegExp(`^${username}$`, 'i') });
    if (userExists)
      return response.json(userExists);

    const github_response = await axios.get(`https://api.github.com/users/${username}`);

    const dev = await Dev.create({
      github_id: github_response.data.id,
      github_username: github_response.data.login,
      avatar_url: github_response.data.avatar_url,
      gravatar_id: github_response.data.gravatar_id,
      url: github_response.data.url,
      html_url: github_response.data.html_url,
      followers_url: github_response.data.followers_url,
      following_url: github_response.data.following_url,
      gists_url: github_response.data.gists_url,
      starred_url: github_response.data.starred_url,
      subscriptions_url: github_response.data.subscriptions_url,
      organizations_url: github_response.data.organizations_url,
      repos_url: github_response.data.repos_url,
      events_url: github_response.data.events_url,
      received_events_url: github_response.data.received_events_url,
      name: github_response.data.name,
      company: github_response.data.company,
      blog: github_response.data.blog,
      location: github_response.data.location,
      email: github_response.data.email,
      hireable: github_response.data.hireable,
      bio: github_response.data.bio,
      public_repos: github_response.data.public_repos,
      public_gists: github_response.data.public_gists,
      followers: github_response.data.followers,
      following: github_response.data.following
    });

    return response.json(dev);
  }
}