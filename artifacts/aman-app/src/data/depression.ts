export interface RecoveryStory {
  id: number;
  name: string;
  nameEn: string;
  age: number;
  duration: string;
  durationEn: string;
  story: string;
  storyEn: string;
  turning: string;
  turningEn: string;
  now: string;
  nowEn: string;
  initials: string;
  color: string;
}

export interface Technique {
  id: number;
  title: string;
  titleEn: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  steps: string[];
  stepsEn: string[];
  evidence: string;
  evidenceEn: string;
}

export interface Strategy {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  summary: string;
  summaryEn: string;
  detail: string;
  detailEn: string;
  references: string[];
}

export const recoveryStories: RecoveryStory[] = [
  {
    id: 1,
    name: "سارة",
    nameEn: "Sara",
    age: 28,
    duration: "3 سنوات",
    durationEn: "3 years",
    initials: "س",
    color: "#0EA5E9",
    story:
      "عشت 3 سنوات لا أستطيع النهوض من السرير في الصباح. كنت أبكي دون سبب، وأشعر أن الحياة توقفت. فقدت عملي وابتعد عني أصدقائي لأنني لم أستطع الخروج. كنت أظن أن هذا هو شكل حياتي إلى الأبد.",
    storyEn:
      "I spent 3 years unable to get out of bed in the mornings. I would cry for no reason and feel as though life had stopped. I lost my job and my friends drifted away because I couldn't go out. I thought this was what my life would be like forever.",
    turning:
      "نقطة التحول جاءت حين جلست أمام طبيبة نفسية للمرة الأولى وبكيت طوال الجلسة دون أن تحكم عليّ. قالت لي: 'ما تشعرين به حقيقي وهناك علاج'. تلك الجملة غيّرت حياتي.",
    turningEn:
      "The turning point came when I sat with a psychiatrist for the first time and cried throughout the entire session without her judging me. She said: 'What you're feeling is real and there is treatment.' Those words changed my life.",
    now: "اليوم أعمل معالجة نفسية وأساعد أشخاصاً مررت بنفس تجربتهم. تعافيت بمزيج من الدواء والعلاج المعرفي السلوكي والتأمل اليومي.",
    nowEn:
      "Today I work as a psychotherapist and help people who've been through the same experience. I recovered through a combination of medication, cognitive behavioural therapy, and daily meditation.",
  } as any,
  {
    id: 2,
    name: "محمد",
    nameEn: "Muhammad",
    age: 35,
    duration: "5 سنوات",
    durationEn: "5 years",
    initials: "م",
    color: "#8B5CF6",
    story:
      "الاكتئاب لا يعني الحزن دائماً. أنا كنت غاضباً، مُنهكاً، فارغاً. كنت أذهب للعمل وأبدو طبيعياً للجميع لكن في الداخل كنت أُعاني. ظللت 5 سنوات أظن أنني فقط 'ضعيف' وأن الأمر يتعلق بالإرادة.",
    storyEn:
      "Depression doesn't always mean sadness. I was angry, exhausted, empty. I'd go to work and appear normal to everyone, but inside I was suffering. For 5 years I thought I was simply 'weak' and that it was a matter of willpower.",
    turning:
      "انهرت أمام أخي ذات ليلة وأخبرته بكل شيء. أخذني في اليوم التالي لطبيب نفسي. كان أصعب قرار في حياتي وأحكمه.",
    turningEn:
      "I broke down in front of my brother one night and told him everything. He took me to a psychiatrist the next day. It was the hardest decision of my life — and the wisest.",
    now: "بعد سنتين من العلاج، أصبحت أفهم نفسي بشكل لم أفهمها قبله. أمارس رياضة الجري يومياً وهو ما غيّر كيمياء دماغي بشكل ملحوظ.",
    nowEn:
      "After two years of therapy, I came to understand myself in ways I never had before. I run every day and it has noticeably changed my brain chemistry.",
  } as any,
  {
    id: 3,
    name: "نور",
    nameEn: "Nour",
    age: 22,
    duration: "سنة ونصف",
    durationEn: "18 months",
    initials: "ن",
    color: "#EC4899",
    story:
      "بدأ الاكتئاب في سنتي الثانية بالجامعة. كنت أفشل في المواد وأشعر أنني أخيب ظن أهلي. توقفت عن أكل وجبات كاملة وكنت أنام 14 ساعة أحياناً. الأصعب كان الشعور بالوحدة وسط مئات الطلاب.",
    storyEn:
      "Depression began in my second year at university. I was failing courses and feeling as though I was letting my family down. I stopped eating full meals and would sometimes sleep for 14 hours. The hardest part was feeling alone in a sea of hundreds of students.",
    turning:
      "أرسلت رسالة لأستاذتي المفضلة أخبرتها أنني لا أستطيع إكمال المادة. ردّت عليّ برسالة طويلة ورقم عيادة الصحة النفسية الجامعية. ذلك الرد أنقذ مساري.",
    turningEn:
      "I sent a message to my favourite professor saying I couldn't complete the course. She replied with a long message and the number for the university's mental health clinic. That reply saved my path.",
    now: "تخرجت بامتياز وأعمل الآن في مجال أحبه. أمارس اليوغا وأحتفظ بمذكرة يومية منذ سنتين. العلاج النفسي أعطاني أدوات لفهم عواطفي.",
    nowEn:
      "I graduated with distinction and now work in a field I love. I practise yoga and have kept a daily journal for two years. Therapy gave me tools to understand my emotions.",
  } as any,
  {
    id: 4,
    name: "خالد",
    nameEn: "Khalid",
    age: 45,
    duration: "7 سنوات",
    durationEn: "7 years",
    initials: "خ",
    color: "#F59E0B",
    story:
      "سبع سنوات أعيش بوجهين: رجل أعمال ناجح ظاهرياً وشخص يتألم بصمت في الداخل. كنت أستخدم الانشغال الدائم بالعمل لأهرب من نفسي. لم أكن أعرف أن ما أشعر به له اسم: اكتئاب.",
    storyEn:
      "Seven years living as two people: a seemingly successful businessman on the outside, a person suffering in silence within. I was using constant busyness with work as an escape from myself. I didn't know that what I was feeling had a name: depression.",
    turning:
      "أصيبت زوجتي بمرض وللمرة الأولى احتجت أن أكون حاضراً لشخص آخر. أدركت أنني لم أكن حاضراً لنفسي. ذهبت للعلاج وبدأت رحلة حقيقية.",
    turningEn:
      "My wife fell ill, and for the first time I needed to be present for someone else. I realised I hadn't been present for myself. I started therapy and began a genuine journey.",
    now: "الآن في الخمسين أشعر أنني أعيش لأول مرة. العلاج بالتحليل النفسي ساعدني أفهم جذور ألمي. علاقتي بأسرتي وبنفسي تحولت كلياً.",
    nowEn:
      "Now at fifty I feel I am living for the first time. Psychoanalytic therapy helped me understand the roots of my pain. My relationship with my family — and with myself — has transformed completely.",
  } as any,
];

