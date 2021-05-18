GitExplorer

The goal is to create a simple app for users to browse github repos and tag those of interest to them. Users can register or login. They can search for repositories, view open PRs and issues.

a. Signup and Login (local only). No server side login required. Just the basic local state of username/password
b. Search Bar for user to find repos on github
c. User should be able to bookmark a repo in the app so that it persists after logout
d. List all repos bookmarked by user (should be searchable and can be sorted by
time added)
e. Clicking on the repo should show
i. Last 5 open issues along with users that created the issue
ii. Clicking on the user, should show user’s avatar + location (if specified)
iii. Clicking on location should open maps and show navigation between app user’s current location and the github user’s location

- Location access be via native android module.
