#!/usr/bin/env python
from flaskext.script import Manager
from flaskr import app,db


manager = Manager(app)


@manager.command
def init_db():
	with closing(connect_db()) as db:
		with app.open_resource('schema.sql') as f:
			db.cursor().executescript(f.read())
		db.commit()



if __name__ == '__main__':
	manager.run()