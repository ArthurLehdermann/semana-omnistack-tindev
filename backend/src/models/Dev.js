const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
  github_id: {
    type: String,
    required: true
  },
  github_username: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    required: true
  },
  gravatar_id: String,
  url: {
    type: String,
    required: true
  },
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: String,
  bio: String,
  public_repos: String,
  public_gists: String,
  followers: String,
  following: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }]
}, {
    timestamps: true
  });

module.exports = model('Dev', DevSchema);