# Wundertray
[Wunderlist](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiU4M3-xdDNAhUFeD4KHUvUB6EQFggeMAA&url=https%3A%2F%2Fwww.wunderlist.com%2F&usg=AFQjCNFwy1qRZEmWxJGj9LgBY0XrzcrzWg&sig2=5yY6hKfVNtoAO25_SBv89A) tray icon for [i3 wm](https://i3wm.org).

You need wunderlist chrome app already installed also better to add these 2 lines to your i3 config file:
```
for_window [title="Wunderlist$"] floating enable
for_window [title="Wunderlist$"] move to scratchpad
```

# Installation
```
make
sudo make install
```
