#!/usr/bin/zsh

STARTUP=(
    terminal
    terminal
    terminal
    chromium
)

for app in $STARTUP; do
    pkill -x "$app"
done

for app in $STARTUP; do
    sleep 0.1
    $app &
done

