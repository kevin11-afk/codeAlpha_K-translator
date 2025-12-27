from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from deep_translator import GoogleTranslator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/languages")
def get_languages():
    return GoogleTranslator().get_supported_languages(as_dict=True)

class TranslateRequest(BaseModel):
    text: str
    source: str
    target: str

@app.post("/translate")
def translate(req: TranslateRequest):
    translated = GoogleTranslator(
        source=req.source,
        target=req.target
    ).translate(req.text)

    return {"translated": translated}

@app.get("/")
def home():
    return {"message": "NeuroTranslate API running 🚀"}

