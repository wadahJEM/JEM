لوحة إدارة أخبار JEM المتصلة بـ Supabase

1) ارفع admin.html إلى جذر مستودع wadahJEM/JEM في GitHub (Add file > Upload files > Commit changes).
2) ستصبح صفحة الإدارة عبر GitHub Pages على مسار /admin.html إذا كان GitHub Pages مفعّلًا.
3) هذه الصفحة تستخدم Supabase URL والمفتاح العام فقط، ولا تستخدم المفتاح السري.
4) جدول news وسياسات RLS موجودة في المشروع بالفعل. سياسة الإدارة تتطلب أن يحمل المستخدم في Supabase Auth قيمة app_metadata.role = admin.
5) لا تضع role في user_metadata لأنه قابل للتعديل من المستخدم. عيّن app_metadata من جهة موثوقة/لوحة الإدارة في Supabase فقط.
6) الصفحة منفصلة ولا تعدّل تصميم index.html. لذلك الأخبار لن تظهر تلقائيًا في الصفحة الرئيسية حتى نضيف كود القراءة إلى index.html في خطوة منفصلة.
