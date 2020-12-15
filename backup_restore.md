If infrastructure is not in desired state, try to fix in using ansible playbook first:

On Management machine go to ansible directory and run the "infra.yaml" playbook.

'''
cd /home/aleke/University/Semester#3/InfrastructureServices/ica0002/
ansible-playbook infra.yaml
'''

=================== RESTORING PROCESS FOR AGAMA ======================

On Management host machine open terminal and enter the following command to connect to AlekefromKz-1

'''
ssh ubuntu@193.40.156.86 -16722
'''


After successgull connection to AlekefromKz-1 your terminal should look like following:

'''
ubuntu@AlekefromKz-1:~$
'''

After run the following commands to become root 

'''
sudo su - 
'''
'''
su backup
'''

Then execute following command to download restore files from backup server (executes in one line). Example for <backup-needed-date> format: backup-24-12-2020
duplicity --no-encryption restore rsync://MrLightWood@backup.jagama.lw//home/MrLightWood/backup-<backup-needed-date>/vm1/agama /home/backup/restore/agama.sql
Congratulations! You have downloaded the needed restore files from backup server. Now we have to revive MySQL data from our backup agama.sql file
Open the mysql folder in restore folder
cd /home/backup/restore/mysql
And execute the following command
mysql agama < agama.sql

After successful execution of previous command feel free to exit VM-1 machine

=================== RESTORING PROCESS FOR VM-2 ======================

On Management host machine open terminal and type following command to connect to VM-2
ssh -p10122 ubuntu@193.40.156.86
Then run the following commands
sudo -i
su backup
Then execute following command to download restore files from backup server (executes in one line). Example for <backup-needed-date> format: backup-24-12-2020
duplicity --no-encryption restore rsync://MrLightWood@backup.jagama.lw//home/MrLightWood/backup-<backup-needed-date>/vm3 /home/backup/restore
After you downloaded your restoration files, please become a root user. Just type exit and you should return to root user
exit
After you become root, execute the following command
mv /home/backup/restore/grafana/grafana.db /var/lib/grafana/grafana.db
And execute the next command as root too
influxd restore -database telegraf -datadir /var/lib/influxdb/data /home/backup/restore/influxdb
And restart telegraf service (also as root)
service influxdb restart

Backup restoration instructions for services:

Perform current operations on Management Client
 ...
 5) Grafana
 ---
 
 
 Restore the data from backup, enter MrLightWood-1 first:
 
 ssh -p10122 ubuntu@193.40.156.86
 sudo su  backup
 [enter password for backup user]
 cd #
 cd restore/grafana
 cp grafana.db /var/lib/grafana/grafana.db
 
 InfluxDB
 ---
 
 Enter MrLightWood-1 with user backup and enter the password.
 
influxd restore -database latency -datadir /var/lib/influxdb/data /home/backup/restore/restore-{lastDateOfBackup}/influxdb/

Then, perform restart of the service:
service influxdb restart



