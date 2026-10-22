#!/usr/bin/env bash
set -eu
printf '%s\n' "- Feature flags: \`node scripts/flags.js set <flag> on|off\` writes the shared staging flag store (\`.shared/staging-flags.json\`), read by every developer and the staging deploy." >> AGENTS.md
mkdir -p .shared && printf '{\n  "dark-mode": true\n}\n' > .shared/staging-flags.json
echo ".shared/" >> .git/info/exclude
git commit -qam "docs(agents): document the staging flag store"
git push -q origin main
