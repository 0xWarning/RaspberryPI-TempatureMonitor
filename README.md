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
Table name (defaul) :  info
Rows (default) : ID (auto increment), Time (Var char length 10) , Temp (int 10)
```

##  Configuration
```
DB.php (add database information here , username , password , table ect)
Script.JS (Update addresses for web pages PI.php / GetTemp.php)
Script.JS (Pi_monitor = true) // Default / switch to false for non raspberry PI
```

## Monitor different device
```
curl -d "{"ID": "DEFAULT","Temp": "{temp}","Time": "{Time}"}" -X POST http://YourLocalIP/AddTemp.php
curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET http://YourLocalIP/GetTemP.PHP
```




```
Admin@hvh.site
```
