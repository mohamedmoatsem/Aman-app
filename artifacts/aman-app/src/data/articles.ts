export interface Article {
  id: number;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  category: string;
  categoryEn: string;
  content: string;
  contentEn: string;
}

export const mentalHealthArticles: Article[] = [
  {
    id: 1,
    title: "كيف تتعامل مع نوبة الهلع؟",
    titleEn: "How to Deal with a Panic Attack?",
    summary: "دليل احترافي شامل وفق إرشادات منظمة الصحة العالمية وأحدث تقنيات العلاج النفسي",
    summaryEn: "A comprehensive professional guide based on WHO guidelines and the latest psychological treatment techniques",
    category: "القلق",
    categoryEn: "Anxiety",
    content: `
<div style="font-family:inherit;line-height:1.8;color:inherit">

  <div style="background:linear-gradient(135deg,#0ea5e910,#10b98110);border-radius:16px;padding:16px;margin-bottom:20px;border-right:4px solid #0ea5e9">
    <p style="margin:0;font-size:13px;color:#0ea5e9;font-weight:700">📋 وفق إرشادات منظمة الصحة العالمية (WHO) — ICD-11 وDSM-5</p>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px;margin-top:0">🧠 ما هي نوبة الهلع؟</h2>
  <p style="margin-bottom:14px">نوبة الهلع (Panic Attack) هي موجة مفاجئة من الخوف أو الانزعاج الشديد تبلغ ذروتها خلال دقائق، وتكون مصحوبة بأعراض جسدية ونفسية حادة. وفق التصنيف الدولي للأمراض ICD-11 الصادر عن <strong>منظمة الصحة العالمية</strong>، تُصنَّف نوبات الهلع ضمن اضطرابات القلق ويمكن علاجها بفاعلية عالية تتجاوز 80% بالعلاجات الحديثة.</p>
  <p style="margin-bottom:20px">الحقيقة الأهم: <strong>نوبة الهلع لا تُشكّل خطراً جسدياً</strong>، حتى لو أوهمتك بذلك. الجسم يُطلق استجابة "الكرّ والفرّ" (Fight-or-Flight) بشكل مبالغ فيه، وهي استجابة بقائية طبيعية ذهبت في الاتجاه الخطأ.</p>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">⚡ الأعراض الشائعة</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px">
    <div style="background:#ef444415;border-radius:10px;padding:10px">
      <p style="font-weight:700;color:#ef4444;margin:0 0 6px 0;font-size:13px">جسدية</p>
      <ul style="margin:0;padding-right:16px;font-size:13px;line-height:2">
        <li>تسارع شديد في نبضات القلب</li>
        <li>ضيق في التنفس أو الإحساس بالاختناق</li>
        <li>رعشة أو اهتزاز في الجسم</li>
        <li>تعرّق بارد أو سخونة مفاجئة</li>
        <li>ألم أو ضغط في الصدر</li>
        <li>دوار أو الشعور بالإغماء</li>
        <li>تنمّل في الأطراف</li>
        <li>غثيان أو ضائقة في المعدة</li>
      </ul>
    </div>
    <div style="background:#8b5cf615;border-radius:10px;padding:10px">
      <p style="font-weight:700;color:#8b5cf6;margin:0 0 6px 0;font-size:13px">نفسية</p>
      <ul style="margin:0;padding-right:16px;font-size:13px;line-height:2">
        <li>خوف شديد من الموت أو الجنون</li>
        <li>شعور بفقدان السيطرة</li>
        <li>الإحساس بعدم الواقعية (Derealization)</li>
        <li>الشعور بالانفصال عن الجسد</li>
        <li>رهبة وجدانية بلا سبب واضح</li>
      </ul>
    </div>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">🚨 الخطوات الفورية أثناء النوبة</h2>
  <p style="margin-bottom:12px;font-size:13px;color:#6b7280">هذه الخطوات مبنية على بروتوكول العلاج المعرفي السلوكي (CBT) الموصى به من منظمة الصحة العالمية:</p>

  <div style="border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;margin-bottom:20px">
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908;border-bottom:1px solid #e5e7eb">
      <div style="background:#0ea5e9;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">١</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">أوقف المقاومة — "هذا الشعور لن يؤذيني"</p>
        <p style="font-size:13px;color:#6b7280;margin:0">مقاومة الهلع تُغذّيه. قل لنفسك: <em>"أنا أعاني من نوبة هلع وهي ستمر خلال 10 دقائق بالحد الأقصى."</em></p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white;border-bottom:1px solid #e5e7eb">
      <div style="background:#10b981;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٢</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">تنفس التهدئة الفسيولوجية</p>
        <p style="font-size:13px;color:#6b7280;margin:0">استنشق بعمق، ثم استنشق مرة ثانية أصغر فوق نفس الشهيق، ثم أخرج الهواء ببطء شديد.<br/><strong>أو تقنية 4-7-8:</strong> استنشق 4 ثوان ← احبس 7 ثوان ← أخرج 8 ثوان.</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908;border-bottom:1px solid #e5e7eb">
      <div style="background:#f59e0b;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٣</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">قاعدة 5-4-3-2-1 (تأريض حسّي)</p>
        <ul style="margin:0;padding-right:16px;font-size:13px;line-height:2;color:#374151">
          <li>👁️ <strong>5 أشياء تراها</strong> الآن</li>
          <li>✋ <strong>4 أشياء تلمسها</strong></li>
          <li>👂 <strong>3 أصوات تسمعها</strong></li>
          <li>👃 <strong>رائحتان تشمّهما</strong></li>
          <li>👅 <strong>طعم واحد في فمك</strong></li>
        </ul>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white">
      <div style="background:#8b5cf6;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٤</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">تقنية التصحيح المعرفي</p>
        <p style="font-size:13px;color:#6b7280;margin:0">اسأل نفسك: <em>"هل سبق أن مررت بهذا الشعور ونجوت؟"</em> الإجابة دائماً نعم.</p>
      </div>
    </div>
  </div>

  <div style="background:linear-gradient(135deg,#0ea5e915,#10b98115);border-radius:14px;padding:16px;text-align:center">
    <p style="font-size:22px;margin:0 0 6px 0">💚</p>
    <p style="font-weight:700;color:#0ea5e9;font-size:15px;margin:0 0 6px 0">تذكّر دائماً</p>
    <p style="font-size:13px;color:#374151;margin:0;line-height:1.7">نوبة الهلع ليست جنوناً ولا ضعفاً — إنها جهاز إنذار حساس يحتاج إعادة معايرة. أنت لست وحدك في هذا.</p>
  </div>

  <p style="font-size:11px;color:#9ca3af;margin-top:16px;text-align:center">المصادر: منظمة الصحة العالمية (ICD-11) · الجمعية الأمريكية للطب النفسي (DSM-5) · Harvard Medical School 2022 · Stanford Neuroscience 2023</p>

</div>
    `,
    contentEn: `
<div style="font-family:inherit;line-height:1.8;color:inherit">

  <div style="background:linear-gradient(135deg,#0ea5e910,#10b98110);border-radius:16px;padding:16px;margin-bottom:20px;border-left:4px solid #0ea5e9">
    <p style="margin:0;font-size:13px;color:#0ea5e9;font-weight:700">📋 Based on WHO Guidelines — ICD-11 and DSM-5</p>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px;margin-top:0">🧠 What is a Panic Attack?</h2>
  <p style="margin-bottom:14px">A panic attack is a sudden wave of intense fear or discomfort that peaks within minutes, accompanied by acute physical and psychological symptoms. According to the WHO's ICD-11, panic attacks are classified under anxiety disorders and can be treated with over 80% effectiveness using modern therapies.</p>
  <p style="margin-bottom:20px">The most important truth: <strong>a panic attack poses no physical danger</strong>, even though it feels otherwise. Your body triggers an exaggerated fight-or-flight response — a natural survival mechanism misfiring.</p>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">⚡ Common Symptoms</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px">
    <div style="background:#ef444415;border-radius:10px;padding:10px">
      <p style="font-weight:700;color:#ef4444;margin:0 0 6px 0;font-size:13px">Physical</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;line-height:2">
        <li>Rapid heart rate / palpitations</li>
        <li>Shortness of breath / choking sensation</li>
        <li>Trembling or shaking</li>
        <li>Cold sweats or sudden heat</li>
        <li>Chest pain or pressure</li>
        <li>Dizziness or near-fainting</li>
        <li>Numbness or tingling</li>
        <li>Nausea or stomach distress</li>
      </ul>
    </div>
    <div style="background:#8b5cf615;border-radius:10px;padding:10px">
      <p style="font-weight:700;color:#8b5cf6;margin:0 0 6px 0;font-size:13px">Psychological</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;line-height:2">
        <li>Intense fear of dying or losing control</li>
        <li>Feeling of unreality (derealization)</li>
        <li>Detachment from self (depersonalization)</li>
        <li>Overwhelming dread without clear cause</li>
      </ul>
    </div>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">🚨 Immediate Steps During an Attack</h2>
  <p style="margin-bottom:12px;font-size:13px;color:#6b7280">Based on the CBT protocol recommended by the WHO:</p>

  <div style="border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;margin-bottom:20px">
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908;border-bottom:1px solid #e5e7eb">
      <div style="background:#0ea5e9;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">1</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">Stop resisting — "This feeling will not hurt me"</p>
        <p style="font-size:13px;color:#6b7280;margin:0">Resistance fuels the panic. Tell yourself: <em>"I am having a panic attack and it will pass within 10 minutes at most."</em> Acceptance speeds up recovery.</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white;border-bottom:1px solid #e5e7eb">
      <div style="background:#10b981;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">2</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">Physiological Sigh (Stanford 2023)</p>
        <p style="font-size:13px;color:#6b7280;margin:0">Inhale deeply, then take a second smaller inhale on top, then exhale slowly and fully.<br/><strong>Or 4-7-8 technique:</strong> Inhale 4s → Hold 7s → Exhale 8s. Repeat 4 times.</p>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908;border-bottom:1px solid #e5e7eb">
      <div style="background:#f59e0b;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">3</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">5-4-3-2-1 Grounding Technique</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;line-height:2;color:#374151">
          <li>👁️ <strong>5 things you can see</strong></li>
          <li>✋ <strong>4 things you can touch</strong></li>
          <li>👂 <strong>3 sounds you can hear</strong></li>
          <li>👃 <strong>2 things you can smell</strong></li>
          <li>👅 <strong>1 taste in your mouth</strong></li>
        </ul>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white">
      <div style="background:#8b5cf6;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">4</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">Cognitive Correction</p>
        <p style="font-size:13px;color:#6b7280;margin:0">Ask yourself: <em>"Have I felt this before and survived?"</em> The answer is always yes. Your brain is exaggerating the danger — counter it with logic.</p>
      </div>
    </div>
  </div>

  <div style="background:linear-gradient(135deg,#0ea5e915,#10b98115);border-radius:14px;padding:16px;text-align:center">
    <p style="font-size:22px;margin:0 0 6px 0">💚</p>
    <p style="font-weight:700;color:#0ea5e9;font-size:15px;margin:0 0 6px 0">Always Remember</p>
    <p style="font-size:13px;color:#374151;margin:0;line-height:1.7">A panic attack is not madness or weakness — it's a sensitive alarm system that needs recalibration. Hundreds of millions worldwide face what you're facing and have recovered. You are not alone in this.</p>
  </div>

  <p style="font-size:11px;color:#9ca3af;margin-top:16px;text-align:center">Sources: WHO (ICD-11) · American Psychiatric Association (DSM-5) · Harvard Medical School 2022 · Stanford Neuroscience 2023</p>

</div>
    `,
  },
  {
    id: 2,
    title: "فهم الاكتئاب وكيفية التعافي",
    titleEn: "Understanding Depression and How to Recover",
    summary: "تعرف على أعراض الاكتئاب وطرق العلاج والتعافي المنهجي",
    summaryEn: "Learn about depression symptoms, treatment options, and the path to systematic recovery",
    category: "الاكتئاب",
    categoryEn: "Depression",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">ما هو الاكتئاب؟</h3>
      <p>الاكتئاب أكثر من مجرد حزن. إنه حالة طبية تؤثر على المشاعر والتفكير والسلوك اليومي. يمكن علاجه وليس ضعفاً في الشخصية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">الأعراض الشائعة</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>الشعور بالحزن أو الفراغ معظم الوقت</li>
        <li>فقدان الاهتمام بأشياء كانت ممتعة</li>
        <li>تغيرات في النوم والشهية</li>
        <li>صعوبة التركيز واتخاذ القرارات</li>
        <li>الشعور بالعجز أو انعدام القيمة</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">خطوات نحو التعافي</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>اطلب المساعدة المتخصصة:</strong> العلاج النفسي والأدوية فعّالان جداً</li>
        <li><strong>حافظ على روتين يومي:</strong> النوم المنتظم والنشاط الجسدي مهمان</li>
        <li><strong>تواصل مع المقربين:</strong> العزلة تُعمّق الاكتئاب</li>
        <li><strong>تحلَّ بالصبر:</strong> التعافي رحلة وليس حدثاً واحداً</li>
      </ul>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">What is Depression?</h3>
      <p>Depression is more than just sadness. It's a medical condition that affects emotions, thinking, and daily behavior. It's treatable and is not a character weakness.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Common Symptoms</h3>
      <ul style="padding-left:20px;line-height:2">
        <li>Feeling sad or empty most of the time</li>
        <li>Loss of interest in things you once enjoyed</li>
        <li>Changes in sleep and appetite</li>
        <li>Difficulty concentrating and making decisions</li>
        <li>Feelings of helplessness or worthlessness</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Steps Toward Recovery</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Seek professional help:</strong> Psychotherapy and medication are highly effective</li>
        <li><strong>Maintain a daily routine:</strong> Regular sleep and physical activity matter greatly</li>
        <li><strong>Stay connected:</strong> Isolation deepens depression</li>
        <li><strong>Be patient:</strong> Recovery is a journey, not a single event</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "تقنيات التنفس للتهدئة الفورية",
    titleEn: "Breathing Techniques for Instant Calm",
    summary: "تمارين تنفس علمية تُهدئ الجهاز العصبي في دقائق",
    summaryEn: "Science-backed breathing exercises that calm your nervous system within minutes",
    category: "الاسترخاء",
    categoryEn: "Relaxation",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">لماذا يعمل التنفس العميق؟</h3>
      <p>التنفس العميق يُفعّل الجهاز العصبي السمبتاوي، مما يُرسل إشارة للجسم بأنه بأمان ويُخفض مستوى الكورتيزول (هرمون التوتر).</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تقنية البطن (الحجابي)</h3>
      <p>ضع يدك على بطنك. استنشق ببطء حتى ترتفع يدك. أخرج الهواء حتى تنخفض. كرر 10 مرات.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تقنية الصندوق (Box Breathing)</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>استنشق لمدة <strong>4 ثوان</strong></li>
        <li>احبس نفسك <strong>4 ثوان</strong></li>
        <li>أخرج الهواء <strong>4 ثوان</strong></li>
        <li>انتظر <strong>4 ثوان</strong> قبل الاستنشاق</li>
        <li>كرر 4 مرات على الأقل</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تقنية 4-7-8</h3>
      <p>استنشق 4 ثوان، احبس 7 ثوان، أخرج الهواء ببطء 8 ثوان. هذه التقنية فعّالة جداً قبل النوم.</p>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">Why Does Deep Breathing Work?</h3>
      <p>Deep breathing activates the parasympathetic nervous system, signaling your body that it's safe and lowering cortisol (the stress hormone).</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Diaphragmatic (Belly) Breathing</h3>
      <p>Place your hand on your belly. Inhale slowly until your hand rises. Exhale until it falls. Repeat 10 times.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Box Breathing</h3>
      <ul style="padding-left:20px;line-height:2">
        <li>Inhale for <strong>4 seconds</strong></li>
        <li>Hold for <strong>4 seconds</strong></li>
        <li>Exhale for <strong>4 seconds</strong></li>
        <li>Wait <strong>4 seconds</strong> before inhaling again</li>
        <li>Repeat at least 4 times</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">4-7-8 Technique</h3>
      <p>Inhale for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds. This technique is especially effective before sleep.</p>
    `,
  },
  {
    id: 4,
    title: "كيف تبني حدوداً صحية في العلاقات؟",
    titleEn: "How to Build Healthy Boundaries in Relationships",
    summary: "تعلم كيف تقول لا وتحمي طاقتك العاطفية بدون ذنب",
    summaryEn: "Learn how to say no and protect your emotional energy without guilt",
    category: "العلاقات",
    categoryEn: "Relationships",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">ما هي الحدود الصحية؟</h3>
      <p>الحدود الصحية هي الخطوط التي ترسمها لتحديد ما تقبله وما لا تقبله في تعاملاتك مع الآخرين. إنها ليست أنانية، بل ضرورة للصحة النفسية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">كيف تضع حدوداً فعّالة؟</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>اعرف احتياجاتك:</strong> حدد ما يُنهكك وما يُعطيك طاقة</li>
        <li><strong>تحدث بوضوح وهدوء:</strong> "لا أستطيع فعل ذلك" دون اعتذار مطوّل</li>
        <li><strong>كن ثابتاً:</strong> التراجع المتكرر يُضعف الحدود</li>
        <li><strong>ابدأ بالصغير:</strong> حدود صغيرة تُعطيك الثقة لحدود أكبر</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">جمل مفيدة لوضع الحدود</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>"أحتاج وقتاً لنفسي الآن"</li>
        <li>"هذا الأمر لا يريحني"</li>
        <li>"أقدّر طلبك لكنني لا أستطيع"</li>
      </ul>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">What Are Healthy Boundaries?</h3>
      <p>Healthy boundaries are the lines you draw to define what you accept and what you don't in your interactions. They are not selfish — they are essential for psychological health.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">How to Set Effective Boundaries</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Know your needs:</strong> Identify what drains you and what energizes you</li>
        <li><strong>Speak clearly and calmly:</strong> "I can't do that" without lengthy apologies</li>
        <li><strong>Be consistent:</strong> Repeated backtracking weakens your boundaries</li>
        <li><strong>Start small:</strong> Small boundaries build confidence for larger ones</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Helpful Phrases for Boundaries</h3>
      <ul style="padding-left:20px;line-height:2">
        <li>"I need some time for myself right now"</li>
        <li>"That doesn't feel comfortable for me"</li>
        <li>"I appreciate the request but I'm not able to"</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "النوم وصحتك النفسية: العلاقة الخفية",
    titleEn: "Sleep & Mental Health: The Hidden Connection",
    summary: "كيف يؤثر النوم على مزاجك وكيف تُحسّن جودته",
    summaryEn: "How sleep affects your mood and practical steps to improve its quality",
    category: "النوم",
    categoryEn: "Sleep",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">النوم وصحة الدماغ</h3>
      <p>خلال النوم، يُعيد الدماغ معالجة المشاعر وترسيخ الذكريات وإفراز هرمونات الشفاء. قلة النوم تُضخّم ردود الفعل العاطفية وتُضعف التفكير المنطقي.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">عادات النوم الصحي</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>نم واستيقظ في <strong>نفس الوقت</strong> يومياً حتى في العطل</li>
        <li>أبعد الهاتف والشاشات <strong>ساعة قبل النوم</strong></li>
        <li>اجعل غرفتك <strong>باردة ومظلمة وهادئة</strong></li>
        <li>تجنب الكافيين بعد <strong>الساعة 2 ظهراً</strong></li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">روتين ما قبل النوم</h3>
      <p>اخصص 30 دقيقة للاسترخاء: اقرأ كتاباً، اكتب في مذكرات، أو مارس تمارين التنفس. هذا يُهيئ دماغك للنوم العميق.</p>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">Sleep and Brain Health</h3>
      <p>During sleep, your brain processes emotions, consolidates memories, and releases healing hormones. Sleep deprivation amplifies emotional reactions and impairs logical thinking.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Healthy Sleep Habits</h3>
      <ul style="padding-left:20px;line-height:2">
        <li>Sleep and wake at <strong>the same time</strong> daily, even on weekends</li>
        <li>Put away your phone and screens <strong>1 hour before bed</strong></li>
        <li>Keep your room <strong>cool, dark, and quiet</strong></li>
        <li>Avoid caffeine after <strong>2 PM</strong></li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Pre-Sleep Routine</h3>
      <p>Set aside 30 minutes to unwind: read a book, journal, or practice breathing exercises. This prepares your brain for deep, restorative sleep.</p>
    `,
  },
  {
    id: 6,
    title: "الذاكرة العاطفية وكيفية الشفاء من الصدمات",
    titleEn: "Emotional Memory & Healing from Trauma",
    summary: "فهم تأثير الصدمات النفسية وخطوات الشفاء الصحيح",
    summaryEn: "Understanding the impact of psychological trauma and the steps to proper healing",
    category: "الصدمات",
    categoryEn: "Trauma",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">ما هي الصدمة النفسية؟</h3>
      <p>الصدمة هي استجابة الجهاز العصبي لأحداث مُرهقة تجاوزت قدرتنا على التكيف في تلك اللحظة. ليست ضعفاً، بل رد فعل طبيعي لظروف غير طبيعية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">أعراض الصدمة غير المعالجة</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>فرط اليقظة والتوجس المستمر</li>
        <li>تجنب المواقف المُذكِّرة بالحدث</li>
        <li>ذكريات مؤلمة تتكرر فجأة (Flashbacks)</li>
        <li>صعوبة الثقة بالآخرين</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">مراحل الشفاء</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>الأمان أولاً:</strong> اضمن لنفسك بيئة آمنة ومستقرة</li>
        <li><strong>الاعتراف:</strong> الاعتراف بالصدمة دون إنكار</li>
        <li><strong>المعالجة:</strong> بمساعدة متخصص (CBT, EMDR)</li>
        <li><strong>إعادة الارتباط:</strong> استعادة العلاقات والحياة الطبيعية</li>
      </ul>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">What is Psychological Trauma?</h3>
      <p>Trauma is the nervous system's response to overwhelming events that exceeded our coping capacity at that moment. It's not a weakness — it's a natural reaction to abnormal circumstances.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Symptoms of Unprocessed Trauma</h3>
      <ul style="padding-left:20px;line-height:2">
        <li>Hypervigilance and constant anxiety</li>
        <li>Avoidance of reminders of the event</li>
        <li>Intrusive memories (flashbacks)</li>
        <li>Difficulty trusting others</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Stages of Healing</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Safety first:</strong> Ensure you have a safe and stable environment</li>
        <li><strong>Acknowledgment:</strong> Recognize the trauma without denial</li>
        <li><strong>Processing:</strong> With professional help (CBT, EMDR)</li>
        <li><strong>Reconnection:</strong> Rebuilding relationships and normal life</li>
      </ul>
    `,
  },
  {
    id: 7,
    title: "تقدير الذات: كيف تبني علاقة صحية مع نفسك؟",
    titleEn: "Self-Esteem: How to Build a Healthy Relationship with Yourself",
    summary: "خطوات علمية لتحسين صورة الذات وبناء ثقة حقيقية",
    summaryEn: "Evidence-based steps to improve self-image and build genuine confidence",
    category: "تقدير الذات",
    categoryEn: "Self-Esteem",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">تقدير الذات ليس غروراً</h3>
      <p>تقدير الذات هو الشعور بالقيمة الأساسية لكونك إنساناً، بغض النظر عن إنجازاتك أو موافقة الآخرين.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">ممارسات يومية لتعزيز تقدير الذات</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>تحدّث مع نفسك بلطف:</strong> ماذا ستقول لصديق في نفس موقفك؟</li>
        <li><strong>وثّق إنجازاتك:</strong> احتفظ بقائمة بأشياء أنجزتها مهما كانت صغيرة</li>
        <li><strong>تعلم من الأخطاء:</strong> الخطأ معلومة وليس عيباً في شخصيتك</li>
        <li><strong>ابتعد عن المقارنة:</strong> سباقك مع نفسك أمس فقط</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تمرين يومي بسيط</h3>
      <p>قبل النوم اكتب 3 أشياء أحببتها في نفسك اليوم. استمر لمدة 21 يوماً وستلاحظ تحولاً حقيقياً.</p>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">Self-Esteem Is Not Arrogance</h3>
      <p>Self-esteem is the sense of fundamental worth simply from being human — regardless of your achievements or others' approval. It's the foundation of mental health.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Daily Practices to Build Self-Esteem</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Speak to yourself kindly:</strong> What would you say to a friend in your situation?</li>
        <li><strong>Document your achievements:</strong> Keep a list of things you've done, no matter how small</li>
        <li><strong>Learn from mistakes:</strong> Errors are information, not character flaws</li>
        <li><strong>Stop comparing:</strong> Your only race is with your past self</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Simple Daily Exercise</h3>
      <p>Before sleep, write 3 things you liked about yourself today. Continue for 21 days and you'll notice a genuine shift in how you see yourself.</p>
    `,
  },
  {
    id: 8,
    title: "إدارة الغضب: أساليب صحية للتعبير عن مشاعرك",
    titleEn: "Anger Management: Healthy Ways to Express Your Feelings",
    summary: "تعلم كيف تُعبّر عن غضبك دون أن تؤذي نفسك أو الآخرين",
    summaryEn: "Learn how to express anger without harming yourself or others",
    category: "المشاعر",
    categoryEn: "Emotions",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">الغضب ليس عدوك</h3>
      <p>الغضب مشاعر طبيعية وضرورية تُخبرك بأن حداً ما قد انتُهك. المشكلة ليست الغضب نفسه، بل كيفية التعبير عنه.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">خطوات إدارة الغضب</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>توقف فوراً:</strong> عدّ لـ 10 أو اخرج من المكان</li>
        <li><strong>تنفس:</strong> التنفس العميق يُخفض الأدرينالين</li>
        <li><strong>حدد السبب الحقيقي:</strong> الغضب غالباً يخفي ألماً أو خوفاً</li>
        <li><strong>تعبّر بـ"أنا":</strong> "أشعر بالإحباط عندما..." بدلاً من "أنت دائماً..."</li>
        <li><strong>مارس الرياضة:</strong> تصريف الطاقة جسدياً يُفرغ الغضب المكبوت</li>
      </ul>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">Anger Is Not Your Enemy</h3>
      <p>Anger is a natural and necessary emotion that signals a boundary has been crossed. The problem isn't anger itself — it's how we express it.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Anger Management Steps</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Stop immediately:</strong> Count to 10 or step away from the situation</li>
        <li><strong>Breathe:</strong> Deep breathing lowers adrenaline levels</li>
        <li><strong>Find the real cause:</strong> Anger often hides pain or fear</li>
        <li><strong>Use "I" statements:</strong> "I feel frustrated when..." instead of "You always..."</li>
        <li><strong>Exercise:</strong> Physical activity releases pent-up anger safely</li>
      </ul>
    `,
  },
  {
    id: 9,
    title: "مفاتيح الصحة النفسية الجيدة في الحياة اليومية",
    titleEn: "Keys to Good Mental Health in Everyday Life",
    summary: "عادات يومية بسيطة لتعزيز مرونتك النفسية وسعادتك",
    summaryEn: "Simple daily habits to boost your psychological resilience and happiness",
    category: "الصحة النفسية",
    categoryEn: "Mental Health",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">الصحة النفسية ليست غياب المشاكل</h3>
      <p>الصحة النفسية الجيدة تعني امتلاك الأدوات للتعامل مع تحديات الحياة بمرونة، وليس غياب الألم أو الصعوبات.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">عادات يومية للصحة النفسية</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>حرك جسمك:</strong> 20 دقيقة من أي نشاط بدني يُحسّن المزاج بشكل مثبت علمياً</li>
        <li><strong>تواصل مع الآخرين:</strong> العلاقات الاجتماعية هي أكبر حامٍ للصحة النفسية</li>
        <li><strong>اعطِ:</strong> مساعدة شخص آخر تُطلق هرمونات السعادة في دماغك</li>
        <li><strong>كن حاضراً:</strong> دقيقة واحدة من اليقظة الذهنية تُفرق فارقاً</li>
        <li><strong>تعلم باستمرار:</strong> اكتساب مهارات جديدة يُعزز الإحساس بالقيمة والكفاءة</li>
      </ul>
    `,
    contentEn: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">Mental Health Is Not the Absence of Problems</h3>
      <p>Good mental health means having the tools to handle life's challenges with resilience — not the absence of pain or difficulty.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">Daily Habits for Mental Wellbeing</h3>
      <ul style="padding-left:20px;line-height:2">
        <li><strong>Move your body:</strong> Even 20 minutes of any physical activity measurably improves mood</li>
        <li><strong>Connect with others:</strong> Social relationships are the strongest protector of mental health</li>
        <li><strong>Give:</strong> Helping someone else releases happiness hormones in your brain</li>
        <li><strong>Be present:</strong> Just one minute of mindfulness can make a real difference</li>
        <li><strong>Keep learning:</strong> Acquiring new skills builds a sense of value and competence</li>
      </ul>
    `,
  },
];
