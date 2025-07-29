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

# FastAPI instance
app = FastAPI(title="Heart Disease Prediction API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_PATH = os.getenv('MODEL_PATH', 'backend/updatedmodel.pkl')  # Adjusted path to work with render structure

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    logger.info(f"✅ Model loaded from {MODEL_PATH}")
except FileNotFoundError:
    model = None
    logger.warning(f"⚠️ Model not found at {MODEL_PATH}, using mock predictions.")
except Exception as e:
    model = None
    logger.error(f"❌ Error loading model: {e}")

# Define input schema
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

# Preprocess input
def preprocess_data(data: AssessmentData) -> np.ndarray:
    try:
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
            0,  # restingECG (simplified or ignored)
            data.maxHeartRate,
            1 if data.exerciseAngina else 0,
            data.oldpeak,
            slope_map[data.slope],
            data.coloredVessels,
            thal_map[data.thal]
        ]
        
        return np.array(features).reshape(1, -1)
    except Exception as e:
        logger.error(f"Error in preprocessing: {e}")
        raise

# Predict endpoint
@app.post("/predict")
async def predict(data: AssessmentData):
    try:
        features = preprocess_data(data)
        logger.info("Input preprocessed successfully.")
        
        if model is None:
            mock_risk = float(50 + np.random.normal(0, 10))
            logger.warning("Mock prediction used.")
            return {"risk": round(mock_risk, 2)}

        prediction = model.predict_proba(features)[0][1]
        risk = float(prediction * 100)
        logger.info(f"Prediction completed: {risk:.2f}% risk")
        return {"risk": round(risk, 2)}
    
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Prediction failed")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

# ✅ Root route to fix 404
@app.get("/")
async def root():
    return {"message": "Heart Disease Prediction API is live!"}

# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )
