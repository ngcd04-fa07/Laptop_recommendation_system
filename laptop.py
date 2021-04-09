# -*- coding: utf-8 -*-
"""
Created on Thu Aug  6 02:00:51 2020

@author: Tejaswi
"""

from selenium import webdriver
from selenium.common.exceptions import TimeoutException, WebDriverException
from bs4 import BeautifulSoup 
import time
import pandas as pd
driver=webdriver.Chrome('C:\chromewebdriver\chromedriver')
products=[] #List to store name of the product
prices=[] #List to store price of the product
ratings=[] #List to store rating of the product
processor=[] #List to store processor details of the product
os=[] #List to store os details of the product
ram=[] #List to store ram details of the product
storage=[] #List to store storage details of the product
display=[] #List to store display details of the product
i=0
p=0
driver.get("https://www.flipkart.com/search?sid=6bo%2Cb5g&otracker=CLP_Filters&p%5B%5D=facets.availability%255B%255D%3DInclude%2BOut%2Bof%2BStock&page=1")
time.sleep(10)
while(i<147):
    content = driver.page_source
    soup = BeautifulSoup(content,"lxml")
    for a in soup.findAll('a',href=True, attrs={'class':'_31qSD5'}):
        name=a.find('div', attrs={'class':'_3wU53n'})
        price=a.find('div', attrs={'class':'_1vC4OE _2rQ-NK'})
        rating=a.find('div', attrs={'class':'hGSR34'})
        products.append(name.text)
        prices.append(price.text)
        if(rating!=None):
            ratings.append(rating.text)
        else:
            ratings.append('')
    try:
        li=driver.find_elements_by_class_name("vFw0gD")
        for j in li:
            t=j.find_elements_by_tag_name('li')
            pro=t[0].text
            o=t[2].text
            ra=t[1].text
            st=t[3].text
            dis=t[4].text
            processor.append(pro)
            ram.append(ra)
            os.append(o)
            storage.append(st)
            display.append(dis)
        r=driver.find_elements_by_class_name('_3fVaIS')
        for j in r:
            if(i==0):
                j.click()
                break
            else:
                if(p==0):
                    p+=1
                    continue
                else:
                    j.click()
                    break
            p+=1
        p=0
        print("Navigating to Next Page")
        time.sleep(10)
    except (TimeoutException, WebDriverException) as e:
        print(e)
        break
    i+=1
df = pd.DataFrame({'Product':products,'Price':prices,'Processor':processor,'RAM':ram,'Operating System':os,'Storage':storage,'Display':display,'Rating':ratings})
df.to_csv('laptops.csv', index=False, encoding='utf-8')