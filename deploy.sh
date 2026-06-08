#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run generate

# navigate into the build output directory
cd .output/public

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://aacj2642.github.io
# git push -f git@github.com:aacj2642/aacj2642.github.io.git main

# if you are deploying to https://aacj2642.github.io/weiyang
# git push -f git@github.com:aacj2642/weiyang.git main:gh-pages
git push -f https://github.com/aacj2642/weiyang.git main:gh-pages

cd -
