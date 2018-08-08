# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MyscrapyItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title=scrapy.Field();
    author=scrapy.Field();
    link=scrapy.Field();
    discribe=scrapy.Field();
    comment=scrapy.Field();

class MMItem(scrapy.Item):
    _id=scrapy.Field();
    #标题
    title=scrapy.Field();
    #网络地址
    netUrl=scrapy.Field();
    #爬取时间
    scrapyTime=scrapy.Field();
    #发布时间
    publishTime=scrapy.Field();
    #浏览数量
    scanCount=scrapy.Field(); 
    #图片数量
    mmCount=scrapy.Field();
    #本地目录地址
    dirPath=scrapy.Field();
