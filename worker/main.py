from lulas import Engine
import concurrent.futures
import datetime
import time

zone = {}
#"country_code": "PT"
time_between_scans = 400
lus = Engine(zone)
lus.ip_to_list()




def insert_ip():
  lus.insert_json("/home/nameservers.json")

  




print(f"_____Start this checker number of host to check : {lus.number_of_doc}")


executor = concurrent.futures.ThreadPoolExecutor(lus.number_of_doc)
ping_hosts = [executor.submit(lus.command, ip) for ip in lus.ip_list]
