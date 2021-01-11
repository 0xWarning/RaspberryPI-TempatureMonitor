# RaspberryPI-TempatureMonitor
This is a very simple website that will show you , your current raspberry PI temperature via local web server , this project uses "Charts.js" for a visual display and runs on apache.

![Alt text](https://i.imgur.com/Y1TIiiA.png "Example")


## Install / setup
```
* sudo apt update (upgrade package lists)
* sudo apt upgrade (upgrade all packages to latest version)
* sudo apt install mariadb-server (install mariaDB)
* sudo mysql_secure_installation (setup mySQL install)
* sudo mysql -u root -p
* GRANT ALL PRIVILEGES ON tempmonitor.* TO 'username'@localhost IDENTIFIED BY 'password'; (replace username / password)
* sudo apt-get install phpmyadmin (install phpmyadmin)
* sudo ln -s /usr/share/phpmyadmin /var/www/html 
* sudo visudo
* www-data ALL=NOPASSWD: /opt/vc/bin/ (add this at the bottom , CTRL X to get out + Y to save)

put all website files into /var/www/html/
```
## SQL setup (DB)
```
Database name (default) : tempmonitor
Table name (default) :  info
Rows (default) : ID (auto increment), Time (Var char length 10) , Temp (int 10)
Alternatively , load the info.SQL file into phpmyadmin (it will create all the tables / rows)
```

##  Configuration
```
DB.php (add database information here , username , password , table ect)
Script.JS (update your IP at the top where it says "Server")
Script.JS (Pi_monitor = true) // Default / switch to false for non raspberry PI
Script.JS (Update device name by changing the variable called "Device")
```

## Monitor different device
```
curl -d "{"ID": "DEFAULT","Temp": "{temp}","Time": "{Time}"}" -X POST http://YourLocalIP/AddTemp.php
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET http://YourLocalIP/GetTemp.PHP
```

## Clear records automatically
```
sudo mysql -u root -p
SET GLOBAL EVENT_SCHEDULER = ON;  (paste this)
Execute SQL query -> CREATE EVENT `name` ON SCHEDULE EVERY 1 DAY ON COMPLETION NOT PRESERVE ENABLE DO TRUNCATE 'tblName';
```

## Python + I2C LED display
![Alt text](https://cdn.discordapp.com/attachments/549238444610682880/797991922705629194/20210111_005311.jpg "Example")

## Information
```
 - This is a very basic task that uses python to display tempature on a small LED display
 - This uses the tempature php page made previously
 - This uses 'requests' to grab the tempature from the website
 - The only information show is the current tempature value & current time
```
Great examples and helpful guides for setting up LED display !                           
[the-raspberry-pi-guy(LCD setup)](https://github.com/the-raspberry-pi-guy/lcd "Pi guy repo")


## Python LED display (I2C)
```
* sudo apt install git
* cd /home/pi/
* git clone https://github.com/the-raspberry-pi-guy/lcd.git 
* cd lcd/
* sudo ./install.sh
* Now add python file (PiTemp.py) to /lcd
* Python PiTemp.py
```

## Python Configuration
```
# Delay = how often it will update in seconds
# TempatureURL is the URL that returns the tempature
# Display LCD backlight enables or disables backlight
# 0 = backlight disabled | 1 = backlight enabled 
```
## 16x2 I2C LCD setup to raspberry PI
```
GND on LCD goes to pin 6 on the raspberry pi
VCC on LCD goes to pin 4 on the raspberry pi
SDA on LCD goes to pin 3 on the raspberry pi
SCL on LCD goes to pin 5 on the raspberry pi
```
![Alt text](https://www.bigmessowires.com/wp-content/uploads/2018/05/Raspberry-GPIO.jpg "GPIO")
![Alt text](https://tutorials-raspberrypi.de/wp-content/uploads/20151015_113929-600x338.jpg "LCD 16x2")
```
Admin@hvh.site
```
