"""
urls.py

URL dispatch route mappings and error handlers

"""

from flask import render_template,url_for

from application import app
from application import views


## URL dispatch rules
# App Engine warm up handler
# See http://code.google.com/appengine/docs/python/config/appconfig.html#Warming_Requests
app.add_url_rule('/_ah/warmup', 'warmup', view_func=views.warmup)

# Home page
# app.add_url_rule('/', 'home', view_func=views.home)

# Say hello
app.add_url_rule('/hello/<username>', 'say_hello', view_func=views.say_hello)

# Examples list page
app.add_url_rule('/examples', 'list_examples', view_func=views.list_examples, methods=['GET', 'POST'])

# Contrived admin-only view example
app.add_url_rule('/admin_only', 'admin_only', view_func=views.admin_only)

# Delete an example (post method only)
app.add_url_rule('/examples/delete/<int:example_id>', view_func=views.delete_example, methods=['POST'])


## Error handlers
# Handle 404 errors
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Handle 500 errors
@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500

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
	return render_template('school/login.html',error=error)

@app.route('/logout')
def logout():
	session.pop('logged_in',None)
	flash('You were logged out')
	return redirect(url_for('show_entries'))

@app.route('/register')
def register():
	return render_template('school/reg.html')


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

@app.route('/space')
def space():
	return render_template('school/space.html')

@app.route('/me')
def me():
	return render_template('school/me.html')
# temp page
@app.route('/album')
def album():
	return render_template('school/album.html')

@app.route('/article_list')
def article_list():
	return render_template('school/article_list.html')

@app.route('/article')
def article():
	return render_template('school/article.html')

@app.route('/liveon')
def liveon():
	return render_template('school/liveon.html')

@app.route('/search')
def ad_search():
	return render_template('school/ad_search.html')
@app.route('/live_list')
def live_list():
	return render_template('school/live_list.html')
	
@app.route('/edit_video')
def edit_video():
	return render_template('school/edit_video.html')

@app.route('/admin/master')
def admin_master():
	return render_template('school/admin/master_face.html')
	
@app.route('/admin/teacher')
def admin_teacher():
	return render_template('school/admin/teacher_face.html')

@app.route('/brocast')
def new_brocast():
	"""docstring for new_brocast"""
	return render_template('school/brocast.html')

@app.route('/activity/teacher')
def activity_teacher():
	"""docstring for activity"""
	return render_template('school/activity/teacher.html')

@app.route('/activity/classes')
def activity_classes():
	"""docstring for activity"""
	return render_template('school/activity/classes.html')
		
@app.route('/getVar',methods=['GET','POST'])
def getVar():
	if request.method == 'POST':
		return  '?name='+request['name']+'&position='+request['position']
	return 'get'

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





