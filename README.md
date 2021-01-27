# Pull Inspector
A GitHub Action to add relevant size label to PR based on the change in LOC.

## Features

- It will trigger everytime a new issue or pull request is `opened`, `edited` or `reopened`.
- Every PR will have either a `Small Change :shield:`, `Medium Change :shield:` and `Large Change :shield:` tag to represent the lines of code changed by PR based on the user's input given in the configuration YAML file.

### Properties

| Name | Datatype | Description | Example |
|------|----------|-------------|---------|
| token | string | GitHub secret access token. | ${{ secrets.GITHUB_TOKEN }} |
| pull-request--size-small | integer | Lines of code threshold for a PR with small change. | 50 |
| pull-request--medium-small | integer | Lines of code threshold for a PR with medium change. | 200 |
| pull-request--large-small | integer | Lines of code threshold for a PR with large change. | 400 |

### Example

```
name: Add Size Label to PR

on: 
  pull_request:
    types: [opened, edited, reopened]

jobs:
  contribution_inspector:
    runs-on: ubuntu-latest
    name: Add Size Label to PR
    steps:
    - name: All Checks
      uses: flowdify/add-size-label-to-pr@main
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        pull-request--size-small: 50
        pull-request--size-medium: 200
        pull-request--size-large: 400
```

## Future Plans

- Adding a functionality of **One Commit per PR** for PRs with small change.