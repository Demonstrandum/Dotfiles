ARGV=("$@")
word=${ARGV[0]}
time=${ARGV[1]}

if [ -z "$word" ]; then
	word="poke."
fi

if [ -z "$time" ]; then
	time="0.3"
fi

while true; do
	xdotool type "$word"
	xdotool key Return
	sleep "$time"
done
