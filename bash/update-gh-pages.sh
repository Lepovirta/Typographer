#!/bin/sh
# Checkout gh-pages, merge latest changes from master, push to gh-pages, checkout master

git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master
