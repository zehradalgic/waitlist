# 🚀 Tech Launch 2026 - Waitlist Application

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, gerçek zamanlı veri yönetimi yapan bir **"Bekleme Listesi" (Waitlist)** uygulamasıdır. Proje, bir MIS öğrencisi vizyonuyla, hem kullanıcı deneyimi (UX) hem de veri bütünlüğü (Data Integrity) ön planda tutularak inşa edilmiştir.

## 🛠️ Kullanılan Teknolojiler

| Alan | Teknoloji |
| :--- | :--- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| **Backend/DB** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Icons/Anim** | [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) |

## ✨ Temel Özellikler

* **Gerçek Zamanlı Sayaç:** Sayfa açıldığında Supabase üzerinden toplam katılımcı sayısını canlı olarak çeker.
* **Veri Tekilliği (Unique Email):** PostgreSQL tarafındaki kısıtlamalar sayesinde, aynı e-posta adresiyle mükerrer kayıt oluşturulmasını engeller.
* **Dinamik UI:** Form gönderimi sonrası sayfa yenilenmeden başarı mesajı gösterir ve yeni kayıt için formu sıfırlama opsiyonu sunar.
* **Hata Yönetimi:** Mevcut kayıtlar için kullanıcıya özel uyarı mesajları döndürür.
* **Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu arayüz.

## 🚀 Kurulum

Projeyi yerel bilgisayarınızda çalıştırmak için:

1. Depoyu klonlayın:
   ```bash
   git clone [https://github.com/zehradalgic/waitlist.git](https://github.com/zehradalgic/waitlist.git)
