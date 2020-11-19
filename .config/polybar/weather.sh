#!/bin/bash


### API Information ###
# This script uses the Dark Sky weather API. You will need to register an account to get an API key. The first 1000 API requests you make every day are free of charge.
# Documentation overview: https://darksky.net/dev/docs
# Account overview: https://darksky.net/dev/account

# Define your location. api.darksky.net/forecast/api_key/latitude,longitude?... If you want Fahrenheit, use units=us
address="https://api.darksky.net/forecast/224d4ae65447ccbfaf102bc5a86cfa63/51.5033640,-0.1276250?units=si&exclude=minutely,hourly,daily,alerts,flags"
weather="$(wget -q -O- $address)"

# Look for the current weather conditions
[[ "$weather" =~ \"icon\":\"([^\"]*)\" ]]
condition="${BASH_REMATCH[1]}"

# Look for the current apparent temperature. Use \"temperature\", if you like.
[[ "$weather" =~ \"apparentTemperature\":([^,]*), ]]
temperature="${BASH_REMATCH[1]}"

# Print some spacing, and a cloud icon. If you can't see the icon, install otf-fontawesome from the AUR or find it for your distribution
clouds=" "

# Print a rounded temperature value
printf -v temperature '%.0f' "$temperature"

temperature="$clouds$temperature"

# Use either Celsius or Fahrenheit character
if grep -qi 'units=us' <<< $address; then
	temperature="$temperature°F"
else
	temperature="$temperature°C"
fi

# Print edgy shit about the weather
if grep -qi 'rain' <<< $condition; then
    comment=" Pluviophile dreams."
elif grep -qi 'partly-cloudy' <<< $condition; then
    comment=" It's alright."
elif grep -qi 'cloudy' <<< $condition; then
    comment=" Grey and dull."
elif grep -qi 'clear-day' <<< $condition; then
    comment=" Diffuse sky radiation."
elif grep -qi 'clear-night' <<< $condition; then
	comment=" Look up at the stars."
elif grep -qi 'snow' <<< $condition; then
	comment=" It's snowing!"
elif grep -qi 'fog' <<< $condition; then
	comment=" Spooky."
elif grep -qi 'wind' <<< $condition; then
	comment=" Don't fly away."
elif grep -qi 'sleet' <<< $condition; then
	comment=" Sleet. Stay inside."
# Next 3 may not be defined yet.
elif grep -qi 'thunderstorm' <<< $condition; then
	comment=" The gods are wrathful."
elif grep -qi 'hail' <<< $condition; then
	comment=" Hail. Stay inside."
elif grep -qi 'tornado' <<< $condition; then
	comment=" Tornado. Stay inside. Or don't. You'll probably never see this text. Basement? Be careful."
else
    comment=" Look out the window."
fi

DIR="$(dirname "$0")"

COMMENT=false
NOTIFY=false

for arg in $@; do
    [ $arg = notify ] && NOTIFY=true
    [ $arg = comment ] && COMMENT=true
done

[ $COMMENT = false ] && comment=""


if [ $NOTIFY = true ]; then
    dunstify -I "$DIR/weather.svg" "$temperature" "$comment"
else
    printf "$temperature$comment"
fi


# Powered by Dark Sky. See more: https://darksky.net/poweredby/
