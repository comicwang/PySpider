#!/usr/bin/env python
# -*- coding: utf-8 -*-
#导入smtplib和MIMEText

import smtplib
from email.mime.text import MIMEText

class Sendmail(object):

    def __init__(self, mailHost, mailUser, mailPwd):

        self.mailHost = mailHost;
        self.mailUser = mailUser;
        self.mailPwd = mailPwd;
        self.sendList = [];

#function subject->title
    def setMailInfo(self, sendList,subject, content):
        self.sendList = sendList
        self.content = content;
        self.subject = subject;
        self.msg = MIMEText(self.content)
        self.msg['From'] = self.mailUser
        self.msg['Subject'] = self.subject
        self.msg['To'] = ";".join(self.sendList)
    def run(self):
        try:
            self.send = smtplib.SMTP()
            self.send.connect(self.mailHost)
            self.send.login(self.mailUser, self.mailPwd)
            self.send.sendmail(self.mailUser, self.sendList, self.msg.as_string())
            print('[*]-----send mail---to' + str(self.sendList) + 'success-----[*]')
        except smtplib.SMTPException as e:
            print(e)

if __name__ == '__main__':
    p = Sendmail('smtp.qq.com', '672802899@qq.com', 'sutyidvzdlxqbfbg')
    p.setMailInfo(['672802899@qq.com'], '我的测试邮件', '测试邮件内容')
    p.run()