import streamlit as st
import sys, os
from datetime import datetime
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.storage import add_worry, get_worries, delete_worry, get_worry_window, set_worry_window, is_worry_time
from utils.gemma import get_ai_support

st.set_page_config(page_title="صندوق القلق — أمان", page_icon="📦", layout="centered")

st.markdown("""
<style>
  body, .stApp { direction: rtl; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
  .worry-header { background: linear-gradient(135deg, #7c3aed, #a78bfa);
    padding: 1.5rem; border-radius: 16px; color: white; text-align: center; margin-bottom: 1.5rem; }
  .worry-card { background: white; border: 2px solid #ddd6fe; border-radius: 12px;
    padding: 1rem 1.2rem; margin: 0.5rem 0; }
  .locked-banner { background: #fef9c3; border: 2px solid #fbbf24;
    border-radius: 12px; padding: 1.2rem; text-align: center; margin: 1rem 0; }
  .open-banner { background: #f0fdf4; border: 2px solid #10b981;
    border-radius: 12px; padding: 1.2rem; text-align: center; margin: 1rem 0; }
</style>
""", unsafe_allow_html=True)

st.markdown("""
<div class="worry-header">
  <h1 style="margin:0;font-size:1.8rem;">📦 صندوق القلق</h1>
  <p style="margin:0.3rem 0 0;opacity:0.9;">تأجيل القلق بطريقة علمية مبنية على MCT</p>
</div>
""", unsafe_allow_html=True)

with st.expander("📖 كيف يعمل صندوق القلق؟"):
    st.markdown("""
    **الأساس العلمي:**
    العلاج المعرفي الوصفي (MCT) يُثبت أن القلق المفرط يزداد كلما حاولنا إيقافه.
    البديل هو **تأجيل القلق** — وضعه في صندوق وفتحه فقط في وقت محدد.

    **الخطوات:**
    1. 📝 اكتب القلق بجملة قصيرة واحدة
    2. 📦 ضعه في الصندوق وتابع يومك
    3. ⏰ افتح الصندوق فقط في وقت القلق اليومي (20 دقيقة فقط)
    4. 🔍 راجع هل القلق لا يزال مهماً؟

    **النتيجة:** 80% من القلق يحل نفسه قبل وقت المراجعة.
    """)

st.subheader("📝 أضف قلقاً جديداً")

with st.form("add_worry_form"):
    worry_text = st.text_area(
        "اكتب قلقك هنا:",
        placeholder="مثال: قلقان من نتيجة الشغل بكرة...",
        height=80,
        label_visibility="collapsed",
    )
    col1, col2 = st.columns([3, 1])
    with col2:
        add_btn = st.form_submit_button("📦 ضعه في الصندوق", type="primary", use_container_width=True)

if add_btn and worry_text.strip():
    worry = add_worry(worry_text)
    st.success(f"✅ تم حفظ قلقك في الصندوق — ستراجعه في وقت القلق فقط")
    with st.spinner("مساعد أمان يتحدث..."):
        reply = get_ai_support(worry_text, "MCT worry box")
    st.info(f"💬 {reply}")
elif add_btn:
    st.warning("اكتب قلقك أولاً")

st.divider()

start_w, end_w = get_worry_window()
now_str = datetime.now().strftime("%H:%M")
in_time = is_worry_time()

if in_time:
    st.markdown(f"""
    <div class="open-banner">
      <h3 style="margin:0;color:#065f46;">🔓 وقت القلق مفتوح الآن!</h3>
      <p style="margin:0.3rem 0 0;">من {start_w} حتى {end_w} — راجع قلقك بهدوء</p>
    </div>
    """, unsafe_allow_html=True)
else:
    st.markdown(f"""
    <div class="locked-banner">
      <h3 style="margin:0;color:#92400e;">🔒 الصندوق مقفول الآن</h3>
      <p style="margin:0.3rem 0 0;">وقت فتح القلق: <strong>{start_w}</strong> حتى <strong>{end_w}</strong></p>
      <p style="margin:0.2rem 0 0;font-size:0.9rem;">الوقت الحالي: {now_str} — تابع يومك بثقة 🌿</p>
    </div>
    """, unsafe_allow_html=True)

worries = get_worries()

if worries:
    st.subheader(f"📋 قائمة قلقك ({len(worries)} قلق)")

    for w in sorted(worries, key=lambda x: x["timestamp"], reverse=True):
        dt = datetime.fromisoformat(w["timestamp"]).strftime("%Y/%m/%d %H:%M")

        with st.container():
            if in_time:
                with st.expander(f"📌 {w['text'][:50]}... — {dt}"):
                    st.markdown(f"**القلق الكامل:** {w['text']}")
                    st.caption(f"وُضع في الصندوق: {dt}")

                    col1, col2 = st.columns(2)
                    with col1:
                        if st.button("🗑️ حذف (حُل بنفسه)", key=f"del_{w['id']}"):
                            delete_worry(w["id"])
                            st.success("✅ تم حذف القلق")
                            st.rerun()
                    with col2:
                        if st.button("💬 تحدث عنه", key=f"chat_{w['id']}"):
                            with st.spinner("جارٍ الرد..."):
                                reply = get_ai_support(w["text"], "MCT worry review")
                            st.info(f"💬 {reply}")
            else:
                st.markdown(f"""
                <div class="worry-card">
                  <strong>🔒 قلق محفوظ</strong> — أُضيف {dt}<br>
                  <em style="color:#9ca3af;">افتح وقت القلق لرؤية التفاصيل</em>
                </div>
                """, unsafe_allow_html=True)
else:
    st.info("📭 صندوقك فارغ — إذا جاءك قلق، اكتبه هنا وتابع يومك")

st.divider()
st.subheader("⏰ ضبط وقت القلق اليومي")

col1, col2 = st.columns(2)
with col1:
    new_start = st.text_input("وقت البداية (HH:MM)", value=start_w)
with col2:
    new_end = st.text_input("وقت النهاية (HH:MM)", value=end_w)

if st.button("💾 حفظ التوقيت"):
    try:
        for t in [new_start, new_end]:
            h, m = map(int, t.split(":"))
            assert 0 <= h < 24 and 0 <= m < 60
        set_worry_window(new_start, new_end)
        st.success(f"✅ تم تحديد وقت القلق من {new_start} إلى {new_end}")
        st.rerun()
    except Exception:
        st.error("صيغة الوقت غير صحيحة. استخدم HH:MM مثل 20:00")
