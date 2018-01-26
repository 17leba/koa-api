COMMIT_ID=""$1

git reset --hard || { echo "command failed"; exit 1; }
git fetch -p origin || { echo "command failed"; exit 1; }
git checkout $COMMIT_ID || { echo "command failed"; exit 1; }

pm2 restart app || { echo "command failed"; exit 1; }