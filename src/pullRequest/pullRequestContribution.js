const Contribution = require('./../modules/contribution');
const LabelsManager = require('../modules/labelsManager');

class PullRequest extends Contribution {
	constructor(core, payload, octokit, owner, repo) {
		super(core, payload, octokit, owner, repo);
	}

	get LABELS() {
		return [
			{
				name: 'Small Change :shield:',
				description: 'PR with small change',
				color: '008000'
			},
			{
				name: 'Medium Change :shield:',
				description: 'PR with medium change',
				color: 'ffff00'
			},
			{
				name: 'Large Change :shield:',
				description: 'PR with large change',
				color: 'ff0000'
			}
		];
	}

	get TEMPLATE_PATH() {
		return '.github/PULL_REQUEST_TEMPLATE.md';
	}

	get INPUTS() {
		return {
			pullRequestSmallSize: this._core.getInput('pull-request--size-small'),
			pullRequestMediumSize: this._core.getInput('pull-request--size-medium'),
			pullRequestLargeSize: this._core.getInput('pull-request--size-large')
		};
	}

	get linesChanged() {
		return this._payload.additions + this._payload.deletions;
	}

	async addRelevantSizeLabel() {
		try {
			if (this.linesChanged <= this.INPUTS.pullRequestSmallSize) {
				await this.addLabels([this.LABELS[0].name]);
			} else if (this.linesChanged <= this.INPUTS.pullRequestMediumSize) {
				await this.addLabels([this.LABELS[1].name]);
			} else {
				await this.addLabels([this.LABELS[2].name]);
			}
		} catch (err) {
			console.error(err);
			this._core.setFailed(`Action failed with error: ${err}`);
		}
	}

	async removeOldLabels() {
		if (this._payload) {
			if (this._payload.labels.includes(this.LABELS[0].name)) {
				this.removeLabel(this.LABELS[0].name);
			} else if (this._payload.labels.includes(this.LABELS[1].name)) {
				this.removeLabel(this.LABELS[1].name);
			} else if (this._payload.labels.includes(this.LABELS[2].name)) {
				this.removeLabel(this.LABELS[2].name);
			}
		}
	}

	async respond() {
		try {
			await this.removeOldLabels();

			const labelsManager = new LabelsManager(this._core, this._payload, this._octokit, this._owner, this._repo, this.LABELS);

			await labelsManager.createOrUpdateLabels();

			await this.addRelevantSizeLabel();
		} catch (err) {
			console.error(err);
			this._core.setFailed(`Action failed with error: ${err}`);
		}
	}
}

module.exports = PullRequest;