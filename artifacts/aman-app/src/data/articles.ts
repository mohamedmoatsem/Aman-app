export interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
  content: string;
}

export const mentalHealthArticles: Article[] = [
  {
    id: 1,
    title: "كيف تتعامل مع نوبة الهلع؟",
    summary: "دليل احترافي شامل وفق إرشادات منظمة الصحة العالمية وأحدث تقنيات العلاج النفسي",
    category: "القلق",
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
        <p style="font-size:13px;color:#6b7280;margin:0">مقاومة الهلع تُغذّيه. قل لنفسك: <em>"أنا أعاني من نوبة هلع وهي ستمر خلال 10 دقائق بالحد الأقصى."</em> القبول يُسرّع الانتهاء.</p>
      </div>
    </div>

    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white;border-bottom:1px solid #e5e7eb">
      <div style="background:#10b981;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٢</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">تنفس التهدئة الفسيولوجية (Physiological Sigh)</p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 6px 0">الأحدث علمياً من Stanford 2023 — استنشق بعمق، ثم استنشق مرة ثانية أصغر فوق نفس الشهيق، ثم أخرج الهواء ببطء شديد.</p>
        <div style="background:#10b98110;border-radius:8px;padding:8px;font-size:12px">
          <strong>أو تقنية 4-7-8:</strong> استنشق 4 ثوان ← احبس 7 ثوان ← أخرج 8 ثوان. كرّرها 4 مرات.
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908;border-bottom:1px solid #e5e7eb">
      <div style="background:#f59e0b;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٣</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">قاعدة 5-4-3-2-1 (تأريض حسّي)</p>
        <p style="font-size:13px;color:#6b7280;margin:0 0 6px 0">تُعيد دماغك للحظة الحاضرة وتوقف دوامة الأفكار الكارثية:</p>
        <ul style="margin:0;padding-right:16px;font-size:13px;line-height:2;color:#374151">
          <li>👁️ <strong>5 أشياء تراها</strong> الآن</li>
          <li>✋ <strong>4 أشياء تلمسها</strong> (الأرض، الكرسي، ملابسك...)</li>
          <li>👂 <strong>3 أصوات تسمعها</strong></li>
          <li>👃 <strong>رائحتان تشمّهما</strong></li>
          <li>👅 <strong>طعم واحد في فمك</strong></li>
        </ul>
      </div>
    </div>

    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:white;border-bottom:1px solid #e5e7eb">
      <div style="background:#8b5cf6;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٤</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">تقنية التصحيح المعرفي</p>
        <p style="font-size:13px;color:#6b7280;margin:0">اسأل نفسك: <em>"هل سبق أن مررت بهذا الشعور ونجوت؟"</em> الإجابة دائماً نعم. مخّك يُبالغ في الخطر — واجهه بالمنطق.</p>
      </div>
    </div>

    <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:#0ea5e908">
      <div style="background:#ec4899;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0">٥</div>
      <div>
        <p style="font-weight:700;margin:0 0 4px 0">تحرّك بلطف</p>
        <p style="font-size:13px;color:#6b7280;margin:0">المشي الهادئ أو الوقوف وخفق القدمين ببطء يُصرّف الأدرينالين ويُخبر الجسم أن الخطر قد مضى.</p>
      </div>
    </div>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">🛡️ الوقاية على المدى الطويل</h2>
  <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:20px">
    <div style="display:grid;gap:10px">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px">🧘</span>
        <div>
          <p style="font-weight:700;margin:0 0 2px 0;font-size:14px">التأمل والمايندفولنس يومياً</p>
          <p style="font-size:13px;color:#6b7280;margin:0">10 دقائق يومياً تُقلّل تواتر النوبات بنسبة 58% وفق دراسة Harvard Medical School 2022.</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px">☕</span>
        <div>
          <p style="font-weight:700;margin:0 0 2px 0;font-size:14px">تجنّب المحفّزات</p>
          <p style="font-size:13px;color:#6b7280;margin:0">الكافيين، الكحول، قلة النوم، والسكر المكرر تزيد حساسية الجهاز العصبي وتُهيئ لنوبات الهلع.</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px">🏃</span>
        <div>
          <p style="font-weight:700;margin:0 0 2px 0;font-size:14px">النشاط البدني المنتظم</p>
          <p style="font-size:13px;color:#6b7280;margin:0">30 دقيقة من الرياضة المعتدلة 3 مرات أسبوعياً تُكافئ في فاعليتها جرعة منخفضة من الأدوية المضادة للقلق.</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px">📓</span>
        <div>
          <p style="font-weight:700;margin:0 0 2px 0;font-size:14px">تتبّع المشاعر والمحفّزات</p>
          <p style="font-size:13px;color:#6b7280;margin:0">سجّل متى تحدث النوبات ومحفّزاتها. الأنماط تكشف أسباباً قابلة للعلاج قد لا تُدركها وحدك.</p>
        </div>
      </div>
    </div>
  </div>

  <h2 style="color:#0ea5e9;font-size:17px;margin-bottom:10px">🔬 العلاجات الأكثر فاعلية علمياً</h2>
  <div style="display:grid;gap:8px;margin-bottom:20px">
    <div style="background:#0ea5e910;border-radius:10px;padding:12px">
      <p style="font-weight:700;color:#0ea5e9;margin:0 0 4px 0;font-size:14px">العلاج المعرفي السلوكي CBT ⭐⭐⭐⭐⭐</p>
      <p style="font-size:13px;color:#6b7280;margin:0">الخيار الأول الموصى به من WHO وAPA. يُغيّر أنماط التفكير ويُعيد تدريب الاستجابة للخوف. نسبة نجاح تتجاوز 85%.</p>
    </div>
    <div style="background:#10b98110;border-radius:10px;padding:12px">
      <p style="font-weight:700;color:#10b981;margin:0 0 4px 0;font-size:14px">العلاج بالتعرض التدريجي ⭐⭐⭐⭐⭐</p>
      <p style="font-size:13px;color:#6b7280;margin:0">يُعلّم الجهاز العصبي أن المواقف المخيفة آمنة من خلال التعرض المتدرج لها تحت إشراف المعالج.</p>
    </div>
    <div style="background:#8b5cf610;border-radius:10px;padding:12px">
      <p style="font-weight:700;color:#8b5cf6;margin:0 0 4px 0;font-size:14px">العلاج بالقبول والالتزام ACT ⭐⭐⭐⭐</p>
      <p style="font-size:13px;color:#6b7280;margin:0">يُعلّمك قبول الأفكار والمشاعر دون الصراع معها، والتركيز على ما يُضفي معنىً على حياتك رغمها.</p>
    </div>
    <div style="background:#f59e0b10;border-radius:10px;padding:12px">
      <p style="font-weight:700;color:#f59e0b;margin:0 0 4px 0;font-size:14px">الأدوية عند الحاجة</p>
      <p style="font-size:13px;color:#6b7280;margin:0">مثبطات امتصاص السيروتونين (SSRI) فعّالة جداً وتُستخدم بوصفة طبية. لا تتوقف عنها فجأة دون استشارة طبيبك.</p>
    </div>
  </div>

  <div style="background:#ef444415;border:1px solid #ef444430;border-radius:12px;padding:14px;margin-bottom:20px">
    <p style="font-weight:700;color:#ef4444;margin:0 0 8px 0;font-size:14px">🚨 متى تطلب مساعدة عاجلة؟</p>
    <ul style="margin:0;padding-right:16px;font-size:13px;line-height:2;color:#374151">
      <li>نوبة تستمر أكثر من 30 دقيقة دون تحسن</li>
      <li>ألم في الصدر مستمر (للتأكد من سلامة القلب)</li>
      <li>بدأت تتجنب أماكن أو أنشطة خوفاً من النوبات</li>
      <li>أفكار بإيذاء النفس أو الرغبة في الاختفاء</li>
      <li>تكرر النوبات أكثر من مرتين في الأسبوع</li>
    </ul>
  </div>

  <div style="background:linear-gradient(135deg,#0ea5e915,#10b98115);border-radius:14px;padding:16px;text-align:center">
    <p style="font-size:22px;margin:0 0 6px 0">💚</p>
    <p style="font-weight:700;color:#0ea5e9;font-size:15px;margin:0 0 6px 0">تذكّر دائماً</p>
    <p style="font-size:13px;color:#374151;margin:0;line-height:1.7">نوبة الهلع ليست جنوناً ولا ضعفاً — إنها جهاز إنذار حساس يحتاج إعادة معايرة. مئات الملايين حول العالم يواجهون ما تواجهه وتعافوا منه. أنت لست وحدك في هذا.</p>
  </div>

  <p style="font-size:11px;color:#9ca3af;margin-top:16px;text-align:center">المصادر: منظمة الصحة العالمية (ICD-11) · الجمعية الأمريكية للطب النفسي (DSM-5) · Harvard Medical School 2022 · Stanford Neuroscience 2023</p>

</div>
    `,
  },
  {
    id: 2,
    title: "فهم الاكتئاب وكيفية التعافي",
    summary: "تعرف على أعراض الاكتئاب وطرق العلاج والتعافي المنهجي",
    category: "الاكتئاب",
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
  },
  {
    id: 3,
    title: "تقنيات التنفس للتهدئة الفورية",
    summary: "تمارين تنفس علمية تُهدئ الجهاز العصبي في دقائق",
    category: "الاسترخاء",
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
  },
  {
    id: 4,
    title: "كيف تبني حدوداً صحية في العلاقات؟",
    summary: "تعلم كيف تقول لا وتحمي طاقتك العاطفية بدون ذنب",
    category: "العلاقات",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">ما هي الحدود الصحية؟</h3>
      <p>الحدود الصحية هي الخطوط التي ترسمها لتحديد ما تقبله وما لا تقبله في تعاملاتك مع الآخرين. إنها ليست أنانية، بل ضرورة للصحة النفسية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">كيف تضع حدوداً فعّالة؟</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>اعرف احتياجاتك:</strong> حدد ما يُنهكك وما يُعطيك طاقة</li>
        <li><strong>تحدث بوضوح وهدوء:</strong> "لا أستطيع فعل ذلك" دون اعتذار مطوّل</li>
        <li><strong>كن ثابتاً:</strong> التراجع المتكرر يُضعف الحدود</li>
        <li><strong>توقع ردود فعل:</strong> بعض الناس سيعترضون وهذا طبيعي</li>
        <li><strong>ابدأ بالصغير:</strong> حدود صغيرة تُعطيك الثقة لحدود أكبر</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">جمل مفيدة لوضع الحدود</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>"أحتاج وقتاً لنفسي الآن"</li>
        <li>"هذا الأمر لا يريحني"</li>
        <li>"أقدّر طلبك لكنني لا أستطيع"</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "النوم وصحتك النفسية: العلاقة الخفية",
    summary: "كيف يؤثر النوم على مزاجك وكيف تُحسّن جودته",
    category: "النوم",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">النوم وصحة الدماغ</h3>
      <p>خلال النوم، يُعيد الدماغ معالجة المشاعر وترسيخ الذكريات وإفراز هرمونات الشفاء. قلة النوم تُضخّم ردود الفعل العاطفية وتُضعف التفكير المنطقي.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">عادات النوم الصحي (Hygiene Sleep)</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>نم واستيقظ في <strong>نفس الوقت</strong> يومياً حتى في العطل</li>
        <li>أبعد الهاتف والشاشات <strong>ساعة قبل النوم</strong></li>
        <li>اجعل غرفتك <strong>باردة ومظلمة وهادئة</strong></li>
        <li>تجنب الكافيين بعد <strong>الساعة 2 ظهراً</strong></li>
        <li>مارس تمريناً خفيفاً في المساء كالمشي</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">روتين ما قبل النوم</h3>
      <p>اخصص 30 دقيقة للاسترخاء: اقرأ كتاباً، اكتب في مذكرات، أو مارس تمارين التنفس. هذا يُهيئ دماغك للنوم العميق.</p>
    `,
  },
  {
    id: 6,
    title: "الذاكرة العاطفية وكيفية الشفاء من الصدمات",
    summary: "فهم تأثير الصدمات النفسية وخطوات الشفاء الصحيح",
    category: "الصدمات",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">ما هي الصدمة النفسية؟</h3>
      <p>الصدمة هي استجابة الجهاز العصبي لأحداث مُرهقة تجاوزت قدرتنا على التكيف في تلك اللحظة. ليست ضعفاً، بل رد فعل طبيعي لظروف غير طبيعية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">أعراض الصدمة غير المعالجة</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>فرط اليقظة والتوجس المستمر</li>
        <li>تجنب المواقف المُذكِّرة بالحدث</li>
        <li>ذكريات مؤلمة تتكرر فجأة (Flashbacks)</li>
        <li>صعوبة الثقة بالآخرين</li>
        <li>الشعور بالانفصال عن النفس أو الجسد</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">مراحل الشفاء</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>الأمان أولاً:</strong> اضمن لنفسك بيئة آمنة ومستقرة</li>
        <li><strong>الاعتراف:</strong> الاعتراف بالصدمة دون إنكار</li>
        <li><strong>المعالجة:</strong> بمساعدة متخصص (CBT, EMDR)</li>
        <li><strong>إعادة الارتباط:</strong> استعادة العلاقات والحياة الطبيعية</li>
      </ul>
    `,
  },
  {
    id: 7,
    title: "تقدير الذات: كيف تبني علاقة صحية مع نفسك؟",
    summary: "خطوات علمية لتحسين صورة الذات وبناء ثقة حقيقية",
    category: "تقدير الذات",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">تقدير الذات ليس غروراً</h3>
      <p>تقدير الذات هو الشعور بالقيمة الأساسية لكونك إنساناً، بغض النظر عن إنجازاتك أو موافقة الآخرين. إنه الأساس الذي تبني عليه صحتك النفسية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">ممارسات يومية لتعزيز تقدير الذات</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>تحدّث مع نفسك بلطف:</strong> ماذا ستقول لصديق في نفس موقفك؟</li>
        <li><strong>وثّق إنجازاتك:</strong> احتفظ بقائمة بأشياء أنجزتها مهما كانت صغيرة</li>
        <li><strong>ضع حدوداً:</strong> رفض ما يسيء إليك يُعزز احترامك لنفسك</li>
        <li><strong>تعلم من الأخطاء:</strong> الخطأ معلومة وليس عيباً في شخصيتك</li>
        <li><strong>ابتعد عن المقارنة:</strong> سباقك مع نفسك أمس فقط</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تمرين يومي بسيط</h3>
      <p>قبل النوم اكتب 3 أشياء أحببتها في نفسك اليوم. استمر لمدة 21 يوماً وستلاحظ تحولاً حقيقياً في رؤيتك لذاتك.</p>
    `,
  },
  {
    id: 8,
    title: "إدارة الغضب: أساليب صحية للتعبير عن مشاعرك",
    summary: "تعلم كيف تُعبّر عن غضبك دون أن تؤذي نفسك أو الآخرين",
    category: "المشاعر",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">الغضب ليس عدوك</h3>
      <p>الغضب مشاعر طبيعية وضرورية تُخبرك بأن حداً ما قد انتُهك. المشكلة ليست الغضب نفسه، بل كيفية التعبير عنه.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">علامات الغضب الكبوت</h3>
      <ul style="padding-right:20px;line-height:2">
        <li>التوتر الجسدي المستمر وصداع الرأس</li>
        <li>الانفجار على أشياء صغيرة</li>
        <li>السلبية والسخرية المفرطة</li>
        <li>الابتعاد عن الناس</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">خطوات إدارة الغضب</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>توقف فوراً:</strong> عدّ لـ 10 أو اخرج من المكان</li>
        <li><strong>تنفس:</strong> التنفس العميق يُخفض الأدرينالين</li>
        <li><strong>حدد السبب الحقيقي:</strong> الغضب غالباً يخفي ألماً أو خوفاً</li>
        <li><strong>تعبّر بـ"أنا":</strong> "أشعر بالإحباط عندما..." بدلاً من "أنت دائماً..."</li>
        <li><strong>مارس الرياضة:</strong> تصريف الطاقة جسدياً يُفرغ الغضب المكبوت</li>
      </ul>
    `,
  },
  {
    id: 9,
    title: "التعامل مع الوحدة والعزلة الاجتماعية",
    summary: "استراتيجيات لمواجهة الشعور بالوحدة وإعادة الارتباط بالحياة",
    category: "العلاقات",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">الوحدة ≠ الانفراد</h3>
      <p>يمكنك أن تشعر بالوحدة وسط جمع من الناس، ويمكنك ألا تشعر بها وأنت وحدك. الوحدة هي شعور بغياب التواصل الحقيقي والمعنوي.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تأثير الوحدة على الصحة</h3>
      <p>الشعور المزمن بالوحدة يرتبط بزيادة خطر الاكتئاب والقلق وحتى بعض الأمراض الجسدية. لذا فهي قضية صحية جدية.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">خطوات للتواصل من جديد</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>ابدأ صغيراً:</strong> محادثة قصيرة مع جار أو زميل</li>
        <li><strong>انضم لنشاط جماعي:</strong> دورة، مجموعة تطوع، نادٍ</li>
        <li><strong>أعد التواصل:</strong> راسل شخصاً أضعت تواصلك معه</li>
        <li><strong>كن حاضراً:</strong> التواصل الحقيقي يحتاج حضوراً كاملاً</li>
        <li><strong>تقبّل الضعف:</strong> الصداقة الحقيقية تبدأ بالصدق</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: "الامتنان كممارسة يومية لتحسين الصحة النفسية",
    summary: "كيف يُعيد الامتنان برمجة دماغك نحو الإيجابية والسعادة",
    category: "الصحة النفسية",
    content: `
      <h3 style="color:#0ea5e9;margin-bottom:8px">علم الامتنان</h3>
      <p>تُظهر الأبحاث أن ممارسة الامتنان بانتظام تُحفّز إفراز الدوبامين والسيروتونين وتُعيد تشكيل مسارات الدماغ نحو التفكير الإيجابي.</p>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">كيف تمارس الامتنان؟</h3>
      <ul style="padding-right:20px;line-height:2">
        <li><strong>مذكرة الامتنان:</strong> اكتب 3 أشياء تشكر عليها كل صباح</li>
        <li><strong>كن محدداً:</strong> "أشكر الله على نظرة زميلي المشجعة اليوم" أفضل من "أشكر على حياتي"</li>
        <li><strong>عبّر للآخرين:</strong> قل لشخص ما شكراً بجملة واضحة وصادقة</li>
        <li><strong>امتنن للصعوبات:</strong> ما الذي علّمتك إياه أصعب لحظاتك؟</li>
      </ul>
      <h3 style="color:#0ea5e9;margin-top:16px;margin-bottom:8px">تحدي 7 أيام</h3>
      <p>لمدة 7 أيام متواصلة، اكتب 5 أشياء تشعر بالامتنان تجاهها قبل النوم. بعد أسبوع ستلاحظ تحولاً واضحاً في مزاجك ونظرتك للحياة.</p>
    `,
  },
];
