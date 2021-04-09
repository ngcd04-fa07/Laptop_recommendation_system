# -*- coding: utf-8 -*-
"""
Created on Fri Oct 30 21:25:15 2020

@author: Tejaswi
"""

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
driver=webdriver.Chrome('C:\chromedriver')
products=[] #List to store name of the product
images=[]    #List to store image of the product
i=0
p=0
driver.get("https://www.flipkart.com/search?sid=6bo%2Cb5g&otracker=CLP_Filters&p%5B%5D=facets.availability%255B%255D%3DInclude%2BOut%2Bof%2BStock&page=1")
while(i<147):
    for t in range(8500):
        driver.execute_script("window.scrollTo(0,"+str(t)+");")
    content = driver.page_source
    time.sleep(5)
    soup = BeautifulSoup(content,"lxml")
    for a in soup.findAll('a',href=True, attrs={'class':'_31qSD5'}):
        name=a.find('div', attrs={'class':'_3wU53n'})
        products.append(name.text)
    try:
        r=driver.find_elements_by_class_name('_3fVaIS')
        x=driver.find_elements_by_class_name('_3BTv9X')
        for y in x:
            c=y.find_element_by_tag_name('img')
            images.append(c.get_attribute('src'))
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
        time.sleep(5)
    except (TimeoutException, WebDriverException) as e:
        print(e)
        break
    i+=1
df = pd.DataFrame({'Product':products,'Image Link:':images})
df.to_csv('laptops_images.csv', index=False, encoding='utf-8')