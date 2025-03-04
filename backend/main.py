from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pickle
import numpy as np
from typing import Literal
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Heart Disease Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model path configuration
MODEL_PATH = os.getenv('MODEL_PATH', 'updatedmodel.pkl')

# Load the model
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    logger.info(f"Successfully loaded model from {MODEL_PATH}")
except FileNotFoundError:
    model = None
    logger.warning(f"Model file not found at {MODEL_PATH}. Using mock predictions.")
except Exception as e:
    model = None
    logger.error(f"Error loading model: {str(e)}")

class AssessmentData(BaseModel):
    age: int
    sex: Literal['male', 'female']
    chestPainType: Literal['typical', 'atypical', 'nonAnginal', 'asymptomatic']
    restingECG: str
    fastingBloodSugar: float
    cholesterol: float
    bloodPressure: float
    maxHeartRate: float
    exerciseAngina: bool
    oldpeak: float
    slope: Literal['upsloping', 'flat', 'downsloping']
    coloredVessels: int
    thal: Literal['normal', 'fixedDefect', 'reversibleDefect']

def preprocess_data(data: AssessmentData) -> np.ndarray:
    try:
        # Convert categorical variables to numerical
        sex_encoded = 1 if data.sex == 'male' else 0
        cp_map = {'typical': 0, 'atypical': 1, 'nonAnginal': 2, 'asymptomatic': 3}
        slope_map = {'upsloping': 0, 'flat': 1, 'downsloping': 2}
        thal_map = {'normal': 0, 'fixedDefect': 1, 'reversibleDefect': 2}
        
        features = [
            data.age,
            sex_encoded,
            cp_map[data.chestPainType],
            data.bloodPressure,
            data.cholesterol,
            1 if data.fastingBloodSugar > 120 else 0,
            0,  # resting ECG (simplified)
            data.maxHeartRate,
            1 if data.exerciseAngina else 0,
            data.oldpeak,
            slope_map[data.slope],
            data.coloredVessels,
            thal_map[data.thal]
        ]
        
        return np.array(features).reshape(1, -1)
    except Exception as e:
        logger.error(f"Error preprocessing data: {str(e)}")
        raise

@app.post("/predict")
async def predict(data: AssessmentData):
    try:
        if model is None:
            logger.warning("Using mock prediction (model not loaded)")
            return {"risk": 50 + np.random.normal(0, 10)}
        
        # Preprocess the input data
        features = preprocess_data(data)
        logger.info("Successfully preprocessed input data")
        
        # Make prediction
        prediction = model.predict_proba(features)[0][1]
        risk = float(prediction * 100)
        logger.info(f"Prediction successful: {risk}%")
        
        return {"risk": risk}
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred"}
    )

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }