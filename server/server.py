from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Untuk model_rf.pkl, bisa didownload dari link berikut:
# https://binusianorg-my.sharepoint.com/personal/rico_halim001_binus_ac_id/_layouts/15/guestaccess.aspx?share=Epb8h4Tt8P5OmEuGeMyeHi4BgjcxMcYrbIw37yTH6FIR-w&e=Fz5e4r
model = pickle.load(open('model_rf.pkl', 'rb'))

@app.route('/api/predict', methods=['POST'])
def predict():
    rename_map = {
        "age": "Age",
        "profession": "Profession",
        "cgpa": "CGPA",
        "dietaryHabits": "Dietary Habits",
        "sleepDuration": "Sleep Duration",
        "academicPressure": "Academic Pressure",
        "studySatisfaction": "Study Satisfaction",
        "degree": "Degree",
        "suicidalThoughts": "Have you ever had suicidal thoughts ?",
        "familyHistory": "Family History of Mental Illness",
        "studyHours": "Study Hours",
        "financialStress": "Financial Stress",
        "gender": "Gender"
    }
    data = request.get_json()

    df = pd.DataFrame([data])

    df['degree'] = df['degree'].apply(lambda x: "Class 12" if x == "High School and lower" else x)
    
    if (df['degree'] == "Class 12").any():
        df = df.drop(["degreeName", "degreeType"], axis=1)
    elif (df['degree'] == "Bachelor").any() or (df['degree'] == "Master").any() or (df['degree'] == "Doctorate").any():
        if (df['degreeType'] == "Others").any():
            df = df.drop(["degreeName"], axis=1)
            df['degree'] = df['degreeType'].apply(lambda x: "Others" if x == "Others" else x)
            df = df.drop(["degreeType"], axis=1)
        else:
            df['degree'] = df['degreeName']
            df = df.drop(["degreeName", "degreeType"], axis=1)

    df = df.rename(columns=rename_map)

    result = model.predict_proba(df)[0][1]

    print('Received prediction request:', df)
    return jsonify({'prediction': result.item()})

if __name__ == "__main__":
    app.run(debug=True, port=8080)