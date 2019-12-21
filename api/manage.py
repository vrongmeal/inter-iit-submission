from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from db import DB
import calendar
import time
import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return jsonify(DB), 200

@app.route('/c/projects')
def c_projects():
    return jsonify(DB['projects']), 200

@app.route('/c/surveys')
def c_surveys():
    return jsonify(DB['surveys']), 200

@app.route('/c/projects/<int:id>')
def c_projects_id(id):
    proj = None
    try:
        proj = DB['projects'][id].copy()
    except Exception as e:
        return jsonify({}), 404
    proj['surveys'] = []
    for s in DB['surveys']:
        if s['project'] == id:
            surv = s.copy()
            surv['user'] = DB['users'][surv['user']]
            proj['surveys'].append(surv)
    proj['summary'] = summary(id)
    return jsonify(proj), 200

@app.route('/c/projects/new', methods=['GET', 'POST'])
def c_projects_new():
    proj = request.json.copy()
    proj['id'] = len(DB['projects'])
    proj['end_date'] = -1
    proj['progress'] = [0]
    DB['projects'].append(proj)
    return jsonify(proj), 200

@app.route('/c/projects/<int:id>/end')
def c_projects_id_end(id):
    try:
        DB['projects'][id]['end_date'] = int(calendar.timegm(time.gmtime()))
        DB['projects'][id]['progress'].append(100)
        return jsonify(DB['projects'][id]), 200
    except:
        return jsonify({}), 404

def compare_dates(t1, t2):
    d1 = time.strftime('%D', time.localtime(t1))
    d2 = time.strftime('%D', time.localtime(t2))
    return d1 == d2

def summary(id):
    proj = None
    try:
        proj = DB['projects'][id]
    except:
        return None

    ans = []

    def reset():
        temp = {}
        for s in proj['schema']:
            bla = {}
            for a in s['a']:
                bla[a] = 0
            temp[s['q']] = bla
        return temp

    temp = reset()

    prev = 0
    init = False
    tempty = True
    for surv in DB['surveys']:
        if surv['project'] == id:
            if not init:
                prev = surv['timestamp']
                init = True

            if not compare_dates(surv['timestamp'], prev):
                ans.append(temp.copy())
                temp = reset()
                tempty = True

            for q in surv['ques']:
                a = surv['ques'][q]
                temp[q][a] += 1
                tempty = False

            prev = surv['timestamp']

    if not tempty:
        ans.append(temp.copy())

    soln = []

    def seret():
        bump = {}
        for s in proj['schema']:
            bump[s['q']] = ''
        return bump

    for v in ans:
        bump = seret()
        for q in v:
            ans_dict = []
            i = 0
            su = 0
            w = 0
            for a in v[q]:
                ans_dict.append(a)
                su += i * v[q][a]
                i += 1
                w += v[q][a]
            if w == 0:
                bump[q] = None
                continue
            avg = round(su / w)
            bump[q] = ans_dict[avg]
        soln.append(bump.copy())

    return {'ans': ans, 'avg': soln}


@app.route('/c/projects/<int:id>/progress/<int:val>')
def c_projects_id_progress_val(id, val):
    try:
        DB['projects'][id]['progress'].append(val)
        return jsonify(DB['projects'][id]), 200
    except Exception as e:
        return jsonify({}), 404

@app.route('/c/projects/<int:id>/submit', methods=['GET', 'POST'])
def c_projects_id_submit(id):
    proj = None
    try:
        proj = DB['projects'][id]
    except Exception as e:
        return jsonify({}), 404
    surv = {}
    surv['id'] = len(DB['surveys'])
    surv['timestamp'] = int(calendar.timegm(time.gmtime()))
    image = request.files['image']
    filename = secure_filename(str(calendar.timegm(time.gmtime())) + '__' + image.filename)
    surv['image'] = filename
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    surv['user'] = int(request.form['user'])
    surv['project'] = int(request.form['project'])
    loc = []
    temp = request.form['location'].split('|')
    for i in range(len(temp)):
        loc.append(int(temp[i]))
    surv['location'] = loc
    ques = {}
    temp = request.form['ques'].split('|')
    for i in range(len(temp)):
        ques[proj['schema'][i]['q']] = temp[i]
    surv['ques'] = ques
    DB['surveys'].append(surv)
    return jsonify(surv), 200

@app.route('/uploads/<filename>')
def uploads_filename(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/m/issues')
def m_issues():
    return jsonify(DB['issues']), 200

@app.route('/m/issues/<int:id>')
def m_issues_id(id):
    issu = None
    try:
        issu = DB['issues'][id]
    except Exception as e:
        return jsonify({}), 404
    return jsonify(issu), 200

@app.route('/m/issues/<int:id>/level/<int:val>')
def m_issues_id_level_val(id, val):
    try:
        DB['issues'][id]['level'] = val
        DB['issues'][id]['level_dates'].append(int(calendar.timegm(time.gmtime())))
        return jsonify(DB['issues'][id]), 200
    except Exception as e:
        return jsonify({}), 404

@app.route('/m/issues/new', methods=['GET', 'POST'])
def m_issues_new():
    issue = {}
    issue['id'] = len(DB['issues'])
    issue['timestamp'] = int(calendar.timegm(time.gmtime()))
    issue['level'] = 0
    issue['level_dates'] = [int(calendar.timegm(time.gmtime()))]
    image = request.files['image']
    filename = secure_filename(str(calendar.timegm(time.gmtime())) + '__' + image.filename)
    issue['image'] = filename
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    issue['user'] = int(request.form['user'])
    issue['title'] = request.form['title']
    issue['description'] = request.form['description']
    loc = []
    temp = request.form['location'].split('|')
    for i in range(len(temp)):
        loc.append(int(temp[i]))
    issue['location'] = loc
    ques = {}
    DB['issues'].append(issue)
    return jsonify(issue), 200
