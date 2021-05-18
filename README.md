# GitExplorer

The goal is to create a simple app for users to browse github repos and tag those of interest to them. Users can register or login. They can search for repositories, view open PRs and issues.

## Features

- Signup and Login (local only). No server side login required. Just the basic local state of username/password
- Search Bar for user to find repos on github
- User should be able to bookmark a repo in the app so that it persists after logout

  - List all repos bookmarked by user (should be searchable and can be sorted by
    time added)
  - Clicking on the repo should show:
    - Last 5 open issues along with users that created the issue
    - Clicking on the user, should show user’s avatar + location (if specified)
    - Clicking on location should open maps and show navigation between app user’s current location and the github user’s location

- Location access be via native android module.

## Installation

## License

MIT

**Free Software, Hell Yeah!**
