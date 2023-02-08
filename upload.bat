set /p "version=Enter version: "

git init
git add .
git commit -m %version%
git remote add origin https://github.com/undefined06855/Clock.git
git remote -v
git push origin master --force