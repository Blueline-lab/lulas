from lulas import Lulas
import concurrent.futures
import datetime
import time

filters = {}



lus = Lulas(filters)
lus.ip_to_list()




def insert_ip():
  lus.insert_json("/home/nameservers.json")

  






print(lus.sys_max_threads)
print(len(lus.ip_list))
print(lus.sys_max_threads)
print(lus.number_of_pool)


with concurrent.futures.ThreadPoolExecutor(lus.sys_max_threads) as executor:
  ping_hosts = [executor.submit(lus.command, ip) for ip in lus.ip_list]
  
