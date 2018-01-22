COMMIT_ID=""$1

git reset --hard || { echo "command failed"; exit 1; }
git fetch -p origin || { echo "command failed"; exit 1; }
git checkout $COMMIT_ID || { echo "command failed"; exit 1; }

cd fe
npm run build || { echo "command failed"; exit 1; }
cp -rf dist/vue ../static/ || { echo "command failed"; exit 1; }
cp -rf dist/index.html ../views/ || { echo "command failed"; exit 1; }
rm -rf dist || { echo "command failed"; exit 1; }
cd ..

pm2 restart app || { echo "command failed"; exit 1; }