import streamlit as st
import time as time_module
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.gemma import get_ai_support

st.set_page_config(page_title="تمرين الانتباه — أمان", page_icon="🎯", layout="centered")

st.markdown("""
<style>
  body, .stApp { direction: rtl; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
  .att-header { background: linear-gradient(135deg, #0ea5e9, #6366f1);
    padding: 1.5rem; border-radius: 16px; color: white; text-align: center; margin-bottom: 1.5rem; }
  .sound-dot { width: 80px; height: 80px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; margin: auto; transition: all 0.5s; }
  .focus-card { background: white; border: 2px solid #e0e7ff;
    border-radius: 12px; padding: 1.2rem; margin: 0.5rem 0; text-align: center; }
  .active-dot { background: #3b82f6; transform: scale(1.2); }
  .inactive-dot { background: #e2e8f0; }
</style>
""", unsafe_allow_html=True)

st.markdown("""
<div class="att-header">
  <h1 style="margin:0;font-size:1.8rem;">🎯 تمرين تركيز الانتباه</h1>
  <p style="margin:0.3rem 0 0;opacity:0.9;">Attention Training Technique — كسر دوامة التفكير</p>
</div>
""", unsafe_allow_html=True)

with st.expander("📖 ما هو ATT ولماذا يعمل؟"):
    st.markdown("""
    **Attention Training Technique** طوّرها البروفيسور Adrian Wells لعلاج اضطراب القلق العام.

    **الفكرة:** عقلك تعوّد على الانجرار للأفكار السلبية تلقائياً.
    هذا التمرين **يُعيد تدريب** عقلك على التحكم في وجهة الانتباه.

    **المبدأ:** لما تتحكم في انتباهك خارجياً، تضعف سيطرة الأفكار التلقائية.

    **مدة التمرين:** 12-15 دقيقة يومياً، ويُرى التحسن بعد 4-6 أسابيع.
    """)

tabs = st.tabs(["🔊 تمرين الأصوات", "👁️ محفزات بصرية", "🌊 تمرين المرونة"])

with tabs[0]:
    st.subheader("🔊 تمرين تركيز الانتباه السمعي")
    st.caption("سيُوجّهك التمرين للتركيز على أصوات مختلفة — البعيد ثم القريب ثم كل شيء")

    sounds = [
        {"emoji": "🏙️", "label": "صوت بعيد جداً", "color": "#dbeafe", "instruction": "ركّز على أبعد صوت تسمعه في محيطك — سيارة، طيور، ريح..."},
        {"emoji": "🏠", "label": "صوت متوسط المسافة", "color": "#dcfce7", "instruction": "ركّز على صوت في نفس الغرفة أو المبنى — مكيف، تلفاز، باب..."},
        {"emoji": "👂", "label": "صوت قريب جداً", "color": "#fef3c7", "instruction": "ركّز على صوت قريب منك جداً — تنفسك، نبضك، حفيف ملابسك..."},
        {"emoji": "🌐", "label": "كل الأصوات معاً", "color": "#f5f3ff", "instruction": "الآن افتح انتباهك لكل الأصوات في نفس الوقت — مثل مكبر الصوت..."},
    ]

    duration = st.slider("مدة كل مرحلة (ثواني)", 15, 60, 30, 5)
    start_att = st.button("▶️ ابدأ تمرين الأصوات", type="primary", use_container_width=True)

    if start_att:
        box = st.empty()
        prog = st.progress(0)

        for idx, sound in enumerate(sounds):
            for sec in range(duration, 0, -1):
                box.markdown(f"""
                <div class="focus-card" style="background:{sound['color']};border-color:{sound['color']};">
                  <div style="font-size:3rem;margin-bottom:0.5rem;">{sound['emoji']}</div>
                  <h3 style="margin:0;">{sound['label']}</h3>
                  <p style="color:#475569;">{sound['instruction']}</p>
                  <h2 style="color:#1e40af;margin:0.5rem 0 0;">{sec} ثانية</h2>
                  <small>المرحلة {idx+1} من {len(sounds)}</small>
                </div>
                """, unsafe_allow_html=True)
                prog.progress((idx * duration + (duration - sec)) / (len(sounds) * duration))
                time_module.sleep(1)

        box.success("✅ أتممت تمرين الأصوات! لاحظ هدوء عقلك الآن.")
        prog.progress(1.0)

