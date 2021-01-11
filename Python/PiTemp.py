#! /usr/bin/env python
# -*- coding: utf-8 -*-

# These are some of the imports / packages we need !
import random
import time
import requests
import drivers
from datetime import datetime

# Setup LCD display #
display = drivers.Lcd()

# Config #
# Delay = how often it will update in seconds
# TempatureURL is the URL that returns the tempature
# Display LCD backlight enables or disables backlight
# 0 = backlight disabled | 1 = backlight enabled
delay = 10
TempatureURL = "http://IPaddress/GetTemp.php"
display.lcd_backlight(1)


# Constant loop that will update display with tempature
# Default loop time is 60 seconds / 1 minute
# Makes a simple GET request to grab tempature value from server
# This will also display the current time on top row of LCD display
while True:

    Req = requests.get(TempatureURL)
    Temp = Req.text
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    display.lcd_display_string(now.strftime("%H:%M:%S"), 1)
    display.lcd_display_string(Temp, 2)
    time.sleep(delay)
    display.lcd_clear()
