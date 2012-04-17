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
  description text ,
  title string not null
);

drop table if exists video_details;
create table video_details(
  id integer primary key autoincrement,
  vid integer not null,
  catId integer,
  tagId string ,
  artist integer not null,
  FOREIGN KEY(vid) REFERENCES videos(id),
  FOREIGN KEY(tagid) REFERENCES tags(id),
  FOREIGN KEY(artist) REFERENCES teachers(teacherid )
);