from flask import Flask, json, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


global user
user = {}

@app.route('/post', methods=['POST'])
def post():
    global user

    info = request.get_json()

    code = info["code"]
    is_cpp = info["lang"] == "cpp"
    problem_id = int(info["problem_id"])
    time_limit = int(info["time_limit"])
    memory_limit = int(info["memory_limit"])
    test_case = int(info["test_case"])


    status = 0
    tc = -1
    time_used = 0
    memory_used = 0

    if is_cpp:
        os.system("touch code.cpp")
        f = open("code.cpp", 'w')
        f.write(code)
        f.close()
        r = os.system("g++ -o code code.cpp")


        if r != 0: # compile error
            status = 4
        else:
            os.system("./checker ./code {} {} {} {} > out".format(time_limit, memory_limit, problem_id, test_case))

    else:
        os.system("touch code.py")
        f = open("code.py", 'w')
        f.write(code)
        f.close()
        os.system("./checker code.py {} {} {} {} > out".format(time_limit, memory_limit, problem_id, test_case))


    if status != 4:
        f = open("out", "r")


        for i in range(test_case):

            if status != 0:
                break

            line = f.readline().split()
            if not line:
                break

            time_used = max(time_used, int(line[1]))
            memory_used = max(memory_used, int(line[2]))

            # normal exit
            if line[0] == '0':
                dif = os.system("diff -bZ {}.user {}/{}.out".format(i+1, problem_id, i+1))

                # wrong answer
                if dif != 0:
                    status = 1
                    tc = i+1
                    break

            # time limit exceed
            elif line[0] == '1':
                status = 2
                tc = i+1
                break

            # memory limit exceed
            elif line[0] == '2':
                status = 3
                tc = i+1
                break

            # runtime error
            elif line[0] == '3':
                status = 5
                tc = i+1
                break

        os.system("rm out")
        os.system("rm ./*.user")

    os.system("rm ./code*")

    user = {
        "problem_id" : problem_id,
        "status" : status,
        "tc" : tc,
        "time_used" : time_used,
        "memory_used" : memory_used
    }


    return jsonify(user)


@app.route('/get', methods=['GET'])
def get():
    global user
    ret = user
    user = {}
    return jsonify(ret)


if __name__ == '__main__':
    app.run()
