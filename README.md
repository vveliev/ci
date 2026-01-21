# Continuous integration pack

Collection of scripts to help with the continuous integration of the project.


[![pre-commit.ci status](https://github.com/vveliev/ci/actions/workflows/precommit.yml/badge.svg)](https://github.com/vveliev/ci/actions/workflows/precommit.yml)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)


## GitHub Actions

The GitHub Actions are defined in the [`.github/workflows`](.github/workflows) folder.

### Collection

- [**`ci-init.yml`**](.github/workflows/ci-init.yml): Clone repository calculate the version and create source-code artifacts.
- [**`ci-autoupdate-github-action.yml`**](.github/workflows/ci-autoupdate-github-action.yml): Update the GitHub Actions workflow files.
- [**`ci-autoupdate-precommit.yml`**](.github/workflows/ci-autoupdate-precommit.yml): Update the pre-commit configuration file.

> Note: The `ci-init.yml` workflow is scheduled weekly (Sunday at 00:00 UTC).

### Usage

#### Initialize artifacts and version

Example usage from another workflow via `workflow_call`:

```yaml
jobs:
	init:
		uses: vveliev/ci/.github/workflows/ci-init.yml@main
		with:
			artifact_name: source-code
			artifact_upload: true
			runs-on: "['ubuntu-latest']"
```

Outputs:

- `version`: semantic version from tags
- `artifact`: artifact name (defaults to `source-code`)

#### Release

Release is triggered manually via `workflow_dispatch` in [release workflow](.github/workflows/release.yml).
