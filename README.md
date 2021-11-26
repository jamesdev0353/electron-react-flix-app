<p align="center">
<img src="https://github.com/carlelieser/Flixerr/blob/master/assets/imgs/icon.png?raw=true=" width="128" height="128"/>
</p>

# Flixerr
The best free movie & tv series torrent streaming app.

### Now with dark mode and PiP view!

### Join us on <a href="https://discord.gg/vQPuPjS"> Discord. </a>

<p align="center">
<img src="https://github.com/carlelieser/Flixerr/blob/master/assets/imgs/new-mac-mockup.png?raw=true=">
</p>

### Installation
To install Flixerr, click the appropriate link for your system in the releases page. Alternatively, you can click the download button on our website.

As of update 1.6.0, it is recommended to run `npm run rebuild` after running `npm install` for the first time. If you're on Windows, it is also necessary to install Apple's [Bonjour Services](https://download.developer.apple.com/Developer_Tools/bonjour_sdk_for_windows_v3.0/bonjoursdksetup.exe) before installing the project's dependencies. The `mdns` package used for casting fails on Windows if Bonjour is not installed.

### Features
Flixerr makes it easy to stream movies straight from your desktop. Just find the movie you want to watch, and click play.

#### 🔥 Blazing fast torrent streaming
Not only do we find the best quality torrent to stream, but we also use the best available torrent streaming client for Nodejs - WebTorrent. 

#### 👍🏼 Beautiful User Interface
Flixerr boasts a clean, minimalistic design with smooth and consistent animations throughout.

#### 🌩️ Cloud syncing using Google Firebase
Flixerr persists your streaming data across multiple devices on the same account. This includes favorites, recently watched, streaming quality preference, and where you left off.

#### 💩 No bullshit
We don't use ads or try to scam you. However, due to the legality of movie torrents, please use Flixerr at your own discretion.

### How it works
First, Flixerr searches for torrents of the movie you want to watch on multiple torrent sites. It then sorts through the results to find the best quality torrents and then plays one that matches your resolution preference and meets our specific threshold. 

The process is as follows:
1. Movie name is used to find torrents.
2. Torrents are sorted.
3. Torrent is streamed.
4. Torrent is saved in case the user tries to watch the same movie more than once.

### Contributing
 If you want to contribute to making Flixerr better/faster, please don't hesitate!If you have any questions please email support@flixerrtv.com, issues are only for bugs/feature requests. 
