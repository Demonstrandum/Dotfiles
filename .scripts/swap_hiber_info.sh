#!/bin/sh

echo "Setting resume volume (MAJOR:MINOR)..."
echo 259:4 | sudo tee /sys/power/resume
echo "Setting resume offset..."
echo 13725696 | sudo tee /sys/power/resume_offset

