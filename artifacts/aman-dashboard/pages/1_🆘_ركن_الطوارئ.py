import streamlit as st
import time as time_module
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utils.gemma import get_ai_support

st.set_page_config(page_title="ركن الطوارئ — أمان", page_icon="🆘", layout="centered")

st.markdown("""
<style>
  body, .stApp { direction: rtl; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
  .emergency-header { background: linear-gradient(135deg, #ef4444, #f97316);
    padding: 1.5rem; border-radius: 16px; color: white; text-align: center; margin-bottom: 1.5rem; }
  .tipp-card { background: white; border: 2px solid #fecaca; border-radius: 12px;
    padding: 1.2rem; margin: 0.5rem 0; }
  .tip-item { background: #fef9f0; border-right: 4px solid #f97316;
    padding: 0.8rem 1rem; margin: 0.4rem 0; border-radius: 0 8px 8px 0; }
  .breath-ring { width: 120px; height: 120px; border-radius: 50%;
    border: 8px solid #3b82f6; display: flex; align-items: center;
    justify-content: center; margin: 1rem auto; font-size: 1.2rem; text-align: center; }
</style>
""", unsafe_allow_html=True)

st.markdown("""
<div class="emergency-header">
  <h1 style="margin:0;font-size:1.8rem;">🆘 ركن الطوارئ</h1>
  <p style="margin:0.3rem 0 0;opacity:0.9;">مهارات TIPP — للأزمات الحادة والغضب الشديد</p>
</div>
""", unsafe_allow_html=True)

st.info("🌡️ **T** درجة الحرارة  |  🌬️ **I** التمرين المكثف  |  **PP** التنفس المنتظم والاسترخاء")

tabs = st.tabs(["🌬️ تنفس منتظم (PP)", "🌡️ تبريد الجسم (T)", "💪 توليد المشاعر الإيجابية (I)", "📋 نصائح تحمل الضائقة"])

with tabs[0]:
    st.subheader("تمرين التنفس المنتظم — Paced Breathing")
    st.caption("تنفس 4 دخول / 6 خروج — يبطئ القلب ويهدئ الجهاز العصبي")

    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        cycles = st.number_input("عدد الدورات", min_value=1, max_value=10, value=4, step=1)
        start_btn = st.button("▶️ ابدأ التمرين", use_container_width=True, type="primary")

    if start_btn:
        status_box = st.empty()
        ring_box = st.empty()
        progress = st.progress(0)

        total_steps = cycles * 10
        step = 0

        for c in range(int(cycles)):
            for i in range(4):
                pct = (step / total_steps)
                ring_box.markdown(f"""
                <div class="breath-ring" style="border-color:#3b82f6;background:#eff6ff;">
                  شهيق...<br><small>{4-i} ثواني</small>
                </div>""", unsafe_allow_html=True)
                status_box.success(f"🫁 شهيق عميق... {4-i} ثانية — دورة {c+1}/{cycles}")
                progress.progress(pct)
                time_module.sleep(1)
                step += 1

            for i in range(6):
                pct = (step / total_steps)
                ring_box.markdown(f"""
                <div class="breath-ring" style="border-color:#10b981;background:#f0fdf4;">
                  زفير...<br><small>{6-i} ثواني</small>
                </div>""", unsafe_allow_html=True)
                status_box.info(f"💨 زفير ببطء... {6-i} ثانية — دورة {c+1}/{cycles}")
                progress.progress(pct)
                time_module.sleep(1)
                step += 1

        ring_box.empty()
        progress.progress(1.0)
        status_box.success("✅ أحسنت! تنفسك الآن أهدأ.")

with tabs[1]:
    st.subheader("تبريد الجسم — Temperature")
    st.caption("الماء البارد يفعّل منعكس الغطس ويبطئ معدل ضربات القلب فوراً")

    st.markdown("""
    <div class="tipp-card">
      <h4>🧊 طريقة الوجه البارد</h4>
      <p>الأفضل لحالات الذعر والقلق الحاد</p>
    </div>
    """, unsafe_allow_html=True)

    steps_cold = [
        ("1", "اعمل وعاء فيه ماء بارد (أضف ثلج لو ممكن)"),
        ("2", "خد نفس عميق وامسك"),
        ("3", "اغمس وجهك في الماء لمدة 30 ثانية"),
        ("4", "أو ضع كيس ثلج مغلف على وجهك وعينيك"),
        ("5", "كرر 2-3 مرات لو محتاج"),
    ]

    for num, step in steps_cold:
        st.markdown(f"""
        <div class="tip-item">
          <strong>خطوة {num}:</strong> {step}
        </div>
        """, unsafe_allow_html=True)

    st.divider()
    st.markdown("""
    <div class="tipp-card">
      <h4>🚿 الدش البارد السريع</h4>
      <p>لما ما تكون قادر تعمل طريقة الوجه</p>
    </div>
    """, unsafe_allow_html=True)

    steps_shower = [
        "ضع يديك تحت ماء بارد لمدة دقيقة",
        "أو رش وجهك وعنقك بالماء البارد",
        "لاحظ كيف جسمك يبدأ يهدأ تلقائياً",
    ]

    for s in steps_shower:
        st.markdown(f"<div class='tip-item'>🌊 {s}</div>", unsafe_allow_html=True)

    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        timer_btn = st.button("⏱️ شغّل مؤقت 30 ثانية", use_container_width=True)

    if timer_btn:
        countdown = st.empty()
        for i in range(30, 0, -1):
            countdown.markdown(f"### ⏱️ {i} ثانية متبقية — اغمس وجهك!")
            time_module.sleep(1)
        countdown.success("✅ تمام! كيف تحس الآن؟")

