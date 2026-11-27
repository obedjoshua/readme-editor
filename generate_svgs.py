# 1. Dump your clipboard straight into generate_svgs.py
if type -q wl-paste
    wl-paste > generate_svgs.py
else if type -q xclip
    xclip -o -selection clipboard > generate_svgs.py
else if type -q xsel
    xsel --clipboard --output > generate_svgs.py
else
    echo "Clipboard CLI not found — open generate_svgs.py in Zed and press Ctrl+V"
end

# 2. Verify the Python file starts with "import os"
head -n 3 generate_svgs.py

# 3. Create the GitHub Action workflow and push both files
printf '%s\n' "name: Update Custom Profile SVGs

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  render-svgs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Generate Profile SVGs
        run: python generate_svgs.py
      - name: Commit & Push SVGs
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add dist/
          git diff --quiet && git diff --staged --quiet || (git commit -m 'chore: refresh profile SVGs' && git push)" > .github/workflows/update-readme.yml && git add generate_svgs.py .github/workflows/update-readme.yml && git commit -m "feat: add automated SVG generator" && git push
