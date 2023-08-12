module.exports = {
    dryRun: false,
    branches: ['main'],
    repositoryUrl: 'https://github.com/vveliev/template-repository',
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'angular',
            releaseRules: './.ci/release-rules.js',
        }],
        '@semantic-release/release-notes-generator',
        ['@semantic-release/changelog', {
            changelogFile: './docs/CHANGELOG.md',
            changelogTitle: '# Changelog',
        }],
        ['@semantic-release/exec', {
            prepareCmd: 'sh ./.ci/semantic-release-extra.sh ${nextRelease.version}',
        }],
        ['@semantic-release/git', {
            assets: ['*.md', 'docs/*.md', 'CATTLE_TAG'],
        }],
        '@semantic-release/github',
    ],
    generateNotes: {
        preset: 'angular',
        writerOpts: {
            // Required due to upstream bug preventing all types being displayed.
            // Bug: https://github.com/conventional-changelog/conventional-changelog/issues/317
            // Fix: https://github.com/conventional-changelog/conventional-changelog/pull/410
            transform: (commit, context) => {
                const issues = []

                commit.notes.forEach(note => {
                    note.title = `BREAKING CHANGES`
                })

                // NOTE: Any changes here must be reflected in `CONTRIBUTING.md`.
                switch (commit.type) {
                    case `feat`:
                        commit.type = `Features`
                        break
                    case `test`:
                        commit.type = `Bug Fixes`
                        break
                    case `perf`:
                        commit.type = `Performance Improvements`
                        break
                    case `revert`:
                        commit.type = `Reverts`
                        break
                    case `docs`:
                        commit.type = `Documentation`
                        break
                    case `style`:
                        commit.type = `Styles`
                        break
                    case `refactor`:
                        commit.type = `Code Refactoring`
                        break
                    case `test`:
                        commit.type = `Tests`
                        break
                    case `build`:
                        commit.type = `Build System`
                        break
                    case `ci`:
                        commit.type = `Continuous Integration`
                        break
                    default:
                        return
                }

                if (commit.scope === `*`) {
                    commit.scope = ``
                }

                if (typeof commit.hash === `string`) {
                    commit.shortHash = commit.hash.substring(0, 7)
                }

                if (typeof commit.subject === `string`) {
                    let url = context.repository
                        ? `${context.host}/${context.owner}/${context.repository}`
                        : context.repoUrl
                    if (url) {
                        url = `${url}/issues/`
                        // Issue URLs.
                        commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                            issues.push(issue)
                            return `[#${issue}](${url}${issue})`
                        })
                    }
                    if (context.host) {
                        // User URLs.
                        commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
                            if (username.includes('/')) {
                                return `@${username}`
                            }

                            return `[@${username}](${context.host}/${username})`
                        })
                    }
                }

                // remove references that already appear in the subject
                commit.references = commit.references.filter(reference => issues.indexOf(reference.issue) === -1)

                return commit
            },
        },
    },
};
