# -*- coding: utf-8 -*-
import scrapy

from myscrapy.items import MyscrapyItem

class BlogSpider(scrapy.Spider):
    name = 'blog'
    allowed_domains = ['www.cnbolgs.com']
    start_urls = ['https://www.cnblogs.com/']

    def parse(self, response):
        blogs=response.xpath("//div[@class='post_item_body']")
        for b_item in blogs:
            item=MyscrapyItem()
            item["title"]=b_item.xpath("./h3/a[@class='titlelnk']/text()").extract()[0].strip()
            item["link"]=b_item.xpath("./h3/a[@class='titlelnk']/@href").extract_first().strip()
            item["discribe"]=b_item.xpath("./p[@class='post_item_summary']/text()").extract_first().strip()
            item["author"]=b_item.xpath("./div[@class='post_item_foot']/a[@class='lightblue']/text()").extract_first().strip()
            item["comment"]=b_item.xpath("./div[@class='post_item_foot']/span[@class='article_comment']/a[@class='gray']/text()").extract_first().strip()
            yield item
        next_links=response.xpath("//div[@class='pager']/a[last()]")
        for next_link in next_links:
            if next_link.xpath("./text()").extract_first() == 'Next >':
                next_link_href=next_link.xpath("./@href").extract()[0]
                yield self.make_requests_from_url(u"https://www.cnblogs.com"+next_link_href)

