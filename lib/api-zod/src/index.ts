export * from "./generated/api";

// نقوم بتصدير ملف types مع تغيير اسم الجزء المتصادم يدوياً
export type { SubscribeBody as SubscribeBodyType } from "./generated/types";

// ثم نصدر باقي المحتويات يدوياً إذا كنت تعرفها، أو نكتفي بما سبق 
// إذا كان التطبيق يعتمد بشكل أساسي على ما في ملف api.
