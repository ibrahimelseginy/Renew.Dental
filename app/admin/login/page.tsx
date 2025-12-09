import { loginAction } from "@/app/actions"
import { Lock } from "lucide-react"

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Lock className="h-8 w-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">تسجيل الدخول</h1>
        <p className="text-center text-slate-400 mb-8">لوحة تحكم المسؤولين</p>

        {searchParams.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            كلمة المرور غير صحيحة. حاول مرة أخرى.
          </div>
        )}

        <form action={loginAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-white focus:border-primary focus:outline-none transition-all placeholder-neutral-500" 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full py-3">
            دخول
          </button>
        </form>
      </div>
    </div>
  )
}
