#!/usr/bin/env python
#coding=utf-8

import os
import time
import threading
import re
from multiprocessing import Pool, cpu_count

import requests
from bs4 import BeautifulSoup

HEADERS = {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Referer': "http://www.cnblogs.com"
}

DIR_PATH = r"E:\mmjpg1"      # 下载图片保存路径


def save_pic(pic_src, pic_cnt):
    """
    将图片下载到本地文件夹
    """
    try:
        img = requests.get(pic_src, headers=HEADERS, timeout=10)
        img_name = "pic_cnt_{}.jpg".format(pic_cnt + 1)
        with open(img_name, 'ab') as f:
            f.write(img.content)
            print(img_name)
    except Exception as e:
        print(e)


def make_dir(folder_name):
    """
    新建套图文件夹并切换到该目录下
    """
    path = os.path.join(DIR_PATH, folder_name)
    # 如果目录已经存在就不用再次爬取了，去重，提高效率。存在返回 False，否则反之
    if not os.path.exists(path):
        os.makedirs(path)
        print(path)
        os.chdir(path)
        return True
    print("Folder has existed!")
    return False


def delete_empty_dir(save_dir):
    """
    如果程序半路中断的话，可能存在已经新建好文件夹但是仍没有下载的图片的
    情况但此时文件夹已经存在所以会忽略该套图的下载，此时要删除空文件夹
    """
    if os.path.exists(save_dir):
        if os.path.isdir(save_dir):
            for d in os.listdir(save_dir):
                path = os.path.join(save_dir, d)     # 组装下一级地址
                if os.path.isdir(path):
                    delete_empty_dir(path)      # 递归删除空文件夹
        if not os.listdir(save_dir):
            os.rmdir(save_dir)
            print("remove the empty dir: {}".format(save_dir))
    else:
        print("Please start your performance!")     # 请开始你的表演


def validateTitle(title):
    rstr = r"[\/\\\:\*\?\"\<\>\|]"  # '/ \ : * ? " < > |'
    new_title = re.sub(rstr, "_", title)  # 替换为下划线
    return new_title

def downloadTip(url_src,title):
    '''
    下载正文
    '''
    content = requests.get(url_src, headers=HEADERS, timeout=10)
    #title=title.encode('ISO-8859-1').decode('utf-8')
    title = validateTitle(title)
    with open(u"{title}.html".format(title=title), 'ab') as f:
        f.write(content.content)
        print(title)     

lock = threading.Lock()     # 全局资源锁


def urls_crawler(url):
    """
    爬虫入口，主要爬取操作
    """
    try:
        r = requests.get(url, headers=HEADERS, timeout=10).text
        for blog_item in BeautifulSoup(r, 'lxml').find_all('div', class_='post_item_body'):
            #找到作者网址名称
            author= blog_item.find('h3').find('a')['href'].split('/')[3];
            #作者昵称
            author_name= blog_item.find('div',class_='post_item_foot').find_all('a')[0].text
            make_dir(author_name)
            #找到作者地址
            author_url='https://www.cnblogs.com/{author}'.format(author=author);
            #判断是否分页
            c=requests.get(author_url, headers=HEADERS, timeout=10).text
            if BeautifulSoup(c, 'lxml').find('div', id='nav_next_page') is None:
                #没有分页
                 #根据作者地址查询所有文章名称和地址
                for author_blog_item in BeautifulSoup(c, 'lxml').find_all('div', class_='postTitle'):
                    title=author_blog_item.find('a').text
                    title = validateTitle(title)
                    #查找文章标题
                    title_url=author_blog_item.find('a')['href']
                     #查找文章地址
                    downloadTip(title_url,title)
                     #下载文章内容
            else:
               #有分页获取作者文章页数
               second_url='http://www.cnblogs.com/{author}/default.html?page=2'.format(author=author)
               a=requests.get(second_url, headers=HEADERS, timeout=10).text
               #获取数组长度
               blog_count =len(BeautifulSoup(a, 'lxml').find('div',class_='pager').find_all('a'))
               #获取最大页数(有末页和无末页)              
               max_count= blog_count-1
               max_key=BeautifulSoup(a, 'lxml').find('div',class_='pager').find_all('a')[blog_count-1].text
               if max_key=='末页':
                   max_count=BeautifulSoup(a, 'lxml').find('div',class_='pager').find_all('a')[blog_count-1]['href'].split('=')[1]
               for count in range(1,int(max_count)):
                   temp_url='http://www.cnblogs.com/{0}/default.html?page={1}'.format(author,count)
                   d= requests.get(temp_url, headers=HEADERS, timeout=10).text
                   for author_blog_item in BeautifulSoup(d, 'lxml').find_all('div', class_='postTitle'):
                        title=author_blog_item.find('a').text
                        #查找文章标题
                        title_url=author_blog_item.find('a')['href']
                         #查找文章地址
                        downloadTip(title_url,title)
                        #下载文章内容
                   
                                         
    except Exception as e:
        print(e)


if __name__ == "__main__":
	for cnt in range(2,200):
		urls_crawler('https://www.cnblogs.com/#p{cnt}'.format(cnt=cnt))