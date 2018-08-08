# -*- coding: utf-8 -*-
import scrapy
import datetime
import os
import requests

from myscrapy.items import MMItem

mm_dic=r'E:\mmjpg'  #图片根目录

HEADERS = {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Referer': "http://www.mmjpg.com"
}

class MMSpider(scrapy.Spider):
    name = 'mm'
    allowed_domains = ['www.mmjpg.com']
    start_urls = ['http://www.mmjpg.com']

    def parse(self, response):
        #解析所有列表信息
        mm_ul=response.xpath("//div[@class='main']/div[@class='pic']/ul/li")
        for mm_li in mm_ul:
            #获取列表信息
            item=MMItem()
            item['title']=mm_li.xpath("./span[@class='title']/a/text()").extract_first()
            item['_id']=item['title']
            item['netUrl']=mm_li.xpath("./span[@class='title']/a/@href").extract_first()
            item['scrapyTime']=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            item['publishTime']=mm_li.xpath("./span[2]/text()").extract_first()
            item['scanCount']=mm_li.xpath("./span[3]/text()").extract_first()
            yield scrapy.Request(url=item['netUrl'],meta={'item':item},callback=self.detail_parse)
           
        #找到下一页的地址
        next_url_text=response.xpath("//div[@class='page']/a/text()").extract()[-2];
        if next_url_text == '下一页':
            next_url=response.xpath("//div[@class='page']/a/@href").extract()[-2];
            yield self.make_requests_from_url(u'http://www.mmjpg.com'+next_url);

    def detail_parse(self,response):
        #集成传送的元数据信息
        item=response.meta['item']
        #解析所有详情信息
        item['mmCount'] = response.xpath("//div[@class='page']/a/text()").extract()[-2];
        #设置图片的文件目录
        path = os.path.join(mm_dic,'{0}({1}p)'.format(item['title'],item['mmCount']))
        item['dirPath']=path
        if not os.path.exists(path):
            os.makedirs(path)
            os.chdir(path)
        else:
            print('this mm {0} has scarpyed'.format(item['title']));
            return
        yield item
        #得到所有图片的地址
        mm_urls = [item['netUrl'] + "/" + str(i) for i in
                             range(1, int(item['mmCount']) + 1)]
        index=0;
        for mm_jpg_url in mm_urls:
            index=index+1
            yield scrapy.Request(url=mm_jpg_url,meta={'savePath':os.path.join(item['dirPath'],"pic_cnt_{}.jpg".format(index))},callback=self.download_jpg);

    def download_jpg(self,response):
        src=response.xpath("//div[@class='content']/a/img/@src").extract_first();
        try:
            img = requests.get(src, headers=HEADERS, timeout=10)
            with open(response.meta['savePath'], 'ab') as f:
                f.write(img.content)
        except Exception as e:
            print(e)



