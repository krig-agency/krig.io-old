# Contribution guidelines.

## Issues

Feel free to add issues in the github repository issue tracker.

## Code Standard

### JavaScript

This repository uses the `semistandard` js standard. Which is same as `standard` but with semicolons sprinkled on top!  
Gulp will run the semistandard check on build, make sure it's not red!

## Git flow

We try to stick as much as possible to the standard git-flow methodology.  
No one will be shot if one fails to do it correctly!  

If you are unaware of how git-flow works, in short:  

### Features

Each feature have to have a issue set. When it does, branch out from the default branch (`knacka`) for each new feature. 
Branch names should be formatted as `feature/<issuenumber>-short-description`. When a feature is complete, push to origin and create a pullrequest. If wanted, add `Closes #<issuenumber>` in the PR message.

### Releases

A release gets its own branch and tag.  

### Hotfixes

Hotfixes are done against release branches. All hotfixes should have their own branches and be formatted as `hotfix/<issuenumber>-short-description`.
When complete, a pullrequest should be opened to the given release branch.

### Commit messages

Commits should include messages with a description of the changes. You don't have to write an essay, just a line or two.  

Example:

> Updated the Contribution guidelines, added info about commit messages.



