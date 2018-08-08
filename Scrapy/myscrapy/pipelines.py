# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import mymssql as sql

from pymongo import MongoClient

from scrapy.pipelines.images import ImagesPipeline

index = 0

#创建数据库链接实例
ms= sql.MSSQL(host=".",user="sa",pwd="123456",db="blog")

class BlogPipeline(object):
    def process_item(self, item, spider):
        global index
        index=index+1
        ms.ExecNonQuery(u"insert into blog_basic values (newid(),{0},'{1}','{2}','{3}','{4}','{5}',GETDATE())".format(index,item['title'],item['author'],item['link'],item['discribe'],item['comment']).encode('utf-8'))
        return item

class MMPipeline(object):
    def process_item(self,item,spider):      
        client =MongoClient('localhost',27017)
        db= client.mm_database;
        collect=db.mm_collect;
        collect.insert(item);

