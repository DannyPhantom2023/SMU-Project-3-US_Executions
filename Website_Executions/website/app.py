from flask import Flask, render_template, redirect
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, text
import json

# Create an instance of Flask
app = Flask(__name__)

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/executions.sqlite")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/plots")
def plots():
    # Return template and data
    return render_template("plots.html")
@app.route("/map")
def map():
    # Return template and data
    return render_template("map.html")

##########################################################################
@app.route("/api/v1.0/Execution_Data")
def executions_by_state():
    """Get stations"""
    query = text(f"""
                SELECT
                    *
                FROM
                    executions;
                
                    
            """)


    df = pd.read_sql(query, engine)
    df2 = df.State.value_counts().reset_index()
    df2.columns = ["State", "Total_Execution"]

    data = json.loads(df.to_json(orient="records"))
    data2 = json.loads(df2.to_json(orient="records"))

    return({"raw_data": data})

#############################################################






#############################################################
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(host='0.0.0.0') 
