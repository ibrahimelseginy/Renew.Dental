import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 pt-3 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Info */}
          <div className="space-y-4">
            <Image 
              src="/logo.png" 
              alt="Renew Dental Center" 
              width={800} 
              height={70} 
              className="h-20 w-auto object-contain mb-2"
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
              <Link href="tel:01068806864" dir="ltr" className="block text-end text-primary font-semibold hover:text-white transition-colors">01068806864</Link>
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

        {/* Google Map */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
          <iframe
            src="https://maps.google.com/maps?q=Faqous%20Al%20Dros%20Street&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>

        <div className="mt-6 border-t border-neutral-800 pt-8 text-center text-sm text-white">
          © {new Date().getFullYear()} Renew Dental Center • جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}

