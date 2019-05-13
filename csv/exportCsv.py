import pymongo
import csv
import bs4,requests

mongo_url = "127.0.0.1:27017"
client = pymongo.MongoClient(mongo_url)
DATABASE = "medical"
db = client[DATABASE]
COLLECTION = "hosinfos"
db_coll = db[COLLECTION ]
queryRes=db_coll .find()

with open('output.csv','w',newline='',encoding='utf-8-sig') as outputFile:
	outputWrite=csv.writer(outputFile)
	outputWrite.writerow(['_id','uid','title','detailUrl','address','phoneNumber','tags'])
	for row in queryRes:
		reslist=[]
		for i in row:
			reslist.append(row[i])
		outputWrite.writerow(reslist)
with open('output.csv','r',newline='',encoding='utf-8-sig') as outputFile:
	ratefile=open('rate_num.csv','w',newline='',encoding='utf-8-sig')
	rateWrite=csv.writer(ratefile)
	rateWrite.writerow(['uid','title','rate_num'])
	freader=csv.reader(outputFile)
	for i,row in enumerate(freader):
		if i>0:
			try: 
				#print(row[3])
				resli=[]
				uid=row[1]
				resli.append(uid)
				url=row[3]
				res=requests.get(url,timeout=10)
				res.raise_for_status()
				res.encoding=res.apparent_encoding
				noStarchSoup=bs4.BeautifulSoup(res.text)
				title=noStarchSoup.select('.ellipsis')[0].getText()
				resli.append(title)
				try:
					rate_num=noStarchSoup.select('.rate-num')[0].getText()
					resli.append(rate_num)
					rateWrite.writerow(resli)
				except Exception as e:
					rate_num='未知'
					resli.append(rate_num)
					rateWrite.writerow(resli)
					#print(noStarchSoup.select('#detailInfo'))'''
			except Exception as e:
				print(str(e))
				pass