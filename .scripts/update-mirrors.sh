#!/bin/sh 

if [ ! "$(whoami)" = "root" ]; then
	echo "Run me as root."
	exit
fi

echo "Saving backup file as /etc/pacman.d/mirrorlist.old."
cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.old

echo "Getting latest 20 mirrors and sorting by speed."
reflector       \
	--verbose   \
	--latest 20 \
	--sort rate \
	--save /etc/pacman.d/mirrorlist
