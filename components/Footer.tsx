import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Image 
              src="/logo.JPG" 
              alt="Renew Dental Center" 
              width={160} 
              height={50} 
              className="h-12 w-auto object-contain mb-4 mix-blend-screen"
            />
            <p className="text-sm text-white leading-relaxed">
              مركز متخصص في طب وجراحة الفم والأسنان، نستخدم أحدث التقنيات لنمنحك ابتسامة مشرقة وصحية.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">تواصل معنا</h3>
            <div className="space-y-2 text-sm text-white">
              <p>العنوان: فاقوس، شارع الدروس، أعلى ميركاتو</p>
              <p dir="ltr" className="text-end text-primary font-semibold">01068806864</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">مواعيد العمل</h3>
            <div className="space-y-2 text-sm text-white">
              <p>يومياً من 1 ظهراً حتى 10 مساءً</p>
              <p>الجمعة عطلة رسمية</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-sm text-white">
          © {new Date().getFullYear()} Renew Dental Center • جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}

