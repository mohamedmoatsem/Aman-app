import json
import os
import uuid
from datetime import datetime, time

WORRIES_PATH = os.path.join(os.path.dirname(__file__), "../data/worries.json")

def _load() -> dict:
    try:
        with open(WORRIES_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"worries": [], "worry_time_start": "20:00", "worry_time_end": "20:30"}

def _save(data: dict):
    with open(WORRIES_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def add_worry(text: str) -> dict:
    data = _load()
    worry = {
        "id": str(uuid.uuid4())[:8],
        "text": text.strip(),
        "timestamp": datetime.now().isoformat(),
        "status": "pending",
    }
    data["worries"].append(worry)
    _save(data)
    return worry

def get_worries() -> list:
    return _load().get("worries", [])

def delete_worry(worry_id: str):
    data = _load()
    data["worries"] = [w for w in data["worries"] if w["id"] != worry_id]
    _save(data)

def get_worry_window() -> tuple[str, str]:
    data = _load()
    return data.get("worry_time_start", "20:00"), data.get("worry_time_end", "20:30")

def set_worry_window(start: str, end: str):
    data = _load()
    data["worry_time_start"] = start
    data["worry_time_end"] = end
    _save(data)

def is_worry_time() -> bool:
    start_str, end_str = get_worry_window()
    try:
        now = datetime.now().time()
        sh, sm = map(int, start_str.split(":"))
        eh, em = map(int, end_str.split(":"))
        start = time(sh, sm)
        end = time(eh, em)
        return start <= now <= end
    except Exception:
        return False
