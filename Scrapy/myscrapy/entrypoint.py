from scrapy.cmdline import execute

import time

while True:
    execute(['scrapy', 'crawl', 'mm']);
    time.sleep(10800)  #每隔3小时运行一次 24*60*60=86400s


