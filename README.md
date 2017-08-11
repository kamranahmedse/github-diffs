<p align="center">
  <img src="http://i.imgur.com/SgwxaDU.png" alt="github-diffs">
</p>

<h1 align="center">github-diffs ➕➖</h1>

> Collapse or expand diffs in pull requests for easier code review

### Motivation
> When [there is a large number of files in a PR](https://twitter.com/kamranahmedse/status/877154633264844801) it becomes difficult to get an overview or to find some specific files with all the files in PR stacked upon each other. This extension allows collapsing and expanding files so that you do not have to pound the innocent scrollbar.

### Sneak Peak

> Adds buttons to `Collapse all Diffs` or `Show all Diffs` and `makes file headers clickable` to toggle the diff for it

![](http://i.imgur.com/Q0lNwnI.png)

### Installation

- [Install from the Webstore](https://chrome.google.com/webstore/detail/github-diffs/dhcpmhfjmlgjfhpeeloohoffbmpjfmgh)
- [install it manually](http://superuser.com/a/247654/6877)

## Development

Clone the repository

```
git clone https://github.com/kamranahmedse/github-diffs.git
```
Install the dependencies
```
yarn install
```
Run the start command
```
yarn start
```
It will create a `build` directory at the root. Now open chrome and go to the below url 

```
chrome://extensions
```
Now click `Load unpacked extension..` and select the `build` directory. This will load the extension and any changes that you will make, will be reflected automatically.

## Contribution
I'd love to hear what you have to say. Reach me out at kamranahmed.se@gmail.com or [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/kamranahmedse.svg?style=social&label=Follow%20%40kamranahmedse)](https://twitter.com/kamranahmedse)

## License
MIT © [Kamran Ahmed](https://kamranahmed.info)


