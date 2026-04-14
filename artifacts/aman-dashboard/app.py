import streamlit as st
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from utils.gemma import classify_mood, get_ai_support

st.set_page_config(
    page_title="أمان — لوحة الدعم النفسي",
    page_icon="🌿",
    layout="centered",
    initial_sidebar_state="expanded",
)

st.markdown("""
<style>
  body, .stApp { direction: rtl; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
  .main-header { background: linear-gradient(135deg, #0EA5E9, #10B981);
    padding: 1.5rem; border-radius: 16px; color: white; text-align: center; margin-bottom: 1.5rem; }
  .route-card { padding: 1.2rem 1.5rem; border-radius: 12px; border: 2px solid;
    margin: 0.5rem 0; cursor: pointer; transition: all 0.2s; }
  .route-dbt { border-color: #ef4444; background: #fef2f2; }
  .route-mct { border-color: #8b5cf6; background: #f5f3ff; }
  .route-neutral { border-color: #10b981; background: #f0fdf4; }
</style>
""", unsafe_allow_html=True)

st.markdown("""
<div class="main-header">
  <h1 style="margin:0;font-size:2rem;">🌿 أمان</h1>
  <p style="margin:0.3rem 0 0;opacity:0.9;">مساحتك الآمنة للدعم النفسي العلمي</p>
</div>
""", unsafe_allow_html=True)

st.subheader("كيف حالك الآن؟")
st.caption("صف لي بكلماتك — وسأوجهك للمسار الأنسب")

with st.form("mood_form"):
    mood_input = st.text_area(
        "اكتب ما تشعر به:",
        placeholder="مثال: أنا خايف جداً وما قادر أتنفس... / عندي أفكار ما بتوقف...",
        height=100,
        label_visibility="collapsed",
    )
    submitted = st.form_submit_button("🔍 حلل حالتي ووجّهني", use_container_width=True)

if submitted and mood_input.strip():
    with st.spinner("جارٍ التحليل..."):
        route = classify_mood(mood_input)
        reply = get_ai_support(mood_input, route)

    st.divider()

    if route == "DBT":
        st.error("🆘 يبدو أنك تمر بأزمة حادة — ركن الطوارئ هو مكانك الآن")
        st.markdown("""
        <div class="route-card route-dbt">
          <strong>📍 المسار المقترح: ركن الطوارئ (DBT)</strong><br>
          تمارين TIPP الفورية للتحكم في الغضب والذعر
        </div>
        """, unsafe_allow_html=True)
        st.info(f"💬 {reply}")
        st.page_link("pages/1_🆘_ركن_الطوارئ.py", label="🚀 انتقل لركن الطوارئ الآن", icon="🆘")

    elif route == "MCT":
        st.warning("💭 يبدو أن عندك أفكار كثيرة تلف — صندوق القلق سيساعدك")
        st.markdown("""
        <div class="route-card route-mct">
          <strong>📍 المسار المقترح: التحكم في التفكير (MCT)</strong><br>
          تأجيل القلق وتمرين تركيز الانتباه
        </div>
        """, unsafe_allow_html=True)
        st.info(f"💬 {reply}")
        st.page_link("pages/2_📦_صندوق_القلق.py", label="📦 انتقل لصندوق القلق", icon="📦")

    else:
        st.success("🌿 نحن هنا معاك")
        st.markdown("""
        <div class="route-card route-neutral">
          <strong>📍 استكشف الأدوات المتاحة</strong><br>
          اختر من القائمة الجانبية ما يناسب حالتك
        </div>
        """, unsafe_allow_html=True)
        st.info(f"💬 {reply}")

elif submitted:
    st.warning("اكتب شيئاً لأتمكن من مساعدتك")

st.divider()

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("### 🆘 ركن الطوارئ")
    st.caption("تمارين TIPP الفورية للأزمات")
    st.page_link("pages/1_🆘_ركن_الطوارئ.py", label="ادخل الآن", icon="🚀")

with col2:
    st.markdown("### 📦 صندوق القلق")
    st.caption("تأجيل القلق بطريقة علمية")
    st.page_link("pages/2_📦_صندوق_القلق.py", label="افتح الصندوق", icon="🔑")

with col3:
    st.markdown("### 🎯 تمرين الانتباه")
    st.caption("كسر دوامة التفكير المفرط")
    st.page_link("pages/3_🎯_تمرين_الانتباه.py", label="ابدأ التمرين", icon="🎯")

st.divider()
st.page_link("pages/4_📚_المقالات.py", label="📚 اقرأ بطاقات المعرفة", icon="📖")

with st.sidebar:
    st.markdown("## 🌿 أمان")
    st.caption("الدعم النفسي العلمي")
    st.divider()
    st.markdown("**التنقل السريع:**")
    st.page_link("app.py", label="🏠 الرئيسية", icon="🏠")
    st.page_link("pages/1_🆘_ركن_الطوارئ.py", label="🆘 ركن الطوارئ (DBT)", icon="🆘")
    st.page_link("pages/2_📦_صندوق_القلق.py", label="📦 صندوق القلق (MCT)", icon="📦")
    st.page_link("pages/3_🎯_تمرين_الانتباه.py", label="🎯 تمرين الانتباه", icon="🎯")
    st.page_link("pages/4_📚_المقالات.py", label="📚 بطاقات المعرفة", icon="📚")
    st.divider()
    st.warning("⚠️ هذا التطبيق للدعم فقط وليس بديلاً عن الطبيب النفسي")
    st.caption("طوارئ: 920033360")
