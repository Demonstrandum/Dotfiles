#!/bin/sh

PID="$(pgrep onboard)"

if [ -z "$PID" ]; then
    onboard &
fi

dbus-send --type=method_call --print-reply \
    --dest=org.onboard.Onboard \
    /org/onboard/Onboard/Keyboard \
    org.onboard.Onboard.Keyboard.ToggleVisible