with tabs[1]:
    st.subheader("👁️ محفزات بصرية للتركيز")
    st.caption("تمارين بصرية لإعادة توجيه الانتباه بعيداً عن الأفكار")

    visual_exercises = {
        "🔴 النقطة المتحركة": {
            "desc": "تابع النقطة بعينيك فقط — لا تحرك رأسك",
            "steps": ["🔴", "🔵", "🟢", "🟡", "🔴", "⚪", "🟠", "🔴"],
            "instruction": "النقطة تنتقل — تابعها بعينيك فقط"
        },
        "🔢 عد الأشياء": {
            "desc": "عدّ كل شيء من لون واحد في غرفتك",
            "targets": ["أشياء زرقاء 🔵", "أشياء حمراء 🔴", "أشياء مستديرة ⭕", "أشياء خشبية 🪵"],
            "instruction": "خذ 30 ثانية لكل لون"
        },
        "🌈 5-4-3-2-1": {
            "desc": "تقنية التأريض الحسي الكاملة",
            "senses": [
                ("5 أشياء ترى", "👀"),
                ("4 أشياء تلمسها", "🖐️"),
                ("3 أصوات تسمعها", "👂"),
                ("2 روائح تشمها", "👃"),
                ("1 طعم تذوقه", "👅"),
            ]
        },
    }

    choice = st.selectbox("اختر التمرين البصري:", list(visual_exercises.keys()))

    if choice == "🔴 النقطة المتحركة":
        ex = visual_exercises[choice]
        st.markdown(f"**{ex['desc']}**")
        if st.button("▶️ ابدأ النقطة المتحركة", type="primary"):
            ph = st.empty()
            for _ in range(2):
                for dot in ex["steps"]:
                    positions = ["text-align:right", "text-align:center", "text-align:left", "text-align:center"]
                    import random
                    pos = random.choice(positions)
                    ph.markdown(f"<div style='{pos};font-size:3rem;padding:2rem 0;'>{dot}</div>", unsafe_allow_html=True)
                    time_module.sleep(1.5)
            ph.success("✅ انتهى التمرين — كيف يبدو تركيزك الآن؟")

    elif choice == "🔢 عد الأشياء":
        ex = visual_exercises[choice]
        st.markdown(f"**{ex['desc']}**")
        ph = st.empty()
        if st.button("▶️ ابدأ العد", type="primary"):
            for target in ex["targets"]:
                ph.markdown(f"### {target}\nعدّها الآن في غرفتك — لديك 30 ثانية")
                time_module.sleep(30)
            ph.success("✅ أحسنت! انتباهك تدرّب الآن على الحاضر.")

    elif choice == "🌈 5-4-3-2-1":
        ex = visual_exercises[choice]
        st.markdown(f"**{ex['desc']}**")
        ph = st.empty()
        if st.button("▶️ ابدأ 5-4-3-2-1", type="primary"):
            for label, icon in ex["senses"]:
                for sec in range(20, 0, -1):
                    ph.markdown(f"## {icon} {label}\n### {sec} ثانية", unsafe_allow_html=False)
                    time_module.sleep(1)
            ph.success("✅ انتهت تقنية 5-4-3-2-1 — أنت في اللحظة الحاضرة الآن.")

with tabs[2]:
    st.subheader("🌊 تمرين المرونة المعرفية")
    st.caption("تدريب عقلك على التبديل السريع بين الأفكار — يضعف الاجترار")

    st.info("""
    **الهدف:** تقوية عضلة التحكم في الانتباه عبر التبديل المتعمد بين التركيز والتوسع

    الخطوات:
    1. **ركّز** على نقطة واحدة محددة (30 ثانية)
    2. **وسّع** انتباهك لكل محيطك (30 ثانية)
    3. **ركّز** مرة أخرى
    4. كرّر 5 مرات
    """)

    rounds = st.number_input("عدد الجولات", min_value=2, max_value=10, value=5)

    if st.button("▶️ ابدأ تمرين المرونة", type="primary", use_container_width=True):
        ph = st.empty()
        prog = st.progress(0)

        for r in range(int(rounds)):
            for sec in range(30, 0, -1):
                ph.markdown(f"""
                <div style="background:#dbeafe;border-radius:12px;padding:2rem;text-align:center;">
                  <h2>🎯 ركّز</h2>
                  <p>اختر شيئاً واحداً وركّز عليه تماماً</p>
                  <h3 style="color:#1e40af;">{sec} ثانية</h3>
                  <small>جولة {r+1}/{rounds}</small>
                </div>
                """, unsafe_allow_html=True)
                prog.progress((r * 60 + (30 - sec)) / (rounds * 60))
                time_module.sleep(1)

            for sec in range(30, 0, -1):
                ph.markdown(f"""
                <div style="background:#f0fdf4;border-radius:12px;padding:2rem;text-align:center;">
                  <h2>🌐 وسّع</h2>
                  <p>افتح انتباهك لكل محيطك دفعة واحدة</p>
                  <h3 style="color:#065f46;">{sec} ثانية</h3>
                  <small>جولة {r+1}/{rounds}</small>
                </div>
                """, unsafe_allow_html=True)
                prog.progress((r * 60 + 30 + (30 - sec)) / (rounds * 60))
                time_module.sleep(1)

        ph.success("✅ رائع! أتممت تمرين المرونة المعرفية.")
        prog.progress(1.0)

    st.divider()
    st.subheader("💬 شارك تجربتك")
    exp = st.text_area("كيف كان التمرين؟ ما الذي لاحظته؟", height=80)
    if st.button("📤 أرسل", type="primary") and exp.strip():
        with st.spinner("جارٍ الرد..."):
            reply = get_ai_support(exp, "MCT attention training")
        st.info(f"💬 {reply}")
