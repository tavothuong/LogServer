=============
config rsyslog
=============

# in /etc/rsyslog.conf enable udp to receive log on port 514

	module(load="imudp")
	input(type="imudp" port="514")

# To format log to json, in /etc/rsyslog.d/01-json-template.conf, replace to:[here](https://github.com/tavothuong/LogServer/tree/master/config/json-template.conf)


# To send log to logstash,in /etc/rsyslog.d/60-output.conf add line:

	*.*                         @0.0.0.0:10514;json-template

	
=============
config logstash
=============

# in /etc/logstash/conf.d/logstash.conf, replace to: [here](https://github.com/tavothuong/LogServer/tree/master/config/logstash.conf)


=============
start elasticsearch and kibana
=============

# run docker in docker folder

	docker-compose up

