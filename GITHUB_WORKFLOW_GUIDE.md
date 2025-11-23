
# 🚀 GitHub Workflow Guide: Pull Requests & Team Collaboration

## Table of Contents
1. [Understanding GitHub Basics](#understanding-github-basics)
2. [Setting Up Your Repository](#setting-up-your-repository)
3. [Creating a Pull Request (Step-by-Step)](#creating-a-pull-request-step-by-step)
4. [Best Practices for Team Collaboration](#best-practices-for-team-collaboration)
5. [Common Workflows](#common-workflows)
6. [Troubleshooting](#troubleshooting)

---

## Understanding GitHub Basics

### What is GitHub?
GitHub is a platform that hosts Git repositories (version control systems) in the cloud. It allows multiple developers to work on the same project simultaneously without overwriting each other's work.

### Key Concepts

**Repository (Repo)**: A project folder that contains all your code files and their history.

**Branch**: A parallel version of your code. Think of it as a separate timeline where you can make changes without affecting the main code.

**Main/Master Branch**: The primary branch that contains the production-ready code. Usually called `main` (or `master` in older repos).

**Commit**: A snapshot of your code at a specific point in time. Like saving a game checkpoint.

**Pull Request (PR)**: A request to merge your changes from one branch into another (usually into `main`). This is how you propose changes and get them reviewed.

**Merge**: The act of combining changes from one branch into another.

**Fork**: Your own copy of someone else's repository.

**Clone**: Downloading a repository to your local machine.

---

## Setting Up Your Repository

### 1. Initialize Git (if not already done)
```bash
git init
```

### 2. Add Your Remote Repository
If you created a repository on GitHub.com, connect it:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3. Make Your First Commit
```bash
git add .
git commit -m "Initial commit: Add React Native Color Mixer app"
git branch -M main
git push -u origin main
```

---

## Creating a Pull Request (Step-by-Step)

### Scenario: You want to add a new feature

#### Step 1: Create a New Branch
**Why?** Never work directly on `main`. Always create a branch for new features.

```bash
# Make sure you're on main and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch
git checkout -b feature/add-dark-mode

# Or using the newer syntax:
git switch -c feature/add-dark-mode
```

**Branch Naming Conventions:**
- `feature/` - New features (e.g., `feature/add-login`)
- `bugfix/` or `fix/` - Bug fixes (e.g., `bugfix/fix-crash-on-startup`)
- `hotfix/` - Urgent production fixes (e.g., `hotfix/security-patch`)
- `refactor/` - Code improvements (e.g., `refactor/cleanup-api-calls`)

#### Step 2: Make Your Changes
Edit your files, add new features, fix bugs, etc.

```bash
# Example: Edit App.js
# ... make your changes ...
```

#### Step 3: Stage Your Changes
Tell Git which files you want to include in your commit:

```bash
# Add specific files
git add App.js
git add components/NewComponent.js

# Or add all changed files
git add .

# Check what you're about to commit
git status
```

#### Step 4: Commit Your Changes
Create a snapshot with a descriptive message:

```bash
git commit -m "Add dark mode toggle feature

- Add dark mode state management
- Create theme context
- Update UI components to support dark mode
- Add toggle button in settings"
```

**Commit Message Best Practices:**
- Use present tense: "Add feature" not "Added feature"
- First line should be a short summary (50 chars or less)
- Add a blank line, then detailed description if needed
- Reference issue numbers: "Fix #123"

#### Step 5: Push Your Branch to GitHub
Upload your branch to GitHub:

```bash
git push origin feature/add-dark-mode

# If it's the first time pushing this branch:
git push -u origin feature/add-dark-mode
```

#### Step 6: Create Pull Request on GitHub

1. **Go to your repository on GitHub.com**
2. **You'll see a yellow banner** saying "feature/add-dark-mode had recent pushes" with a green "Compare & pull request" button
3. **Click "Compare & pull request"**
4. **Fill out the PR form:**
   - **Title**: Clear, descriptive title (e.g., "Add dark mode toggle feature")
   - **Description**: Explain what you changed and why
     ```markdown
     ## What does this PR do?
     Adds a dark mode toggle feature to the Color Mixer app.
     
     ## Changes Made
     - Added dark mode state management using Context API
     - Created ThemeProvider component
     - Updated all UI components to support theme switching
     - Added toggle button in header
     
     ## Screenshots
     [Add screenshots if applicable]
     
     ## Testing
     - [x] Tested on iOS
     - [x] Tested on Android
     - [x] Tested theme persistence
     
     ## Related Issues
     Closes #42
     ```
5. **Add Reviewers**: Tag team members who should review your code
6. **Add Labels**: Add relevant labels (e.g., "feature", "enhancement")
7. **Click "Create pull request"**

#### Step 7: Address Review Feedback
Team members will review your code and may request changes:

1. **Make requested changes** on the same branch
2. **Commit and push again:**
   ```bash
   git add .
   git commit -m "Address review feedback: improve dark mode contrast"
   git push origin feature/add-dark-mode
   ```
3. **The PR automatically updates** with your new commits

#### Step 8: Merge the Pull Request
Once approved:

1. **Click "Merge pull request"** on GitHub
2. **Choose merge type:**
   - **Create a merge commit**: Preserves full history (recommended for teams)
   - **Squash and merge**: Combines all commits into one (cleaner history)
   - **Rebase and merge**: Linear history (advanced)
3. **Click "Confirm merge"**
4. **Delete the branch** (GitHub will prompt you)

#### Step 9: Update Your Local Repository
```bash
# Switch back to main
git checkout main

# Pull the latest changes (including your merged PR)
git pull origin main

# Delete the local branch (it's been merged)
git branch -d feature/add-dark-mode
```

---

## Best Practices for Team Collaboration

### 1. Always Pull Before You Push
```bash
git checkout main
git pull origin main
# Then create your branch
```

### 2. Keep Branches Small and Focused
- One feature = one branch = one PR
- Easier to review and less likely to have conflicts

### 3. Write Clear Commit Messages
- Bad: `"fix stuff"`
- Good: `"Fix crash when gradient colors array is empty"`

### 4. Keep Your Branch Up to Date
If `main` has moved forward while you're working:

```bash
# On your feature branch
git checkout feature/add-dark-mode
git pull origin main  # or: git merge main
# Resolve any conflicts if they occur
git push origin feature/add-dark-mode
```

### 5. Use Pull Requests for Everything
Even for small changes. PRs provide:
- Code review
- Discussion
- History/audit trail
- CI/CD testing

### 6. Review Others' Code
- Be constructive and kind
- Ask questions, don't just criticize
- Approve when ready, request changes when needed

### 7. Resolve Conflicts Early
If you see conflicts:
```bash
git pull origin main
# Fix conflicts in your editor
git add .
git commit -m "Resolve merge conflicts with main"
git push origin feature/add-dark-mode
```

---

## Common Workflows

### Feature Development Workflow
```
1. git checkout main
2. git pull origin main
3. git checkout -b feature/new-feature
4. [Make changes]
5. git add .
6. git commit -m "Add new feature"
7. git push origin feature/new-feature
8. [Create PR on GitHub]
9. [Get reviews, make changes]
10. [Merge PR]
11. git checkout main
12. git pull origin main
13. git branch -d feature/new-feature
```

### Hotfix Workflow (Urgent Production Fix)
```
1. git checkout main
2. git pull origin main
3. git checkout -b hotfix/critical-bug
4. [Fix the bug]
5. git add .
6. git commit -m "Fix critical security issue"
7. git push origin hotfix/critical-bug
8. [Create PR, get urgent review]
9. [Merge to main]
10. [Also merge to any release branches if needed]
```

### Working on Someone Else's PR
```bash
# Fetch their branch
git fetch origin feature/their-feature

# Check it out locally
git checkout feature/their-feature

# Make changes
# ... edit files ...

# Push to their branch (if you have permission)
git push origin feature/their-feature
```

---

## Troubleshooting

### "Your branch is behind 'origin/main'"
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main  # or: git rebase main
```

### "Merge conflict"
1. Open the conflicted files
2. Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. Choose which code to keep (or combine both)
4. Remove the conflict markers
5. `git add .`
6. `git commit -m "Resolve merge conflicts"`

### "I committed to main by mistake"
```bash
# Create a branch from current state
git branch backup-main
git checkout -b feature/fix-commit

# Reset main to before your commit
git checkout main
git reset --hard origin/main

# Your work is safe in the feature branch
git checkout feature/fix-commit
```

### "I want to undo my last commit"
```bash
# Keep changes, just undo commit
git reset --soft HEAD~1

# Discard changes completely
git reset --hard HEAD~1
```

### "I pushed to the wrong branch"
```bash
# Create a new branch from current state
git checkout -b feature/correct-branch

# Reset the wrong branch
git checkout wrong-branch
git reset --hard origin/wrong-branch

# Push the correct branch
git checkout feature/correct-branch
git push origin feature/correct-branch
```

---

## Quick Reference Commands

```bash
# Branch Management
git branch                    # List branches
git branch -a                # List all branches (including remote)
git checkout -b new-branch   # Create and switch to new branch
git branch -d branch-name    # Delete local branch
git branch -D branch-name    # Force delete local branch

# Status & History
git status                   # See what's changed
git log                      # View commit history
git log --oneline --graph    # Compact history with graph

# Staging & Committing
git add .                    # Stage all changes
git add file.js              # Stage specific file
git commit -m "Message"      # Commit with message
git commit --amend           # Fix last commit message

# Remote Operations
git push origin branch-name  # Push branch to GitHub
git pull origin main         # Pull latest from main
git fetch origin             # Download updates without merging

# PR Workflow
git checkout main            # Switch to main
git pull origin main         # Update main
git checkout -b feature/xyz  # Create feature branch
# ... make changes ...
git add .
git commit -m "Description"
git push origin feature/xyz  # Push for PR
```

---

## Real-World Example: Adding a Feature

Let's say you want to add a "Save Gradient" feature:

```bash
# 1. Start from updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/save-gradients

# 3. Make your changes
# Edit App.js, add save functionality, etc.

# 4. Stage and commit
git add App.js
git add utils/saveGradient.js
git commit -m "Add save gradient functionality

- Create saveGradient utility function
- Add save button to UI
- Implement local storage persistence
- Add saved gradients list view"

# 5. Push to GitHub
git push -u origin feature/save-gradients

# 6. Go to GitHub.com and create PR
# 7. Wait for review, make changes if needed
# 8. After merge, clean up:
git checkout main
git pull origin main
git branch -d feature/save-gradients
```

---

## Tips for Success

1. **Pull frequently** - Stay up to date with main
2. **Commit often** - Small, logical commits are better
3. **Write good PR descriptions** - Help reviewers understand your changes
4. **Be responsive** - Address review feedback quickly
5. **Test before PR** - Make sure your code works
6. **Use meaningful branch names** - `feature/login` not `branch1`
7. **Don't force push to shared branches** - Only to your own feature branches

---

## Next Steps

1. Practice creating branches and PRs on this repository
2. Try resolving a merge conflict (create one intentionally to practice)
3. Review someone else's code (even if it's your own from another branch)
4. Learn about GitHub Actions for CI/CD
5. Explore GitHub's project management features (Issues, Projects, Milestones)

Happy coding! 🎉

