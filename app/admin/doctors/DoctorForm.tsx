"use client"

import { saveDoctorAction } from "@/app/actions"
import { specialties, Doctor } from "@/lib/data"
import Link from "next/link"

export default function DoctorForm({ doctor }: { doctor?: Doctor }) {
  return (
    <form action={saveDoctorAction} className="card p-8 space-y-8 bg-neutral-900 border border-neutral-800">
      {doctor && <input type="hidden" name="id" value={doctor.id} />}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h3 className="text-lg font-bold text-primary border-b border-neutral-800 pb-2">البيانات الأساسية</h3>
           
           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">اسم الطبيب</label>
              <input 
                name="name" 
                defaultValue={doctor?.name} 
                required 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white" 
                placeholder="د. الاسم..." 
              />
           </div>
           
           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">التخصص</label>
              <select 
                name="specialty" 
                defaultValue={doctor?.specialty || ""} 
                required 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white appearance-none"
              >
                <option value="" disabled>اختر التخصص</option>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
           </div>

           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">نبذة عن الطبيب</label>
              <textarea 
                name="bio" 
                defaultValue={doctor?.bio} 
                required 
                rows={5} 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white resize-none" 
                placeholder="اكتب نبذة مختصرة عن الخبرات والشهادات..." 
              />
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-lg font-bold text-primary border-b border-neutral-800 pb-2">تفاصيل العيادة</h3>

           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">الموقع</label>
              <input 
                name="location" 
                defaultValue={doctor?.location} 
                required 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white" 
                placeholder="المدينة / المنطقة" 
              />
           </div>
           
           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">فئة السعر</label>
              <select 
                name="priceRange" 
                defaultValue={doctor?.priceRange || "متوسط"} 
                required 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white appearance-none"
              >
                <option value="منخفض">منخفض</option>
                <option value="متوسط">متوسط</option>
                <option value="مرتفع">مرتفع</option>
              </select>
           </div>

           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">رابط الصورة الشخصية</label>
              <input 
                name="imageUrl" 
                defaultValue={doctor?.imageUrl as string} 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white" 
                placeholder="https://..." 
              />
              <p className="text-xs text-slate-500 mt-1">يمكنك استخدام رابط صورة خارجي (Unsplash, etc)</p>
           </div>

           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">روابط صور العيادة (مفصولة بفاصلة)</label>
              <textarea 
                name="clinicImages" 
                defaultValue={doctor?.clinicImages?.join(", ")} 
                rows={3} 
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 focus:border-primary focus:outline-none transition-all text-white resize-none" 
                placeholder="url1, url2, ..." 
              />
           </div>
        </div>
      </div>

      <div className="pt-6 border-t border-neutral-800 flex justify-end gap-4">
        <Link href="/admin/doctors" className="btn btn-secondary px-6">إلغاء</Link>
        <button type="submit" className="btn btn-primary px-8">{doctor ? "حفظ التعديلات" : "إضافة الطبيب"}</button>
      </div>
    </form>
  )
}
