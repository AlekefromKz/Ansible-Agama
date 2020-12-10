This course helped me to understand how do many sevices work. Right now on two machines I have following services: Nginx, MySQL, bind9, uWSGI, Prometheus, Grafana, Telegraf, InfluxDB.


In this file I am going to describe the way I would backup my Infrastructure. To be honest, I have some doubts about what services to backup and what not to, but I will try do to my best. Let's assume our company is called Agama_Qazyna and the main product is Agama web app working on my first virtual machine. 


Part 1: Backup coverage

Services such as Nginx, bind9, uWSGI, Prometheus and Telegraf are easily installed and configured from my ansible playbook. That is why I am not going to backup these services. 

Coming to MySQL, InfluxDB and Grafana, these services are those I find need to be backuped. 

MySQL contains customer information was somewhen entered on Agama web app and we have to save this data as it is our main product. 

Telegraf transfers logs from syslog to InfluxDB and I should to backup only one of them. I am going ta backup InfluxDB only.

The last service is Grafana. Grafana's dashboards are not configured from ansible playbook and the way to restore beautiful graphs is JSON, which can be obtained in settings of a dashboard. I am going to backup such JSON files of all dashboards. 



Part 2: Backup RPO

<!-- the amount of data that can be lost before significant harm to the business occurs -->

It is really hard to choose appropriate amount of time. In case our company members write to Agama some important data, then every minute costs a lot.


Part 3: Versioning and retention 

There is one backup onstite and one offsite. Every backup should be stored for one month.


Part 4: Usability

No idea yet. Hope to understand it after next lecture


Part 5: Restoration criteria 

Backup shoul be restored as one on the services is crashed or if there is need to find old information

Part 6: Backup RTO

Agama service can not be down without causing substantial damage to the business. This high priority applications may only be down for a few seconds without incurring impact on employees and customers.


