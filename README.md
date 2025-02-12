# Basic Overwolf CS2 Overlay

Overwolf CS2 Overlay allows users to watch real time updates of KDA statistic, equipment value and "kills" made in a row in separate window on top of running game.

## Steps to prepare

node.js v20.15.0 from https://nodejs.org/en
latest Overwolf client from https://www.overwolf.com/
to be confirmed as Overwolf Developer - https://dev.overwolf.com/ow-native/getting-started/submitting-an-app-proposal

## Steps to get programm running

clone or download current repository
go to downloaded folder
run "npm install"
run "npm run build"
folder named 'dist' should appear in current folder

open Overwolf client, go to settings/about, click on "Development options", package manager should be opened
click "Load unpacked extention" and choose "dist" folder in opened file manager
choose "Enabled"
click "Launch"

In Overwolf client settings choose "Overlay & Hotkeys", find "Counter Strike 2" game and enable overlay. Also set desired hotkey, for example Shift+Alt+/.

run "Counter Strike 2",go to setting and choose "fullscreen-windowed" or "windowed" mode
Overwolf CS2 Overlay should appear in a screen

if Overwolf CS2 Overlay hasn't appear, while in a game, use hotkey combination to open Overwolf overlay, and click on cs icon
