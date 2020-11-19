#!/bin/sh

NEW_DATE="$(date +%m%d%H%M%Y.%S -d "$1")"

echo "Changing to $NEW_DATE."

date "$NEW_DATE"
