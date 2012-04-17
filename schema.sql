


-- comments

drop table if exists entries;
create table entries(
  id integer primary key autoincrement,
  title string not null,
  text string not null
);





-- catagoues
	-- course catagoues
		-- catdetail
		-- 自然科学
		-- 人文与社会科学
		-- 财经管理
		-- 医学
		-- 农学
		-- 工程与科学技术
		-- 职业教育
	-- school catagoues
		-- 视频公开课,
		-- 精品课程,
			-- catdetail
			-- 国家级
			-- 省级
		-- 双语课程,
		-- 教学名师,
		-- 文化素质大讲坛,
			-- catdetail
			-- 访谈集锦
			-- 讲坛信息
			-- 我们的大讲坛
			-- 大讲坛相册
			-- 讲坛视频
		-- 师范生技能大赛,
		-- 校园文化活动


-- pages


drop table if exists catagoues;
create table catagoues(
  id integer primary key autoincrement,
  title string not null,
);
insert into catagoues values
	(null,'course'),
	(null,'school'),
	(null,'jpkc'),
	(null,'jiangtan');





drop table if exists catagoue_details;
create table catagoue_details(
  id integer primary key autoincrement,
  title string  not null,
  catid integer not null

);

insert into catagoue_details values
		(null,'自然科学','1'),
		(null,'人文与社会科学','1'),
		(null,'财经管理','1'),
		(null,'医学','1'),
		(null,'农学','1'),
		(null,'工程与科学技术','1'),
		(null,'职业教育','1')，

			(null,'访谈集锦','4')，
			(null,'讲坛信息','4')，
			(null,'我们的大讲坛','4')，
			(null,'大讲坛相册','4')，
			(null,'讲坛视频','4')；


 -- make it simple



drop table if exists school_catagoues;
create table school_catagoues(
  id integer primary key autoincrement,
  title string not null
);
insert into school_catagoues values
		(null,'视频公开课'),
		(null,'精品课程'),,
		(null,'双语课程'),,,
		(null,'教学名师'),
		(null,'文化素质大讲坛'),
		(null,'师范生技能大赛'),
		(null,'校园文化活动');










	-- 5月27日文化素质大讲坛：圆融的东方智慧...	正大集团副总裁 李闻海
	-- 4月15日文化素质大讲坛：从南越王墓发掘...	广东省文史馆史学院院长 黄淼章
	-- 4月25日文化素质大讲坛：明清史的"丁"...	中山大学历史系教授 黄国信
	-- 文化素质大讲坛：WTO非贸易议题之演变与...	暨南大学法学院副教授 吕国民
	-- 文化素质大讲坛：当前我国毒品违法犯罪问题...	广东警官学院副院长 任克勤教授
	-- schools teachers  videos videodetail catalogues catdetail pages





drop table if exists videos;
create table videos(
  id integer primary key autoincrement,
  title string not null,
  school string ,
  artist string ,
  img string ,
  uptime string,
  description text ,
  catagoue_details text
);

drop table if exists video_details;
create table video_details(
  id integer primary key autoincrement,

  -- vid integer not null,
  -- catId integer,
  -- tagId string ,
  -- artist integer not null,
  -- FOREIGN KEY(vid) REFERENCES videos(id),
  -- FOREIGN KEY(tagid) REFERENCES tags(id),
  -- FOREIGN KEY(artist) REFERENCES teachers(teacherid )
);



insert into videos values

(null,'数学文化',
'南开大学',
'顾沛',,'images/poplar1.gif','更新到第6集',
'“数学文化”课以难易适当的知识为载体介绍数学的思想、精神，提高学生的数学素养，特别注意科学精神与人文精神的融合。
	该课程注重知识性、趣味性、思想性、应用性的统一，注重师生互动。
	　　课程努力贯彻素质教育的思想， ...
'),

(null,'人体解剖学',
'中南大学',
'罗学港,卢大华','','',
'人体解剖学是门古老的学科，是门经典课程，但又是门重要的基础医学课程，是医学生的必修课。人体解剖学是研究正常人体形态结构的科学，是一门重要的医学主干学科，是医学各学科的基础。在医学科学、生命科学高度发展的今天，人体解 ...
'),

(null,'视觉文化批评',
'中山大学',
'冯原'
'images/poplar2.gif',
'更新到第5集
','','update'),

(null,'文化传承与建筑创新',
'华南理工大学',
'何镜堂'
'images/poplar3.gif',
'更新到第3集','','update'),

(null,'走进交响音乐的世界',
'华南理工大学',
'何平'
'images/poplar4.gif',
'更新到第13集
','','update'),
(null,'历史与环保',
'北京师范大学',
'梅雪芹'
'images/poplar5.gif',
'更新到第4集
','','update'),
(null,'现代礼仪',
'湖南大学',
'袁涤非'
'images/poplar6.gif',
'更新到第8集
','','update'),
(null,'新材料与社会进步',
叶志镇,'赵新兵',
'浙江大学'
'images/featurevedio1.gif',
'更新到第5集
','','hot'),
(null,'技术光学',
'北京理工大学',
'李林'
'images/featurevedio2.gif',
'更新到第5集
','','hot'),

(null,'中国古代思想智慧',
'武汉大学',
'郭齐勇'
'images/featurevedio3.gif',
'更新到第5集
','','hot'),

(null,'学习心理学',
'华东师范大学',
'庞维国'
'images/featurevedio4.gif',
'更新到第5集
','','hot'),


(null,'教学设计原理与方法',
'教育信息技术学院','','','','国家、省,	2004年','scnu'	),
(null,'运动生理学',
'体育科学学院','','','','国家、省,	2004年','scnu'),
(null,'植物生理学',
'生命科学学院','','','','国家、省,	2005年','scnu'),
(null,'教育心理学',
'教育科学学院','','','','国家、省,	2007年','scnu'),
(null,'自然地理学',
'地理科学学院','','','','国家、省,	2007年','scnu'),
(null,'电视教材编导与制作',
'教育信息技术学院','','','','国家、省,	2008年','scnu'),
(null,'健美操',
'体育科学学院','','','','国家、省,	2008年','scnu'),
(null,'思想道德修养与法律基础',
'政治与行政学院','','','','国家、省,	2009年','scnu'),
(null,'小学教育学',
'教育科学学院','','','','国家、省,	2010年','scnu');
