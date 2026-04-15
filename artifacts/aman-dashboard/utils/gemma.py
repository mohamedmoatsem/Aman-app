import os
import streamlit as st
from google import genai

GEMMA_MODEL = "gemma-4-26b-a4b-it"

@st.cache_resource(show_spinner=False)
def get_client():
    api_key = os.environ.get("Gemini_API_KEY", "")
    if not api_key:
        return None
    return genai.Client(api_key=api_key)

def classify_mood(user_text: str) -> str:
    """
    Returns 'DBT' if panic/anger, 'MCT' if overthinking/rumination,
    or 'UNKNOWN' if unclear.
    """
    client = get_client()
    if not client:
        return "UNKNOWN"
    try:
        system = (
            "أنت محلل نفسي. صنّف مدخل المستخدم في فئة واحدة فقط:\n"
            "- اكتب 'DBT' إذا كان الشخص يعاني من نوبة ذعر، غضب شديد، أزمة حادة، أو خطر فوري.\n"
            "- اكتب 'MCT' إذا كان يعاني من تفكير مفرط، قلق مزمن، اجترار، أو أفكار متكررة.\n"
            "- اكتب 'UNKNOWN' إذا لم تتضح الفئة.\n"
            "أجب بكلمة واحدة فقط بالإنجليزية: DBT أو MCT أو UNKNOWN."
        )
        response = client.models.generate_content(
            model=GEMMA_MODEL,
            contents=f"{system}\n\nمدخل المستخدم: {user_text}",
            config={"max_output_tokens": 20, "temperature": 0.1},
        )
        raw = ""
        for part in response.candidates[0].content.parts:
            if not getattr(part, "thought", False):
                raw += part.text or ""
        raw = raw.strip().upper()
        if "DBT" in raw:
            return "DBT"
        elif "MCT" in raw:
            return "MCT"
        return "UNKNOWN"
    except Exception as e:
        return "UNKNOWN"

def get_ai_support(user_text: str, path: str = "general") -> str:
    """Return a short supportive reply in Sudanese Arabic."""
    client = get_client()
    if not client:
        return "مساعد أمان غير متاح الآن. جرّب تمارين الصفحة مباشرة."
    try:
        system = (
            "أنت 'مساعد أمان'. أجب بجملتين بالسودانية الدافئة فقط. "
            "لا تشخيص، لا قوائم، لا ردود طويلة.\n"
            f"السياق: {path}"
        )
        response = client.models.generate_content(
            model=GEMMA_MODEL,
            contents=f"{system}\n\nالمستخدم قال: {user_text}",
            config={"max_output_tokens": 150, "temperature": 0.75},
        )
        raw = ""
        for part in response.candidates[0].content.parts:
            if not getattr(part, "thought", False):
                raw += part.text or ""
        return raw.strip() or "سلامتك، أنا معاك."
    except Exception:
        return "سلامتك، أنا معاك."
