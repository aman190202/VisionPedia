from flask import *  
import pandas as pd
from twilio.rest import Client
app = Flask(__name__)  


#TWILIO AUTHENTICATION AND NECCESITIES
account_sid = 'ACe601f95cfb82423582b96f77ea0f9af7'
auth_token = '522067cac18a6a9fbc560328a413bbf7'
client = Client(account_sid, auth_token)
#####################################

 
@app.route("/")  
def index():  
    return render_template('face.html');  
 
@app.route("/add")
def add():  
    return render_template("add.html")

@app.route("/question")
def ques():
    return render_template("ask.html")

@app.route("/ask",methods= ["POST","GET"])
def ask():
    df1=pd.read_csv("data.csv")
    if request.method=="POST":
        student = request.form["name"]
        subject = request.form["subject"]
        question= request.form["question"]
        for i in range(df1.shape[0]):
            message = client.messages.create(
                              body=student+" from class : "+subject+" \n wants to ask you : \n"+ question,
                              from_='whatsapp:+14155238886',
                              to='whatsapp:'+str(df1['tel'][i])
                          )
        return redirect("https://preview.p5js.org/Chinmay101202/present/5-jocrx6T")

@app.route("/savedetails",methods = ["POST","GET"])  
def saveDetails():  
    if request.method == "POST":  
            df1=pd.read_csv("data.csv")  
            name = request.form["name"]  
            tel = request.form["tel"]  
            df2={"subject":name, "tel":tel}
            df1=df1.append(df2,ignore_index=True)
            df1.to_csv("data.csv")
            return render_template("page2.html")  
 
  
if __name__ == "__main__":  
    app.run(host="172.20.10.3",port=5000)  