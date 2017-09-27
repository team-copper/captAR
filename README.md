# captAR
## Augmented Reality-based Capture the Flag using React-Native

#### Resources:
* https://facebook.github.io/react-native/releases/0.48/docs/getting-started.html
* https://github.com/jeromeetienne/AR.js
* https://github.com/invertase/react-native-firebase
* https://applikeysolutions.com/blog/how-to-build-an-augmented-reality-app-with-react-native
* https://medium.com/setocean/donaldsays-react-native-augmented-reality-brought-to-you-by-toptal-5175011885e5

#### Git Instuctions (from John):
Here's a git workflow for you -
1) Before you start work on a new feature, make sure you are in your master branch (by doing `git checkout master`) and make sure you have the most up-to-date code from github (by doing `git pull origin master`)

2) Congratulations! You now have the freshest code on your master branch. We now want to start work on our feature so we *must* make a new branch, by doing `git checkout -b my_new_branch_name`

3) We just created and moved to the new branch. We do all our work here. When we have finished, we should add all the new files (`git add -A`), and commit them (`git commit -m "awesome work"`)

4) In the meantime, it's possible that the master branch up on github might have some new code in it, so before we push our feature branch up, we should pull down this new master code, and merge it into our feature branch. One way of doing this is by going to our local version of our master branch (`git checkout master`), pulling the new code from github (`git pull origin master`), then switching back to our feature branch (`git checkout my_new_branch_name`), and merging this new master code into it (`git merge master`)

5) Now we know that our feature branch has both the freshest code from the master branch on github _and_ the code the we wrote ourselves. We should now push this up to github (`git push origin my_new_branch_name`), and make a pull request into master. (edited)

-------
just remember, *always* do your work on a new branch, you should never be writing code directly into the master branch
