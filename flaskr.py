from __future__ import with_statement
# python 2.5


# all the imports
import sqlite3
from flask import Flask,request,session,g,redirect,url_for,\
	abort,render_template,flash

from contextlib import closing


	
# configuration
DATABASE = 'flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'


# create our little application;
app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent=True)
# from_envvar





def connect_db():
	return sqlite3.connect(app.config['DATABASE'])


		
@app.before_request
def before_request():
	g.db = connect_db()

@app.teardown_request	
def teardown_request(exception):
	if hasattr(g,'db'):		
		g.db.close()


# route
@app.route('/')
def index():
	return render_template('school/index.html')



@app.route('/add_comment')
def show_comments():
	cur = g.db.execute('select title,text from entries order by id desc')
	entries = [dict(title=row[0],text=row[1]) for row in cur.fetchall()]
	return render_template('show_entries.html',entries=entries)


@app.route('/addComment', methods=['POST'])
def add_comment():
	if not session.get('logged_in'):
		abort(401)
	g.db.execute('insert into entries(title,text) values(?,?)',
			[request.form['title'],request.form['text']])
	g.db.commit()
	flash('new entry was successfully posted')
	return redirect(url_for('show_entries'))

@app.route('/login',methods=['GET','POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != app.config['USERNAME']:
			error = 'Invalid username'
		elif request.form['password'] != app.config['PASSWORD']:
			error = 'Invalid password'
		else:
			session['logged_in'] =True
			flash('You were logged in')
			return redirect(url_for('show_entries'))
	return render_template('login.html',error=error)

@app.route('/logout')
def logout():
	session.pop('logged_in',None)
	flash('You were logged out')
	return redirect(url_for('show_entries'))


@app.route('/dashboard')
def dashboard():
	return render_template('baseStyle/dashboard.html')


@app.route('/tables')
def tables():
	return render_template('baseStyle/tables.html')


@app.route('/graphs')
def graphs():
	return render_template('baseStyle/graphs.html')

@app.route('/forms')
def forms():
	return render_template('baseStyle/forms.html')

@app.route('/baseStyle')
def baseStyle():
	return render_template('baseStyle/baseStyle.html')


@app.route('/files')
def files():
	return render_template('baseStyle/samples-files.html')

@app.route('/newOne')
def newOne():
	return render_template('baseStyle/samples-products.html')


@app.route('/video', defaults={'id': 1})
@app.route('/video/<id>')
def video(id):
	return render_template('school/video.html')
	
@app.route('/videolist')
def videolist():
	return render_template('school/videolist.html')

@app.route('/catalogue')
def catalogue():
	return render_template('catalogue.html')

@app.route('/shifan')
def shifan():
	return render_template('school/shifanjineng.html')

@app.route('/school/<schoolname>')
def schoolIndex(schoolname):
	return render_template('school/index.html')


@app.route('/school/<schoolname>/catalogues')
def cat_list_with_school(schoolname):
	return render_template('school/videolist.html')
# diffent function diffent render_template


@app.route('/school/scnu/video')
def video_in_school():
	return render_template('school/video.html')

@app.route('/school/teacher/<teachername>')
def teacher_in_school(teachername):
	return render_template('school/teacher.html')

@app.route('/school/student/<teachername>')
def student_in_school(teachername):
	return render_template('school/student.html')

@app.route('/school/<schoolname>/jpkc')
def jpkc_in_school(schoolname):
	return render_template('school/jpkc.html')


# temp page

@app.context_processor
def inject_user():
    return dict(title='chanry',keywords='',description='')

@app.context_processor
def utility_processor():
    def js_url(file):
        return url_for('static',filename='js/'+file)
    def static_url(file):
        return url_for('static',filename=file)
    def css_url(file):
    	return url_for('static',filename='style/'+file)
    def temp_img(file):
    	return url_for('static',filename='images/'+file)
    return dict(js_url=js_url,static_url=static_url,css_url=css_url,temp_img=temp_img)



if __name__ =='__main__':
	app.run(host='127.0.0.1')