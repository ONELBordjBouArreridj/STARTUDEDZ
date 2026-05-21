# STARTUDE DZ 4.0 🚀

> **المسابقة الوطنية للطلبة الجامعيين لريادة الأعمال والابتكار**  
> **National Entrepreneurship & Innovation Competition for University Students**

---

## 📌 نبذة عن المشروع / Overview

**STARTUDE DZ 4.0** هي منصة رقمية مخصصة للمسابقة الوطنية للطلبة والباحثين الشباب في الجزائر. تهدف المنصة إلى مساعدة الطلبة في تسجيل مشاريعهم وأفكارهم المبتكرة وتحويلها إلى مؤسسات ناشئة (Startups) تدعم اقتصاد المعرفة الوطني.

تنظم هذه المسابقة من طرف **المنظمة الوطنية للطلبة الأحرار (ONEL)** بالتعاون مع **حاضنة الأعمال الرقمية بوزارة التعليم العالي والبحث العلمي** وشركاء اقتصاديين وأكاديميين.

---

## 🛠️ التقنيات المستخدمة / Tech Stack

* **Front-end**: React 19, Vite
* **Styling**: Custom CSS (Vanilla) with glassmorphic designs & HSL colors
* **Animations**: Framer Motion
* **Localization (i18n)**: i18next & react-i18next (Arabic & English support with RTL layout support)
* **Icons**: React Icons
* **3D Particle Background**: tsParticles

---

## 💻 التشغيل المحلي / Local Setup

لشغل المشروع محلياً على جهازك، تأكد من تثبيت [Node.js](https://nodejs.org/) (الإصدار 18 فما فوق)، ثم اتبع الخطوات التالية:

1. **تثبيت الحزم والمكتبات / Install Dependencies:**
   ```bash
   npm install
   ```

2. **تشغيل خادم التطوير المحلي / Start Dev Server:**
   ```bash
   npm run dev
   ```
   *سيتم تشغيل الموقع محلياً على الرابط: `http://localhost:5173`*

3. **بناء نسخة الإنتاج / Build for Production:**
   ```bash
   npm run build
   ```
   *سيتم توليد ملفات البناء الجاهزة للنشر داخل مجلد `dist`.*

---

## ⚙️ لوحة التحكم والإدارة / Admin Dashboard

يحتوي الموقع على لوحة تحكم مدمجة لتعديل الإحصائيات، بيانات الاتصال، وتعديل حالة التسجيل أو الصيانة بشكل فوري ومحفوظ في المتصفح.

* **رابط لوحة التحكم / Admin Route:** `/admin`
* **كلمة المرور الافتراضية / Default Password:** `ONEL2026`

---

## 🚀 النشر التلقائي / Automated Deployment (GitHub Pages)

تم تزويد هذا المشروع بنظام بناء ونشر تلقائي (CI/CD) عبر **GitHub Actions**.

### كيف يعمل؟
* بمجرد رفع الكود (Push) إلى فرع `main` أو `master` في مستودع GitHub الخاص بك.
* سيقوم الـ Action تلقائياً بتثبيت الاعتمادات وبناء المشروع باستخدام Vite.
* سيتم نشر الملفات الناتجة مباشرة على فرع `gh-pages` ليصبح موقعك متاحاً للعامة.
* تم إعداد `base: './'` في ملف `vite.config.js` لضمان عمل الروابط والملفات بشكل مثالي على أي مسار فرعي.
