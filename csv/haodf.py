import csv
import pymongo
import bs4,requests
import re
url='https://www.haodf.com/yiyuan/gansu/list.htm'
def getHTMLText(url):
	fakeHeaders = {'user-agent':'Mozilla/5.0'}
	proxies = { "http": "http://155.138.214.221:1002" }   
	try:
		r = requests.get(url,headers = fakeHeaders , proxies=proxies,timeout=10)
		r.raise_for_status()
		r.encoding = r.apparent_encoding
		html=bs4.BeautifulSoup(r.text)
		return html
	except Exception as e:
		print(str(e))
html=getHTMLText(url)
province=html.select('.kstl2')[0].select('a')[0].getText()
print(province)

mongo_url = "127.0.0.1:27017"
client = pymongo.MongoClient(mongo_url)
DATABASE = "medical"
db = client[DATABASE]
COLLECTION =province+'医院信息表'
db_coll = db[COLLECTION ]


with open('.\\医院列表\\%s.csv'%(province),'w',newline='',encoding='utf-8-sig') as hosinfo:
	hosWrite=csv.writer(hosinfo)
	hosWrite.writerow(['title','tags','local_rate','whole_rate','total_traffic','total_patient','g_comment','b_comment','satisfaction_degree'])
	for i in range(len(html.select('.m_ctt_green'))):
		titlelist=html.select('.m_ctt_green')[i].select('a')
		tagslist=html.select('.m_ctt_green')[i].select('span')
		for k in range(len(titlelist)):
			title=titlelist[k].getText()
			href='https://www.haodf.com/'+titlelist[k]['href']
			tags=tagslist[k].getText()
			tagsRegex=re.compile(r'[(].{2,9}[)$]')
			tag=tagsRegex.findall(tags)
			tags=''.join(tag)
			print(tags)
			reslist=[]
			reslist.append(title)
			reslist.append(tags)
			html2=getHTMLText(href)
			hospital_influence=html2.select('.h-i-orange')
			if len(hospital_influence)!=0:
				if len(hospital_influence)==7:
					local_rate=hospital_influence[0].getText()
					whole_rate=hospital_influence[1].getText()
					total_traffic=hospital_influence[2].getText()
					total_patient=hospital_influence[3].getText()
					g_comment=hospital_influence[4].getText()
					b_comment=hospital_influence[5].getText()
					satisfaction_degree=hospital_influence[6].getText()
					hos={
					'title':title,
					'tags':tags,
					'local_rate':local_rate,
					'whole_rate':whole_rate,
					'total_traffic':total_traffic,
					'total_patient':total_patient,
					'g_comment':g_comment,
					'b_comment':b_comment,
					'satisfaction_degree':satisfaction_degree
					}
					db_coll.insert(hos)
					reslist.append(local_rate)
					reslist.append(whole_rate)
					reslist.append(total_traffic)
					reslist.append(total_patient)
					reslist.append(g_comment)
					reslist.append(b_comment)
					reslist.append(satisfaction_degree)
					hosWrite.writerow(reslist)
				else:
					local_rate=hospital_influence[0].getText()
					whole_rate='未知'
					total_traffic=hospital_influence[1].getText()
					total_patient=hospital_influence[2].getText()
					g_comment=hospital_influence[3].getText()
					b_comment=hospital_influence[4].getText()
					satisfaction_degree=hospital_influence[5].getText()
					hos={
					'title':title,
					'tags':tags,
					'local_rate':local_rate,
					'whole_rate':whole_rate,
					'total_traffic':total_traffic,
					'total_patient':total_patient,
					'g_comment':g_comment,
					'b_comment':b_comment,
					'satisfaction_degree':satisfaction_degree
					}
					db_coll.insert(hos)
					reslist.append(local_rate)
					reslist.append(whole_rate)
					reslist.append(total_traffic)
					reslist.append(total_patient)
					reslist.append(g_comment)
					reslist.append(b_comment)
					reslist.append(satisfaction_degree)
					hosWrite.writerow(reslist)
			else:
				hospital_influence=html2.select('.hp-i-orange')
				if len(hospital_influence)==7:
					local_rate=hospital_influence[0].getText()
					whole_rate=hospital_influence[1].getText()
					total_traffic=hospital_influence[2].getText()
					total_patient=hospital_influence[3].getText()
					g_comment=hospital_influence[4].getText()
					b_comment=hospital_influence[5].getText()
					satisfaction_degree=hospital_influence[6].getText()
					hos={
					'title':title,
					'tags':tags,
					'local_rate':local_rate,
					'whole_rate':whole_rate,
					'total_traffic':total_traffic,
					'total_patient':total_patient,
					'g_comment':g_comment,
					'b_comment':b_comment,
					'satisfaction_degree':satisfaction_degree
					}
					db_coll.insert(hos)
					reslist.append(local_rate)
					reslist.append(whole_rate)
					reslist.append(total_traffic)
					reslist.append(total_patient)
					reslist.append(g_comment)
					reslist.append(b_comment)
					reslist.append(satisfaction_degree)
					hosWrite.writerow(reslist)
				else:
					local_rate=hospital_influence[0].getText()
					whole_rate='未知'
					total_traffic=hospital_influence[1].getText()
					total_patient=hospital_influence[2].getText()
					g_comment=hospital_influence[3].getText()
					b_comment=hospital_influence[4].getText()
					satisfaction_degree=hospital_influence[5].getText()
					hos={
					'title':title,
					'tags':tags,
					'local_rate':local_rate,
					'whole_rate':whole_rate,
					'total_traffic':total_traffic,
					'total_patient':total_patient,
					'g_comment':g_comment,
					'b_comment':b_comment,
					'satisfaction_degree':satisfaction_degree
					}
					db_coll.insert(hos)
					reslist.append(local_rate)
					reslist.append(whole_rate)
					reslist.append(total_traffic)
					reslist.append(total_patient)
					reslist.append(g_comment)
					reslist.append(b_comment)
					reslist.append(satisfaction_degree)
					hosWrite.writerow(reslist)