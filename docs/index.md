[![Issues](https://img.shields.io/github/issues/reoccurcat/reoccurcord-js.svg?colorB=5e03fc)](https://github.com/reoccurcat/reoccurcord-js/issues)
[![Site Status](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=purple&up_message=online&url=https%3A%2F%2Frc.reoccur.tech)](https://rc.reoccur.tech)
[![Stars](https://img.shields.io/github/stars/reoccurcat/reoccurcord-js?style=social)](https://github.com/reoccurcat/reoccurcord-js/stargazers)
[![Discord](https://img.shields.io/discord/883472120083005441)](https://discord.gg/yATc4DJ69R)
[![License](https://img.shields.io/github/license/reoccurcat/reoccurcord-js)](https://github.com/reoccurcat/reoccurcord-js/blob/main/LICENSE)
[![Commits](https://img.shields.io/github/commit-activity/m/reoccurcat/reoccurcord-js)](https://github.com/reoccurcat/reoccurcord-js/commits/main)
![Maintained](https://img.shields.io/maintenance/yes/2021)

# reoccurcord javascript
## Welcome to the official GitHub page of the reoccurcord bot!
reoccurcord is a bot formerly made in python but now continued in javascript.
If you find an issue, or have a feature suggestion, please let us know by opening an issue [here](https://github.com/reoccurcat/reoccurcord/issues).

## Documentation

### Starting the bot
#### Make sure you have [Python 3](https://www.python.org/downloads/) installed (and put in path, if you're on Windows 10)!!!
1. Clone the repository: `git clone https://github.com/reoccurcat/reoccurcord-js.git` and go to step 2. An alternative is to download the ZIP file, unzip it, shift + right click in the `reoccurcord-js-main` folder, click on `Open Powershell window here`, and continue with step 3.
2. `cd` to the repository folder: `cd reoccurcord-js`.
3. Make sure all the dependencies are installed, Windows: `python -m pip install discord.py requests asyncio gitpython psutil datetime bs4 jishaku` (add `nudenet` and `tensorflow-cpu` if you want NSFW detection) Linux: `pip3 install discord.py requests asyncio gitpython psutil datetime bs4 jishaku` (add `nudenet` and `tensorflow-cpu` if you want NSFW detection). If there are any other errors with importing dependencies, install them as necessary.
4. Run `python3 setup.py` for a configuration creator. If you don't do this, the bot will not run.
5. Before starting, make sure the Server Members Intent is enabled in your bot settings in the Discord Developer Portal.
6. To make sure the `mute` and `unmute` commands work, please make a role called `muted` in your server. The bot will not (yet) do this for you. After you create the role, make sure to create overrides for the channels you don't want a muted user speaking in.
7. Run the main bot file: `python3 start.py` (or see the commands with `python3 start.py --help`).

### Features

There are many features of the bot. These features include:

- VirusTotal file scanning
- Message encryption
- Moderation
- Fun commands
- Utility commands
- Custom playing status that you can customize per instance
- Self updating feature
- Lots more commands, and more commands being added regularly!

You can find the support server here:

[![Join our Discord server!](https://invidget.switchblade.xyz/yATc4DJ69R)](http://discord.gg/yATc4DJ69R)

Like earlier said, if you have any feature requests or issues with the bot, open an issue [here](https://github.com/reoccurcat/reoccurcord-s/issues)!
Enjoy the bot! We hope you have as much fun with it as we had programming it! :)

Made with discord.py v9.
