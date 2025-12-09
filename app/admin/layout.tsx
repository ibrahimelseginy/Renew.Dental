import Link from "next/link"
import { Users, Calendar, LayoutDashboard, LogOut, Sparkles } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white font-sans" dir="rtl">
      <aside className="w-64 border-l border-neutral-800 p-6 hidden md:flex flex-col fixed right-0 h-full bg-neutral-900">
        <h2 className="text-2xl font-bold mb-10 text-primary px-2 font-serif">لوحة التحكم</h2>
        <nav className="space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors text-slate-300 hover:text-white hover:text-primary">
            <LayoutDashboard className="h-5 w-5" />
            <span>الرئيسية</span>
          </Link>
          <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors text-slate-300 hover:text-white hover:text-primary">
            <Users className="h-5 w-5" />
            <span>الأطباء</span>
          </Link>
          <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors text-slate-300 hover:text-white hover:text-primary">
            <Calendar className="h-5 w-5" />
            <span>الحجوزات</span>
          </Link>
          <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-800 transition-colors text-slate-300 hover:text-white hover:text-primary">
            <Sparkles className="h-5 w-5" />
            <span>الخدمات</span>
          </Link>
        </nav>
        <div className="pt-6 border-t border-neutral-800">
           <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>العودة للموقع</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 mr-0 md:mr-64 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}
