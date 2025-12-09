import { saveServiceAction } from "@/app/actions"
import { Service } from "@/lib/db"
import { ArrowRight, Save } from "lucide-react"
import Link from "next/link"

export default function ServiceForm({ service }: { service?: Service }) {
  return (
    <form action={saveServiceAction} className="card p-8 space-y-8 bg-neutral-900 border border-neutral-800 rounded-xl">
      {service && <input type="hidden" name="id" value={service.id} />}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">اسم الخدمة</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={service?.title}
            required
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="مثال: زراعة الأسنان"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">الوصف</label>
          <textarea 
            name="description" 
            defaultValue={service?.description}
            required
            rows={3}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="وصف مختصر للخدمة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            اسم الأيقونة 
            <span className="text-xs text-slate-500 mr-2">(من مكتبة Lucide React: Star, Smile, ShieldCheck, Clock, etc.)</span>
          </label>
          <input 
            type="text" 
            name="icon" 
            defaultValue={service?.icon}
            required
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors font-mono"
            placeholder="Star"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
        <button 
          type="submit" 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>حفظ البيانات</span>
        </button>
        <Link 
          href="/admin/services" 
          className="text-slate-400 hover:text-white px-4 py-2 transition-colors flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          <span>إلغاء</span>
        </Link>
      </div>
    </form>
  )
}
