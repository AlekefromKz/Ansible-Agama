If infrastructure is not in desired state, try to fix in using ansible playbook first:

On Management machine go to ansible directory and run the "infra.yaml" playbook.

```
cd /home/aleke/University/Semester#3/InfrastructureServices/ica0002/
``` 
```
ansible-playbook infra.yaml 
```

Below are written detailed restourarion processes for MySQL agama database, InfluxDB telegraf database and Grafana's grafana.db file. 


=================== RESTORING PROCESS FOR AGAMA ======================

On Management host machine open terminal and enter the following command to connect to AlekefromKz-1

```
ssh ubuntu@193.40.156.86 -16722
```


After successgull connection to AlekefromKz-1 your terminal should look like following:

```
ubuntu@AlekefromKz-1:~$
```

After run the following command to become root:

```
sudo su - 
```
Now run the following command to become backup user:

```
su - backup
```

Now execute the following command to download sql file from the backup server. Folder names on the backup server are created using dates in such pattern: backup-year-month-day['%Y-%m-%d']. For date choose closest sunday to the state you want to download. Example for "backup-2020-12-13": 

```
duplicity --no-encryption restore rsync://AlekefromKz@backup.aleke.kz//home/AlekefromKz/backup-backup-2020-12-13/agama ~/restore/agama.sql
```

You successfully downloaded the required file from the remote backup host! The last step left! 

Execute the following command to use the downloaded file:

```
mysql agama < ~/restore/agama.sql
```

Here we go! Congratulations! Now you can log out from remote host by just closing the terminal or 'exit' comand. In the second case you firstly will become root. You shoul enter 'exit' command again to log out from the managed host AlekefromKz-1.






=================== RESTORING PROCESS FOR Telegraf ======================
On Management host machine open terminal and enter the following command to connect to AlekefromKz-1

```
ssh ubuntu@193.40.156.86 -16722
```


After successgull connection to AlekefromKz-1 your terminal should look like following:

```
ubuntu@AlekefromKz-1:~$
```

After run the following command to become root:

```
sudo su - 
```

Now run the following command to become backup user:

```
su - backup

```

Now execute the following command to download sql file from the backup server. Folder names on the backup server are created using dates in such pattern: backup-year-month-day['%Y-%m-%d']. For date choose closest sunday to the state you want to download. Example for "backup-2020-12-13": 

```
duplicity --no-encryption restore rsync://AlekefromKz@backup.aleke.kz//home/AlekefromKz/backup-backup-2020-12-13/telegraf ~/restore/telegraf
```

You successfully downloaded the required file from the remote backup host! 

Now become a root user. Just type exit and you should return to root user:

```
exit
```

After you became root, execute the following command:

```
influxd restore -database telegraf -datadir /var/lib/influxdb/data /home/backup/restore/influxdb
```

Now restart influxdb service:
```
service influxdb restart
```

Here we go! You successfully finished restouration process!






=================== RESTORING PROCESS FOR Grafana ======================
On Management host machine open terminal and enter the following command to connect to AlekefromKz-1

```
ssh ubuntu@193.40.156.86 -16722
```


After successgull connection to AlekefromKz-1 your terminal should look like following:

```
ubuntu@AlekefromKz-1:~$
```

After run the following command to become root:

```
sudo su - 
```

Now run the following command to become backup user:

```
su - backup

```

Now execute the following command to download sql file from the backup server. Folder names on the backup server are created using dates in such pattern: backup-year-month-day['%Y-%m-%d']. For date choose closest sunday to the state you want to download. Example for "backup-2020-12-13": 

```
duplicity --no-encryption restore rsync://AlekefromKz@backup.aleke.kz//home/AlekefromKz/backup-backup-2020-12-13/grafana ~/restore/grafana
```

You successfully downloaded the required file from the remote backup host! 

Now become a root user. Just type exit and you should return to root user:

```
exit
```

After you became root, execute the following command:

```
mv /home/backup/restore/grafana/grafana.db /var/lib/grafana/grafana.db
```

Here we go! You successfully finished restouration process!