export const modernTechniques: Technique[] = [
  {
    id: 1,
    title: "العلاج المعرفي السلوكي",
    titleEn: "Cognitive Behavioural Therapy",
    subtitle: "CBT – Cognitive Behavioral Therapy",
    icon: "🧠",
    color: "#0EA5E9",
    description:
      "أثبت العلاج المعرفي السلوكي فعاليته في علاج الاكتئاب بنسبة تصل إلى 60-80% في الدراسات السريرية. يعمل على تغيير أنماط التفكير السلبية التلقائية.",
    descriptionEn:
      "CBT has demonstrated 60–80% effectiveness in clinical studies for treating depression. It works by changing automatic negative thought patterns.",
    steps: [
      "تحديد الأفكار التلقائية السلبية ورصدها يومياً",
      "فحص الأدلة الداعمة والمعارضة لتلك الأفكار",
      "استبدالها بأفكار أكثر توازناً وواقعية",
      "تطبيق سلوكيات جديدة تعزز المشاعر الإيجابية",
      "بناء مهارات منع الانتكاس على المدى البعيد",
    ],
    stepsEn: [
      "Identify and monitor daily automatic negative thoughts",
      "Examine supporting and contradicting evidence for those thoughts",
      "Replace them with more balanced, realistic thoughts",
      "Adopt new behaviours that reinforce positive feelings",
      "Build relapse prevention skills for the long term",
    ],
    evidence:
      "مراجعة Cochrane 2019: CBT فعّال مثل الأدوية للاكتئاب المتوسط إلى الشديد",
    evidenceEn:
      "Cochrane Review 2019: CBT is as effective as medication for moderate-to-severe depression",
  },
  {
    id: 2,
    title: "العلاج بالتحفيز المغناطيسي",
    titleEn: "Transcranial Magnetic Stimulation",
    subtitle: "TMS – Transcranial Magnetic Stimulation",
    icon: "⚡",
    color: "#8B5CF6",
    description:
      "تقنية غير جراحية تستخدم نبضات مغناطيسية لتحفيز مناطق الدماغ المرتبطة بالمزاج. معتمدة من FDA للاكتئاب المقاوم للعلاج.",
    descriptionEn:
      "A non-invasive technique using magnetic pulses to stimulate mood-related brain areas. FDA-approved for treatment-resistant depression.",
    steps: [
      "جلسات تستغرق 20-40 دقيقة يومياً",
      "دورة علاجية من 4 إلى 6 أسابيع",
      "لا تستلزم تخديراً أو إقامة في المستشفى",
      "يمكن مزجها مع العلاج النفسي والدواء",
      "نتائج تظهر عادةً بعد الأسبوعين الثالث والرابع",
    ],
    stepsEn: [
      "Sessions lasting 20–40 minutes daily",
      "Treatment course of 4 to 6 weeks",
      "No anaesthesia or hospitalisation required",
      "Can be combined with psychotherapy and medication",
      "Results typically appear after the third or fourth week",
    ],
    evidence:
      "دراسة O'Reardon 2007: 14% مغفرة كاملة في المجموعة العلاجية مقابل 5.5% في المجموعة الضابطة",
    evidenceEn:
      "O'Reardon et al. 2007: 14% full remission in the treatment group vs 5.5% in the control group",
  },
  {
    id: 3,
    title: "العلاج بالعقل والجسد – اليقظة الذهنية",
    titleEn: "Mindfulness-Based Cognitive Therapy",
    subtitle: "MBCT – Mindfulness-Based Cognitive Therapy",
    icon: "🧘",
    color: "#10B981",
    description:
      "يجمع بين اليقظة الذهنية والعلاج المعرفي. فعّال بشكل خاص في منع الانتكاس لدى من مروا بثلاث نوبات اكتئاب أو أكثر.",
    descriptionEn:
      "Combines mindfulness with cognitive therapy. Particularly effective at preventing relapse for those who have had three or more depressive episodes.",
    steps: [
      "مشاهدة الأفكار والمشاعر بدون الانجرار إليها",
      "تمارين التنفس الواعي 10 دقائق صباحاً",
      "مسح الجسد Body Scan قبل النوم",
      "الحضور الكامل في الأنشطة اليومية",
      "برامج رسمية مدتها 8 أسابيع (MBSR / MBCT)",
    ],
    stepsEn: [
      "Observe thoughts and feelings without getting swept away by them",
      "10-minute mindful breathing exercises each morning",
      "Body Scan practice before sleep",
      "Full presence in daily activities",
      "Formal 8-week programmes (MBSR / MBCT)",
    ],
    evidence:
      "Teasdale وآخرون 2000: MBCT خفّضت نسبة الانتكاس بنسبة 44% في المرضى بثلاث نوبات سابقة",
    evidenceEn:
      "Teasdale et al. 2000: MBCT reduced relapse rates by 44% in patients with three prior depressive episodes",
  },
  {
    id: 4,
    title: "علاج تنظيم الإيقاع اليومي",
    titleEn: "Interpersonal & Social Rhythm Therapy",
    subtitle: "IPSRT – Interpersonal & Social Rhythm Therapy",
    icon: "🕐",
    color: "#F59E0B",
    description:
      "يستهدف تنظيم الساعة البيولوجية وتحسين العلاقات الشخصية. يُعتبر من أفضل العلاجات المساندة لاضطراب ثنائي القطب والاكتئاب المتكرر.",
    descriptionEn:
      "Targets regulating the biological clock and improving interpersonal relationships. Considered one of the best supportive treatments for bipolar disorder and recurrent depression.",
    steps: [
      "تسجيل الأنشطة اليومية وأوقاتها بدقة",
      "توحيد وقت النوم والاستيقاظ والوجبات",
      "تحديد المحفزات التي تُخل بالإيقاع",
      "تطوير مهارات التواصل والحل الإيجابي للصراعات",
      "مراجعة أسبوعية للإيقاع مع المعالج",
    ],
    stepsEn: [
      "Record daily activities and their exact times",
      "Standardise sleep, wake, and meal times",
      "Identify triggers that disrupt the rhythm",
      "Develop communication and positive conflict resolution skills",
      "Weekly rhythm review with the therapist",
    ],
    evidence:
      "Frank وآخرون 2005: IPSRT زاد فترات الاستقرار المزاجي بشكل معنوي مقارنة بالعلاج المعياري",
    evidenceEn:
      "Frank et al. 2005: IPSRT significantly extended periods of mood stability compared to standard treatment",
  },
  {
    id: 5,
    title: "الكيتامين والعلاجات الناشئة",
    titleEn: "Ketamine & Emerging Treatments",
    subtitle: "Ketamine / Esketamine (Spravato)",
    icon: "💊",
    color: "#EC4899",
    description:
      "أحد أسرع العلاجات تأثيراً للاكتئاب الشديد والمقاوم. تُظهر النتائج تحسناً ملحوظاً خلال ساعات في بعض الحالات.",
    descriptionEn:
      "One of the fastest-acting treatments for severe, treatment-resistant depression. Results show marked improvement within hours in some cases.",
    steps: [
      "يُعطى في عيادة متخصصة تحت إشراف طبي",
      "بروتوكول مكثف: جلستان أسبوعياً لمدة 4 أسابيع",
      "ثم مرحلة الصيانة بجلسات أقل تكراراً",
      "يُستخدم مع العلاج النفسي لأفضل النتائج",
      "غير مناسب لجميع المرضى – يستلزم تقييماً دقيقاً",
    ],
    stepsEn: [
      "Administered in a specialist clinic under medical supervision",
      "Intensive protocol: two sessions per week for 4 weeks",
      "Then a maintenance phase with less frequent sessions",
      "Used alongside psychotherapy for best results",
      "Not suitable for all patients — requires careful evaluation",
    ],
    evidence:
      "Murrough وآخرون 2013: استجابة 64% من المرضى خلال 24 ساعة مقابل 28% في المجموعة الضابطة",
    evidenceEn:
      "Murrough et al. 2013: 64% response rate within 24 hours vs 28% in the control group",
  },
];

