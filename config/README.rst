=============
config rsyslog
=============

# in /etc/rsyslog.conf enable udp to receive log on port 514

	module(load="imudp")
	input(type="imudp" port="514")

# To format log to json, in /etc/rsyslog.d/01-json-template.conf, replace to

	template(name="json-template"
  		type="list") {
    		constant(value="{")
      			constant(value="\"message\":\"")     property(name="msg" format="json")
    		constant(value="\"}\n")
		}

# To send log to logstash,in /etc/rsyslog.d/60-output.conf add line:

	*.*                         @0.0.0.0:10514;json-template

	
=============
config logstash
=============

# in /etc/logstash/conf.d/logstash.conf, replace to:



	input {
	  udp {
	    host => "0.0.0.0"
	    port => 10514
	    codec => "json"
	  }
	}


	filter { 
		grok {
			match => {
				"message" => "%{TIMESTAMP_ISO8601:timestamp} %{GREEDYDATA:server}:%{GREEDYDATA:host} %{LOGLEVEL:loglevel} %{GREEDYDATA:key} %{GREEDYDATA:value}"	
			}
			overwrite => [ "host" ]
	    remove_field => ["message"] 
		}
		date {
	      	match => [ "timestamp", "ISO8601", "yyyy-MM-dd HH:mm:ss"]  
	      	target => "@timestamp"   
	        locale => "en" 
	        timezone => "Asia/Ho_Chi_Minh" 
	      	remove_field => ["timestamp"]
	  }
	  mutate {
	   lowercase => [ "server" ]
	  }

	  if "_grokparsefailure" in [tags] {
	   	drop { }
	  }
	}



	output {
	  	elasticsearch {
	      hosts => ["0.0.0.0:9200"]
	      index => "%{server}-%{+YYYY.MM.dd}"
	    }
	}

=============
start elasticsearch and kibana
=============

# run docker in docker folder

	docker-compose up

