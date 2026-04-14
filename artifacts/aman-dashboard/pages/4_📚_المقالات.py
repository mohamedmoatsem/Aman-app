import streamlit as st
import json
import os

st.set_page_config(page_title="بطاقات المعرفة — أمان", page_icon="📚", layout="centered")

st.markdown("""
<style>
  body, .stApp { direction: rtl; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
  .articles-header { background: linear-gradient(135deg, #10b981, #0ea5e9);
    padding: 1.5rem; border-radius: 16px; color: white; text-align: center; margin-bottom: 1.5rem; }
  .swipe-card { border-radius: 20px; padding: 1.5rem; margin: 1rem 0;
    border: 2px solid; transition: all 0.3s; cursor: default; }
  .card-dbt { border-color: #fecaca; background: linear-gradient(135deg, #fff5f5, #fff); }
  .card-mct { border-color: #ddd6fe; background: linear-gradient(135deg, #f5f3ff, #fff); }
  .step-item { background: #f8fafc; border-right: 4px solid #0ea5e9;
    padding: 0.7rem 1rem; margin: 0.4rem 0; border-radius: 0 8px 8px 0; }
  .tag { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 20px;
    font-size: 0.75rem; font-weight: bold; margin: 0.2rem; }
  .tag-dbt { background: #fee2e2; color: #991b1b; }
  .tag-mct { background: #ede9fe; color: #5b21b6; }
</style>
""", unsafe_allow_html=True)

st.markdown("""
<div class="articles-header">
  <h1 style="margin:0;font-size:1.8rem;">📚 بطاقات المعرفة</h1>
  <p style="margin:0.3rem 0 0;opacity:0.9;">معرفة عملية مكثّفة — بطاقة في كل مرة</p>
</div>
""", unsafe_allow_html=True)

DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/articles.json")

@st.cache_data(ttl=60)
def load_articles():
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

articles = load_articles()

col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    filter_cat = st.selectbox(
        "فلتر حسب المسار:",
        ["الكل 🌿", "DBT 🆘 (الطوارئ)", "MCT 📦 (التفكير)"],
        label_visibility="collapsed"
    )

if "DBT" in filter_cat:
    articles = [a for a in articles if a["category"] == "DBT"]
elif "MCT" in filter_cat:
    articles = [a for a in articles if a["category"] == "MCT"]

total = len(articles)
if "card_index" not in st.session_state:
    st.session_state.card_index = 0

idx = st.session_state.card_index % total if total > 0 else 0

if total == 0:
    st.info("لا توجد بطاقات لهذا الفلتر")
else:
    article = articles[idx]
    cat = article["category"]
    card_class = "card-dbt" if cat == "DBT" else "card-mct"
    cat_color = "#ef4444" if cat == "DBT" else "#7c3aed"
    cat_label = "ركن الطوارئ (DBT)" if cat == "DBT" else "صندوق القلق (MCT)"

    tags_html = "".join([
        f'<span class="tag tag-{cat.lower()}">{t}</span>' for t in article.get("tags", [])
    ])

    st.markdown(f"""
    <div class="swipe-card {card_class}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;">
        <span style="font-size:2.5rem;">{article['emoji']}</span>
        <span style="background:{cat_color};color:white;padding:0.3rem 0.8rem;border-radius:20px;font-size:0.8rem;font-weight:bold;">{cat_label}</span>
      </div>
      <h2 style="margin:0 0 0.5rem;color:#1e293b;font-size:1.3rem;">{article['title']}</h2>
      <p style="color:#64748b;margin:0 0 0.8rem;">{article['summary']}</p>
      <div>{tags_html}</div>
    </div>
    """, unsafe_allow_html=True)

    with st.expander("💡 النصيحة الذهبية"):
        st.info(f"🌟 {article['tip']}")

    with st.expander("📋 الخطوات العملية"):
        for i, step in enumerate(article.get("steps", []), 1):
            st.markdown(f"<div class='step-item'><strong>{i}.</strong> {step}</div>", unsafe_allow_html=True)

    col_prev, col_counter, col_next = st.columns([1, 2, 1])

    with col_prev:
        if st.button("⬅️ السابق", use_container_width=True):
            st.session_state.card_index = (idx - 1) % total
            st.rerun()

    with col_counter:
        st.markdown(
            f"<div style='text-align:center;padding:0.5rem;color:#64748b;font-size:0.9rem;'>"
            f"بطاقة {idx + 1} من {total}</div>",
            unsafe_allow_html=True
        )
        st.progress((idx + 1) / total)

    with col_next:
        if st.button("التالي ➡️", use_container_width=True, type="primary"):
            st.session_state.card_index = (idx + 1) % total
            st.rerun()

    st.divider()
    st.subheader("🎯 انتقل للتمرين الآن")

    path = article.get("path", "")
    if path == "dbt":
        st.page_link("pages/1_🆘_ركن_الطوارئ.py", label="🆘 انتقل لركن الطوارئ", icon="🚀")
    elif path == "mct":
        col1, col2 = st.columns(2)
        with col1:
            st.page_link("pages/2_📦_صندوق_القلق.py", label="📦 صندوق القلق", icon="📦")
        with col2:
            st.page_link("pages/3_🎯_تمرين_الانتباه.py", label="🎯 تمرين الانتباه", icon="🎯")
