# 🔐 GitHub Authentication Guide

You need to authenticate to push code to GitHub. Here are your options:

## Option 1: Install GitHub CLI (Easiest) ⭐ Recommended

### Install GitHub CLI:
```bash
# On Mac (using Homebrew)
brew install gh

# Or download from: https://cli.github.com/
```

### Authenticate:
```bash
gh auth login
```

Follow the prompts:
1. Choose "GitHub.com"
2. Choose "HTTPS" 
3. Authenticate in your browser
4. Done!

### Then push:
```bash
git push -u origin main
```

---

## Option 2: Personal Access Token (Quick Fix)

### Step 1: Create a Token on GitHub
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "My Computer"
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Use the Token
When you run `git push`, it will ask for:
- **Username**: Your GitHub username (`N4TEM4RSH4LL`)
- **Password**: Paste your token (not your actual password!)

### Step 3: Save Credentials (Optional)
```bash
# Save credentials so you don't have to enter them every time
git config --global credential.helper osxkeychain
```

---

## Option 3: Switch to SSH (More Secure, One-Time Setup)

### Step 1: Check if you have SSH keys
```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)
```

### Step 3: Add SSH key to GitHub
```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

Then on GitHub:
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Paste your key
4. Click "Add SSH key"

### Step 4: Change remote URL to SSH
```bash
git remote set-url origin git@github.com:N4TEM4RSH4LL/First-Repository.git
```

### Step 5: Test and push
```bash
ssh -T git@github.com  # Should say "Hi N4TEM4RSH4LL!..."
git push -u origin main
```

---

## Option 4: Use GitHub Desktop (Visual Tool)

1. Download: https://desktop.github.com/
2. Sign in with your GitHub account
3. Add your repository
4. Click "Push origin" button

---

## 🎯 Quick Decision Guide

- **New to Git?** → Use GitHub Desktop (Option 4)
- **Want command line?** → Install GitHub CLI (Option 1)
- **Need it working NOW?** → Use Personal Access Token (Option 2)
- **Want long-term security?** → Set up SSH (Option 3)

---

## ✅ After Authentication

Once authenticated, you can push:
```bash
git push -u origin main
```

Future pushes are just:
```bash
git push
```

---

## 🔍 Verify Your Setup

Check your remote:
```bash
git remote -v
```

Should show:
```
origin  https://github.com/N4TEM4RSH4LL/First-Repository.git (fetch)
origin  https://github.com/N4TEM4RSH4LL/First-Repository.git (push)
```

