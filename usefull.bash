 cp -a ../version_17/. .


git add version_14 && git commit -m "Initial dist subtree commit"

git subtree push --prefix version_14  origin version_14

git add version_17 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_17  origin version_17

git add version_18 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_18  origin version_18

git add version_19 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_19  origin version_19


