 cp -a ../version_17/. .
 cp -a ../version_19/. .
 mkdir version_21
 cp -a ../version_20/. .
 


git add version_14 && git commit -m "Initial dist subtree commit"

git subtree push --prefix version_14  origin version_14

git add version_17 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_17  origin version_17

git add version_18 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_18  origin version_18

git add version_19 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_19  origin version_19

git add version_20 && git commit -m "Initial dist subtree commit"
git subtree push --prefix version_20  origin version_20