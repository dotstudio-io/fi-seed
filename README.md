# Fi Seed
A boilerplate for applications with Node.js + Express + MongoDB on the backend and AngularJS on the frontend (aka MEAN).

## Using as base structure
To create an application based on **Fi Seed** just fork this repo somewhere else. If you want, you can also add it as upstream to an existing repo:

First, check if it isn't already as upstream:
```sh
git remote -v
```

Add the Fi Seed repo as upstream:
```sh
git remote add upstream https://github.com/finaldevstudio/fi-seed.git
```

Verify it has been added:
```sh
git remote -v
```

Then, fetch the upstream:
```sh
git fetch upstream
```

Switch to your [master] or the branch to merge **Fi Seed** into:
```sh
git checkout master
```

And merge the upstream changes into your branch:
```sh
git merge upstream/master
```

That's it! you have a **Fi Seed** clone. You can repeat the previous steps to merge updates from the **Fi Seed** repo.
