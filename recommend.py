import pandas as pd
movies=pd.read_csv('.\\csv\\movies.csv')
ratings=pd.read_csv('.\\csv\\ratings.csv')
data=pd.merge(movies,ratings,on='movieId')
data[['userId','rating','movieId','title']].sort_values('userId').to_csv('.\\data.csv',index=False)
