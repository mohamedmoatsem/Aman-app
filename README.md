# أمان | Amān

![Tests Passing](https://img.shields.io/badge/Tests-Passing-brightgreen)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

**أمان** تطبيق دعم نفسي رقمي ثنائي اللغة، صُمم لمساندة المستخدمين بالعربية السودانية والإنجليزية. يجمع أدوات العناية اليومية بالذات، والمحتوى التوعوي، والتواصل المجتمعي، ومساعداً حوارياً ذكياً في مكان واحد، مع التأكيد أن التطبيق لا يحل محل الرعاية النفسية أو الطبية المتخصصة.

## Screenshots

| Mood tracker | AI chat |
| --- | --- |
| ![Aman home screen with mood check-in options](assets/images/aman-home.jpg) | ![Aman AI assistant conversation screen](assets/images/aman-assistant.jpg) |

## الميزات الرئيسية

- مساعد محادثة ذكي يدعم العربية السودانية والإنجليزية.
- تسجيل الحالة المزاجية ومتابعة المؤشرات والإحصاءات.
- موارد ومقالات توعوية وتمارين للتعامل مع الضغوط.
- مجتمع وورش عمل وأنشطة داعمة.
- مراسلة المختصين.
- واجهة ثنائية اللغة تدعم اتجاه الكتابة من اليمين إلى اليسار، ومهيأة أساساً للهواتف.
- لوحة معلومات منفصلة مبنية باستخدام Streamlit.

## التقنيات المستخدمة

| المجال | التقنيات |
| --- | --- |
| واجهة المستخدم | React 18، TypeScript، Vite، Tailwind CSS |
| الخادم وواجهات API | Node.js، Express 5، TypeScript |
| قاعدة البيانات | PostgreSQL، Drizzle ORM |
| الذكاء الاصطناعي | Google GenAI، Gemma |
| الاختبارات | Vitest |
| لوحة المعلومات | Python، Streamlit |
| إدارة الحزم | pnpm workspaces |

## البنية العامة

- `artifacts/aman-app` — تطبيق الويب.
- `artifacts/api-server` — خادم واجهات API.
- `artifacts/aman-dashboard` — لوحة المعلومات المبنية بـ Streamlit.
- `lib/db` — مخططات واتصال قاعدة البيانات.
- `lib/api-spec` و`lib/api-client-react` و`lib/api-zod` — عقد API والأنواع والعملاء المولّدة.

## My Engineering Contribution (System Architect)

I designed Amān as a modular full-stack system: a React/Vite client, an Express API service, PostgreSQL persistence through Drizzle, and a separate Streamlit dashboard. Shared OpenAPI-generated clients and schemas connect the application layers, while clear service boundaries leave room to extend the support and community features.

As System Architect, I also shaped the AI integration: the API calls Google GenAI with Gemma (`gemma-4-26b-a4b-it`), keeps credentials on the server, and configures the assistant for supportive conversations in Sudanese Arabic and English.

## متطلبات التشغيل

- Node.js 24 أو إصدار متوافق مع إعدادات المشروع.
- pnpm 10.26.1.

## متغيرات البيئة والنشر

لا تضع قيم الأسرار في README أو في ملفات الكود. أضف القيم المطلوبة إلى Secrets في Replit أو إلى مدير أسرار آمن لبيئة النشر.

| المتغير | الاستخدام | ملاحظات |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL لخادم API | مطلوب لتشغيل ميزات قاعدة البيانات. |
| `Gemini_API_KEY` | مساعد Gemma ولوحة Streamlit | استخدم هذا الاسم كما هو حتى يعمل الخادم ولوحة المعلومات. يقبل خادم API أيضاً `GEMINI_API_KEY` كاسم بديل. |
| `JWT_SECRET` | توقيع رموز المصادقة | عيّن قيمة قوية وفريدة في أسرار بيئة الإنتاج قبل النشر؛ لا تستخدم قيمة التطوير الافتراضية. |
| `VITE_SOCKET_URL` | عنوان Socket.IO للواجهة | اختياري؛ عند غيابه تستخدم الواجهة عنوان الصفحة الحالية. هذا متغير واجهة عام، وليس مكاناً لتخزين سر. |
| `HUGGINGFACE_TOKEN` | خادم الدردشة القديم `server/chat.js` | مطلوب فقط إذا شُغّل الخادم القديم؛ خدمة API المنشورة حالياً تستخدم Google GenAI بدلاً منه. |

تُمرّر قيم `PORT` و`BASE_PATH` إلى الخدمات عبر إعدادات Replit. كما أن `NODE_ENV` و`REPL_ID` و`BASE_URL` قيم داخلية للبناء أو أدوات التطوير؛ لا حاجة لإضافتها كأسرار أو تثبيتها يدوياً.

### إعدادات البناء الإنتاجية

- واجهة الويب مبنية كملفات ثابتة بواسطة Vite وتُخرج إلى `artifacts/aman-app/dist/public`، وهو المسار المحدد لخدمة الإنتاج.
- يُبنى خادم API بالأمر `pnpm --filter @workspace/api-server run build` ويُشغّل من `artifacts/api-server/dist/index.cjs` تحت المسار `/api`.
- تم التحقق من نجاح أمري البناء الإنتاجيين في إعدادات الأثرين الحاليين.
- لوحة Streamlit لديها سير عمل تطويري، لكنها لا تملك إعداد خدمة إنتاج في الوقت الحالي، لذلك لا يشملها إعداد النشر الحالي للواجهة وواجهة API.

## التثبيت والتشغيل

من مجلد المشروع:

```bash
pnpm install
```

في Replit، شغّل التطبيق باستخدام زر **Run** لبدء الخدمات المُعدة للمشروع. ولتشغيل الخدمات منفردة في بيئة تطوير:

```bash
# خادم API
pnpm --filter @workspace/api-server run dev

# تطبيق الويب
pnpm --filter @workspace/aman-app run dev
```

تحتاج لوحة المعلومات إلى Python والحزم المحددة في `artifacts/aman-dashboard/requirements.txt`، وتُشغّل من مجلدها:

```bash
cd artifacts/aman-dashboard
streamlit run app.py
```

## الاختبارات والتحقق

تشغيل اختبارات المشروع:

```bash
pnpm test
```

فحص أنواع TypeScript:

```bash
pnpm run typecheck
```

تغطي اختبارات Vitest وظائف مثل التحقق من بيانات المزاج، وتوقيع رموز الدخول، ورصد تتابع الأيام ذات المزاج المنخفض، وتنظيف ردود المساعد الذكي.

## ملاحظة مهمة

أمان أداة دعم وتثقيف، وليس خدمة طوارئ أو بديلاً عن التشخيص والعلاج لدى مختص. عند وجود خطر مباشر، تواصل مع خدمات الطوارئ أو جهة دعم محلية موثوقة.
