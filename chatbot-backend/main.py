
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, ChatResponse
from services.gemini import generate_chat_response

app = FastAPI(title="AI Financial Chatbot API")

# Configure CORS for the frontend widget
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the host website domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    response_text = generate_chat_response(request.messages)
    return ChatResponse(response=response_text)
