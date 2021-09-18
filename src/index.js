const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;

const token = core.getInput('token');
const octokit = github.getOctokit(token);

const owner = context.repo.owner;
const repo = context.repo.repo;

const PullRequestContribution = require('./pullRequest/pullRequestContribution');

const pullRequest = new PullRequestContribution(core, context.payload.pull_request, octokit, owner, repo);
pullRequest.respond().then(() => { }).catch(err => core.setFailed(`Action failed with error: ${err}`));
