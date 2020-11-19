#!/bin/sh

export FBTERM_BACKGROUND_IMAGE=1
cat nifty-background.fbimg > /dev/fb0; fbterm

