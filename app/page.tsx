'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Bağlantı dosyanın yolu (lib/supabase.ts)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Rocket, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";

export default function TechLaunchWaitlist() {
  // --- STATE (HAFIZA) YÖNETİMİ ---
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0); // Gerçek veritabanı sayısı
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");

  // --- 1. SAYFA AÇILDIĞINDA GERÇEK SAYIYI VERİTABANINDAN ÇEK ---
  useEffect(() => {
    async function fetchCount() {
      const { count: dbCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      
      if (!error && dbCount !== null) {
        setCount(dbCount);
      }
    }
    fetchCount();
  }, []);

  // --- 2. FORM GÖNDERME (VERİTABANINA KAYIT) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg("");

    // Supabase'e ekleme yapıyoruz
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      setStatus('error');
      // MIS Bilgisi: 23505 kodu PostgreSQL'de "Unique Violation" yani "Bu kayıt zaten var" demektir.
      if (error.code === '23505') {
        setErrorMsg("Bu e-posta adresi zaten bekleme listemizde kayıtlı.");
      } else {
        setErrorMsg("Bir hata oluştu. Lütfen bağlantınızı kontrol edin.");
      }
    } else {
      // Başarılıysa durumu güncelle ve sayacı 1 artır
      setStatus('success');
      setCount(prev => prev + 1);
    }
  };

  // --- 3. GERİ DÖN VE YENİDEN DENE (SENİN İSTEDİĞİN BUTON) ---
  const handleReset = () => {
    setStatus('idle');
    setEmail("");
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4 font-sans text-slate-900">
      <div className="w-full max-w-md space-y-10">
        
        {/* LOGO VE BAŞLIK BÖLÜMÜ */}
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Rocket className="w-10 h-10 text-slate-900" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Tech Launch 2026
            </h1>
            <p className="text-slate-500 text-lg">
              Yapay zeka tabanlı yeni nesil MIS platformu çok yakında.
            </p>
          </div>

          {/* CANLI SAYAÇ */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-200">
            <Users className="w-4 h-4" />
            <span>Şu an tam {count} kişi sırada bekliyor</span>
          </div>
        </div>

        {/* ANA İÇERİK: FORM VEYA BAŞARI MESAJI */}
        <div className="min-h-[200px]"> {/* Sayfa zıplamasın diye sabit min-yükseklik */}
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="Üniversite e-postanızı girin" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`h-14 px-5 text-lg bg-white border-2 transition-all ${
                    status === 'error' ? 'border-red-500 focus-visible:ring-red-100' : 'border-slate-100 focus-visible:ring-slate-200'
                  }`}
                  disabled={status === 'loading'}
                />
                
                {/* HATA MESAJI */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-medium animate-in slide-in-from-top-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold shadow-xl active:scale-[0.98] transition-all"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? "Kontrol Ediliyor..." : "Beni de Ekle!"}
              </Button>
            </form>
          ) : (
            /* BAŞARI MESAJI VE GERİ DÖN BUTONU */
            <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 text-center border border-slate-50 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Harika! Listedesiniz.</h2>
              <p className="text-slate-500 mt-3 text-lg leading-relaxed">
                Tebrikler! Listemizdeki <span className="font-bold text-slate-900">{count}.</span> kişi oldunuz.
              </p>
              
              <Button 
                onClick={handleReset}
                variant="outline"
                className="mt-8 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Başka bir mail ekle
              </Button>
            </div>
          )}
        </div>

        {/* ALT BİLGİ */}
        <p className="text-center text-xs text-slate-400 uppercase tracking-widest font-medium">
          Haliç University MIS Project • 2026
        </p>
      </div>
    </div>
  );
}