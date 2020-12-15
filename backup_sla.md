[INTRODUCTION]

Main product of my startup is Agama application. It is a simple Flask application, which can be used as to-do list. I try to do my best to let my customers be able to use Agama almost every time. It is done by using Keepalived, HAProxy, Docker and many other services, which I will mention later. I have three machines, two of which are used for aplication and the other one is for internal services. 



[SERVICES]

Application machines have following services: HAProxy, Keepalived, Dockerized agama, MySQL: Master and Slave, Bind slave, Prometheus node exporter and exporters for HAProxy, Keepalived, MySQL and Bind.

The third machine: Bind master, InfluxDB, Telegraf, Prometheus, Grafana, Nginx,  Prometheus node exporter and exporters for Nginx.

I configure Rsyslog as well, to be able to monitore my machines using Grafana.



[Backup coverage]

All services except MySQL, InfluxDB and Grafana can be restored using my infra.yaml ansible playbook. MySQL, InfluxDB and Grafana need to be backuped. 

MySQL contains customer information which was somewhen entered on Agama web app and I have to save this data as it is our main product. 

Telegraf transfers logs from syslog to InfluxDB and that is why Telegraf database in InfluxDB should be backed up as well.

Latency database should be backed up as well to check latency during specific time. 

The last service is Grafana. It is one of the most important parts of my monitoring and to be able to use old dashboards it should be backed up. 



[Backup RPO]

<!-- the amount of data that can be lost before significant harm to the business occurs -->

It is really hard to choose appropriate amount of time. In case my company members write to Agama some important data, then every minute costs a lot. In case of Agama, RPO is one hour.

Information saved in Latency, Telegraf and Grafana are not as valuable as Agama is and RPO is one day.



[Versioning and retention]

There is one backup onstite and one offsite. 

Backup of Agama and Telegraf should be stored for 8 weeks (56 days), while Latency and Grafana only for 4 weeks(28 days).

Every sunday I create folder on backup machine called "backup-%Y-%m-%d". For instance, backup-2020-12-13

And inside of this folder I create four following folders: agama, grafana, telegraf, latency. In these folders backups of different services are stored. Every sunday I do full backups and from Monday to Saturday incremental only. Backups are done at night as during that time services are less busy. 



[Usability]

1. Backup can be used. 
2. Backup was created in time.
3. Check if data and services can be restored using this backup.



[Restoration criteria]

1. Sensitive file has been deleted.
2. Services failed and they are hard or too long to be restored manually.
3. Services have been altered the infrastructure system with errors.
4. Hardware failure or replacement occured.
5. Manager could give special reason for it.




[Backup RTO]

30 minutes
