# Continious integration pack

Collection of scripts to help with the continious integration of the project.


[![pre-commit.ci status](https://github.com/vveliev/ci/actions/workflows/precommit.yml/badge.svg)](https://github.com/vveliev/ci/actions/workflows/precommit.yml)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)


## GitHub Actions

The GitHub Actions are defined in the [`.github/workflows`](.github/workflows) folder.

### Collection

- [**`ci-init.yml`**](.github/workflows/ci-init.yml): Clone repository calculate the version and create source-code artifacts.
- [**`ci-autoupdate-github-actions.yml`**](.github/workflows/ci-autoupdate-github-actions.yml): Update the GitHub Actions workflow files.
- [**`ci-autoupdate-precommit.yml`**](.github/workflows/ci-autoupdate-precommit.yml): Update the pre-commit configuration file.
