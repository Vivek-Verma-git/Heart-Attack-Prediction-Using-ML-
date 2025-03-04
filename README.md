# Heart Attack Prediction App

This Heart Attack Prediction App uses Machine Learning (ML) algorithms to predict the likelihood of a heart attack based on the medical data provided by the user. By inputting certain health parameters, the app calculates the risk level and provides valuable insights to help in the early detection and prevention of heart attacks.

## Features

- **Input Fields**: Users can input their medical data such as age, sex, chest pain type, resting ECG, cholesterol levels, blood pressure, and other relevant parameters.
- **Heart Attack Prediction**: Using machine learning, the app calculates the probability of a heart attack based on the user’s inputs.
- **Risk Classification**: The app classifies the risk into different categories (e.g., Low, Medium, High) to help users understand the severity of their health condition.
- **Data-Driven Insights**: Provides explanations and insights based on the results of the prediction to help users understand the influencing factors.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/heart-attack-prediction-app.git '''
2. Navigate to the project directory:
   ```bash
    cd heart-attack-prediction-app
3. Install the required dependencies:
   ``` bash
   pip install -r requirements.txt
4. Run the app:
   ``` bash
    python app.py
5.The app will start, and you can access it through your browser at http://127.0.0.1:5000.


## About the dataset used and medical pre-requisites:
Input the required medical information:

Age : Age of the person (numeric)
Sex : Gender of the person (Male/Female)
Chest Pain Type : Type of chest pain experienced (Typical, Atypical, Non-anginal, Asymptomatic)
Resting ECG : Results of resting electrocardiographic measurement (Normal, ST-T wave abnormality, Left ventricular hypertrophy)
Fasting Blood Sugar : Fasting blood sugar level (1 = greater than 120 mg/dl, 0 = less than or equal to 120 mg/dl)
Cholesterol : Serum cholesterol in mg/dl (numeric)
Blood Pressure : Resting blood pressure in mm Hg (numeric)
Max Heart Rate : Maximum heart rate achieved (numeric)
Exercise Angina : Whether the person experiences exercise-induced angina (True/False)
Oldpeak : Depression induced by exercise relative to rest (numeric)
Slope : Slope of the peak exercise ST segment (Upsloping, Flat, Downsloping)
Colored Vessels : Number of major vessels colored by fluoroscopy (numeric)
Thalassemia : Thalassemia type (Normal, Fixed defect, Reversable defect)
After submitting the data, the app will process the input and predict the probability of a heart attack.

## Example Input Data
Here’s an example of how the input might look:

Age: 50
Sex: Male
Chest Pain Type: Typical
Resting ECG: Normal
Fasting Blood Sugar: 0
Cholesterol: 240 mg/dl
Blood Pressure: 140/90 mm Hg
Max Heart Rate: 150 bpm
Exercise Angina: False
Oldpeak: 1.0
Slope: Upsloping
Colored Vessels: 1
Thalassemia: Normal

## Output
Prediction: Risk of Heart Attack = High / Medium / Low
Probability: 85%




   
   
    
