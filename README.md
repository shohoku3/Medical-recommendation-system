## Medical-recommendation-system
#### 描述
一个基于协同过滤的医疗推荐系统
#### 需求
- 根据个人需求制定距离近，医疗条件好，实惠亲民的医院，。
- 研究腾讯地图API的使用，获得地图上的医疗资源数据，根据查询者的地理位置计算路程、并给出合理的推荐。
- 基于腾讯地图提供开发的开放的javascriptAPI,编程实现业务相关的门店信息搜集系统，该系统的主要功能是搜集相关的医院信息，然后结构化提取并存入数据库，并提供检索功能、导出到excel表功能，。
- 用户注册(注册用电话号码)时要求选择自己感兴趣的关键词信息，注册后整个页面有关于用户的个性化推荐(网页下方有根据用户的兴趣而推荐的医院或者医师)
- 用户搜索时，可以根据自己输入的信息来匹配到合理的医疗资源，医疗资源包括:1、医院的等级，科室，设备，药物资源情况《价格)，医师的相关信息:药店的药物资源情况及营业时间
- 诊所里医生的坐诊时间和基本信息，药物资源情况等。最后根据用户选择的资源进行匹配导院《路线，公交) 

#### ToDoList
##### 05-06
- [ ] 学习推荐系统的核心内容
- [ ] 基于腾讯地图api结构化提取医疗资源信息并提取
- [ ] 无法解决UI中点击动画不响应问题
- [x] 环境搭建完成
##### 05-07
- [x] 注册 登出功能
- [ ] 无法解决fs.unlink 问题
- [ ] 

#### 参考
- [A Programmer's Guide to Data Mining](http://www.guidetodatamining.com/)
- [超级详细的协同过滤推荐系统+完整Python实现及结果](https://blog.csdn.net/qq_25948717/article/details/81839463)
- [Nodejs与Python脚本语言混编](https://blog.csdn.net/allocator/article/details/51724406)
- [Pandas 中文文档](https://www.pypandas.cn/intro/home.html)
- [互联网+药店推荐系统的设计与实现](https://blog.csdn.net/huangjun0210/article/details/81448922)