export const scientificStrategies: Strategy[] = [
  {
    id: 1,
    title: "التمرين الرياضي كعلاج",
    titleEn: "Exercise as Treatment",
    category: "نمط الحياة",
    categoryEn: "Lifestyle",
    summary: "30 دقيقة من التمرين المعتدل 3-5 مرات أسبوعياً فعّالة كمضادات الاكتئاب",
    summaryEn: "30 minutes of moderate exercise 3–5 times a week is as effective as antidepressants",
    detail: `
تُظهر الأبحاث أن التمرين الرياضي المنتظم يُفرز:
• الإندورفين: المُسكّن الطبيعي للألم والمُعزز للمزاج
• BDNF (عامل تغذية الخلايا العصبية): يُحفّز نمو خلايا دماغية جديدة في الحُصَين
• السيروتونين والدوبامين: ناقلات عصبية مرتبطة مباشرة بالاكتئاب

أنواع التمرين الأكثر فعالية:
• الأيروبيك (المشي السريع، السباحة، الدراجة)
• تمارين القوة بكثافة معتدلة
• اليوغا (تُضيف فائدة تنظيم الجهاز العصبي)

المدة المثلى: ابدأ بـ 10 دقائق وزد تدريجياً حتى 150 دقيقة أسبوعياً.
    `,
    detailEn: `
Research shows that regular physical exercise releases:
• Endorphins: natural pain relievers and mood boosters
• BDNF (Brain-Derived Neurotrophic Factor): stimulates growth of new brain cells in the hippocampus
• Serotonin and dopamine: neurotransmitters directly linked to depression

Most effective types of exercise:
• Aerobic (brisk walking, swimming, cycling)
• Moderate-intensity strength training
• Yoga (adds the benefit of nervous system regulation)

Optimal duration: start with 10 minutes and gradually increase to 150 minutes per week.
    `,
    references: [
      "Blumenthal JA et al. (1999). Arch Intern Med – المشي مقابل Sertraline في الاكتئاب",
      "Schuch FB et al. (2016). J Psychiatr Res – مراجعة منهجية لـ 25 تجربة عشوائية",
      "Craft LL & Perna FM (2004). The Primary Care Companion to J Clin Psychiatry",
    ],
  },
  {
    id: 2,
    title: "التغذية والصحة النفسية",
    titleEn: "Nutrition & Mental Health",
    category: "التغذية",
    categoryEn: "Nutrition",
    summary: "نظام البحر الأبيض المتوسط يرتبط بانخفاض 33% في خطر الاكتئاب",
    summaryEn: "The Mediterranean diet is linked to a 33% reduction in depression risk",
    detail: `
محور الأمعاء-الدماغ (Gut-Brain Axis):
الأمعاء تُنتج 90% من السيروتونين في الجسم. الميكروبيوم المعوي الصحي يؤثر مباشرة على المزاج.

أهم العناصر الغذائية للصحة النفسية:
• أوميغا-3: موجود في السمك الزيتي، بذور الكتان – يُقلل الالتهاب العصبي
• المغنيسيوم: الشوكولاتة الداكنة، اللوز، السبانخ – يُنظم مستقبلات NMDA
• فيتامين D: التعرض للشمس والأسماك الدهنية – نقصه مرتبط بالاكتئاب
• الزنك: اللحوم، البقوليات، البذور – يدعم وظيفة الناقلات العصبية
• البروبيوتيك: الزبادي، الكيفر، المخللات الطبيعية – يُعزز الميكروبيوم

أطعمة تُفاقم الاكتئاب:
السكر المُكرر، الأطعمة المُصنّعة، الكحول
    `,
    detailEn: `
The Gut–Brain Axis:
The gut produces 90% of the body's serotonin. A healthy gut microbiome directly affects mood.

Key nutrients for mental health:
• Omega-3: found in oily fish and flaxseed — reduces neuroinflammation
• Magnesium: dark chocolate, almonds, spinach — regulates NMDA receptors
• Vitamin D: sun exposure and fatty fish — deficiency linked to depression
• Zinc: meat, legumes, seeds — supports neurotransmitter function
• Probiotics: yoghurt, kefir, fermented foods — enhances the microbiome

Foods that worsen depression:
Refined sugar, processed foods, alcohol
    `,
    references: [
      "Jacka FN et al. (2017). BMC Medicine – تجربة SMILES للتغذية والاكتئاب",
      "Sarris J et al. (2015). Lancet Psychiatry – الطب النفسي التغذوي",
      "Cryan JF & Dinan TG (2012). Nature Reviews Neuroscience – محور الأمعاء-الدماغ",
    ],
  },
  {
    id: 3,
    title: "إعادة تشكيل الدوائر العصبية",
    titleEn: "Rewiring Neural Circuits",
    category: "علم الأعصاب",
    categoryEn: "Neuroscience",
    summary: "مرونة الدماغ تعني أن الشفاء ممكن في أي عمر من خلال ممارسات محددة",
    summaryEn: "Brain plasticity means recovery is possible at any age through specific practices",
    detail: `
مفهوم المرونة العصبية (Neuroplasticity):
الدماغ قادر على إنشاء مسارات عصبية جديدة طوال الحياة. الاكتئاب يُضعف الحُصَين (مركز الذاكرة والعاطفة) لكن العلاج يستطيع عكس هذا التأثير.

ممارسات تُعيد بناء الدوائر العصبية:
• التعلم المستمر: تعلم مهارة جديدة يبني مسارات عصبية جديدة
• التأمل اليومي: يُكثّف المادة الرمادية في قشرة الفص الجبهي
• النوم العميق: خلاله يُنظّف الدماغ السموم ويُرسّخ الذكريات الإيجابية
• الموسيقى: تُنشّط مناطق متعددة في آنٍ واحد
• الكتابة التعبيرية: تُساعد على معالجة المشاعر وتنظيمها
    `,
    detailEn: `
The Concept of Neuroplasticity:
The brain is capable of creating new neural pathways throughout life. Depression weakens the hippocampus (the centre of memory and emotion), but treatment can reverse this effect.

Practices that rebuild neural circuits:
• Continuous learning: learning a new skill builds new neural pathways
• Daily meditation: thickens grey matter in the prefrontal cortex
• Deep sleep: the brain clears toxins and consolidates positive memories
• Music: activates multiple brain regions simultaneously
• Expressive writing: helps process and regulate emotions
    `,
    references: [
      "Hölzel BK et al. (2011). Psychiatry Research – التأمل وزيادة المادة الرمادية",
      "Duman RS & Monteggia LM (2006). Biological Psychiatry – نموذج BDNF للاكتئاب",
      "Walker MP (2017). Why We Sleep – دور النوم في الصحة النفسية",
    ],
  },
  {
    id: 4,
    title: "الدعم الاجتماعي كعامل وقائي",
    titleEn: "Social Support as a Protective Factor",
    category: "العلاقات الاجتماعية",
    categoryEn: "Social Relationships",
    summary: "العزلة الاجتماعية ترفع خطر الاكتئاب بمقدار ضعفين؛ الدعم يُسرّع التعافي",
    summaryEn: "Social isolation doubles the risk of depression; social support accelerates recovery",
    detail: `
ما تقوله الأبحاث:
الإنسان كائن اجتماعي بيولوجياً. العزلة تُطلق نفس استجابة الألم الجسدي في الدماغ.

مستويات الدعم الاجتماعي الفعّال:
• الدعم العاطفي: الاستماع دون حكم، التواجد الجسدي
• الدعم المعلوماتي: توجيه نحو المصادر الصحيحة
• الدعم العملي: مساعدة بالمهام اليومية خلال فترات الأزمة
• الدعم الجماعي: مجموعات الدعم النفسي (فعّاليتها موثقة علمياً)

كيف تبني شبكة دعم؟
• تواصل مع شخص واحد على الأقل يومياً
• انضم لمجموعة دعم (مباشرة أو عبر الإنترنت)
• أخبر أشخاصاً تثق بهم بما تمر به
• لا تنتظر أن يأتي الناس إليك – ابادر أنت
    `,
    detailEn: `
What the research says:
Humans are biologically social beings. Isolation triggers the same brain response as physical pain.

Levels of effective social support:
• Emotional support: listening without judgement, physical presence
• Informational support: directing toward the right resources
• Practical support: help with daily tasks during crisis periods
• Group support: psychological support groups (scientifically documented effectiveness)

How to build a support network:
• Connect with at least one person every day
• Join a support group (in person or online)
• Tell people you trust what you're going through
• Don't wait for people to come to you — take the initiative
    `,
    references: [
      "Holt-Lunstad J et al. (2010). PLOS Medicine – العزلة كعامل خطر مميت",
      "Joiner TE (2007). Why People Die by Suicide – نظرية الانتماء والإحساس بالعبء",
      "Brené Brown (2010). The Power of Vulnerability – الضعف والارتباط البشري",
    ],
  },
  {
    id: 5,
    title: "تقنية كتابة المذكرات العلاجية",
    titleEn: "Therapeutic Journalling",
    category: "العلاج الذاتي",
    categoryEn: "Self-Therapy",
    summary: "الكتابة التعبيرية 15 دقيقة يومياً تُقلل أعراض الاكتئاب خلال 4 أسابيع",
    summaryEn: "15 minutes of expressive writing daily reduces depression symptoms within 4 weeks",
    detail: `
لماذا تنجح الكتابة العلاجية؟
الكتابة تُجبر الدماغ على تحويل المشاعر الفوضوية إلى لغة منظمة، مما يُنشّط قشرة الفص الجبهي ويُخفف استجابة اللوزة الدماغية (مركز الخوف).

أنواع الكتابة العلاجية:
• الكتابة التعبيرية الحرة: اكتب ما يجول في ذهنك دون قواعد
• مذكرة الامتنان: 3 أشياء إيجابية يومياً
• مذكرة الأفكار-المشاعر: رصد الترابط بينهما
• رسائل لنفسك: اكتب لنفسك في الماضي أو المستقبل
• مذكرة الإنجازات: حتى الصغير منها يُحدث فرقاً

تعليمات البدء:
خصص 15-20 دقيقة في بيئة هادئة، لا تراجع ما كتبت خلال الجلسة، اكتب بالتيار الحر.
    `,
    detailEn: `
Why therapeutic writing works:
Writing forces the brain to convert chaotic emotions into organised language, activating the prefrontal cortex and calming the amygdala (the fear centre).

Types of therapeutic writing:
• Free expressive writing: write whatever comes to mind without rules
• Gratitude journal: 3 positive things daily
• Thought–feeling journal: tracking the links between them
• Letters to yourself: write to your past or future self
• Achievements journal: even small ones make a difference

Getting started:
Set aside 15–20 minutes in a quiet environment; do not review what you've written during the session; write in free flow.
    `,
    references: [
      "Pennebaker JW & Beall SK (1986). JPSP – الكتابة عن الصدمة والصحة",
      "Smyth JM (1998). Journal of Consulting & Clinical Psychology",
      "Baikie KA & Wilhelm K (2005). Advances in Psychiatric Treatment",
    ],
  },
];
