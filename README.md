# Discord-Music-Bot
This is a music bot for your Discord server.

Advantages:
 - I commented everything out, so it's easy to figure it out
 - All setup in one file
 - Checking for the server (It is necessary so that when using the bot on several servers, no crashes occur)

---

> # Instructions
## Discord Bot:
 - [Create application](https://discord.com/developers/applications)
 - Add a bot to it (Bot section)
 - In the same place where the bot was added, enable "PRESENCE INTENT" and "SERVER MEMBERS INTENT" (Without this, the bot will not work)
 - Add a bot to the server (here it is already)

## Customizing the Config.json File
 ```js
 {
    "BOT_TOKEN": "Enter_discord_bot_token",

    "DEBUG_EVENT": false
 }
 ```
 
The bot token can be copied in the Bot section of [your application](https://discord.com/developers/applications)

## To run locally, you need Node.JS
 - [Download Node.JS](https://nodejs.org/en/)

## Start
 ```sh
 node .
 ```

---

> ## pm2
> <details>
> <summary>Installation pm2</summary>
> 
> 
> ## Install pm2
> ```sh 
> npm install --global pm2
> ```
> 
> ## Startup
>  - [Check this](https://futurestud.io/tutorials/pm2-restart-processes-after-system-reboot)
> 
> ## Starting
>  ```sh
>  pm2 start . --name "Code bot" --watch
>  ```
> 
> ## Base commands for Neophyte's
>  ```sh
> pm2 list - show all process
> 
> pm2 stop (id) - stopping process
> 
> pm2 logs (. or id) - show logs
>  ```
> more in `pm2 -h` or [this](https://pm2.keymetrics.io/docs/usage/quick-start/) and Google 😉
> 
> ---
> 
> ## If you want to use nodemon and pm2
>  - [Check this](https://stackoverflow.com/questions/69457892/nodemon-watch-vs-pm2-watch)
> 
> </details>

---

> ## Contribution
​
Please make sure to read the [Contributing Guide](CONTRIBUTING.md) before sending an issue or making a pull request.