with tabs[2]:
    st.subheader("توليد المشاعر الإيجابية — Intense Exercise")
    st.caption("النشاط البدني الشديد يُفرز الإندورفين ويكسر حلقة الأزمة")

    exercises = {
        "🏃 جري في المكان": {
            "duration": "2 دقيقة",
            "how": "ارفع ركبتيك عالياً وحرّك ذراعيك بقوة",
            "why": "يحرق الأدرينالين المتراكم ويوصل أكسجين للدماغ"
        },
        "💪 قفز النجمة": {
            "duration": "1 دقيقة",
            "how": "افرد يديك وقدميك معاً مثل نجمة في كل قفزة",
            "why": "يرفع معدل ضربات القلب بطريقة طبيعية وصحية"
        },
        "🧘 القرفصاء (Squats)": {
            "duration": "20 تكرار",
            "how": "انزل ببطء وارجع للأعلى — تنفس مع كل تكرار",
            "why": "يشغل عضلات كبيرة ويعيد التركيز للجسم"
        },
        "✊ لكمات الهواء": {
            "duration": "1 دقيقة",
            "how": "لكّم الهواء أمامك بالتناوب مع الزفير القوي",
            "why": "يُفرّغ الطاقة السلبية ويُعبّر عن الغضب بأمان"
        },
    }

    for name, info in exercises.items():
        with st.expander(f"{name} — {info['duration']}"):
            st.markdown(f"**كيف:** {info['how']}")
            st.markdown(f"**لماذا يساعد:** {info['why']}")
            if st.button(f"⏱️ ابدأ {name.split()[-1]}", key=f"ex_{name}"):
                ph = st.empty()
                for i in range(10, 0, -1):
                    ph.info(f"🔥 {name} — {i} ثواني تبقت")
                    time_module.sleep(1)
                ph.success("✅ عظيم! استمر ببقية الوقت المحدد.")

with tabs[3]:
    st.subheader("نصائح تحمل الضائقة — Distress Tolerance")
    st.caption("كلمات من القلب — للأوقات الصعبة")

    tips_sudanese = [
        ("🌊", "الوقت الصعب زي الموجة — ما يدوم. أنت تقدر تصمد لحد ما تعدي."),
        ("⚓", "ما لازم تحل كل شيء الآن. كفاية تتنفس وتكمل الدقيقة الجاية."),
        ("🌙", "الليل طويل بس النهار بيجي. اللي تحس بيه الآن مش دايم."),
        ("🤝", "طلب المساعدة شجاعة مش ضعف. ما في زول يتحمل الضغط وحده."),
        ("🌱", "حتى في أصعب يوم، جسمك مستمر ومحافظ عليك. ثق فيه."),
        ("💙", "مش لازم تكون بخير الآن. إذن لنفسك إنك تكون إنسان وتتألم."),
        ("🔥", "الغضب طاقة — موجّهها صح تقدر تبني بيها بكرة."),
        ("🌬️", "نفس واحد عميق يغير كيمياء دماغك. ابدأ من هنا."),
    ]

    cols = st.columns(2)
    for i, (emoji, tip) in enumerate(tips_sudanese):
        with cols[i % 2]:
            st.markdown(f"""
            <div class="tipp-card" style="border-color:#fed7aa;">
              <span style="font-size:1.5rem;">{emoji}</span>
              <p style="margin:0.5rem 0 0;">{tip}</p>
            </div>
            """, unsafe_allow_html=True)

    st.divider()
    st.subheader("💬 تحدث مع مساعد أمان")
    user_msg = st.text_area("كيف تحس الآن؟", placeholder="صف لي الأمر...", height=80)
    if st.button("📤 أرسل", type="primary") and user_msg.strip():
        with st.spinner("جارٍ الرد..."):
            reply = get_ai_support(user_msg, "DBT emergency")
        st.info(f"💬 {reply}")
