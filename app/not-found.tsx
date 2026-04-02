import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(180deg, #eef6f7 0%, #f8fbfc 46%, #eef7f2 100%)' }}
    >
      <div
        className="max-w-lg rounded-[2rem] border px-8 py-10 text-center"
        style={{
          background: 'rgba(255,255,255,0.94)',
          borderColor: 'rgba(15,23,42,0.08)',
          boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: '#64748b' }}>
          Not Found
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight" style={{ color: '#0f172a' }}>
          This page is not available.
        </h1>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#475569' }}>
          The link may be outdated, or the content may have moved. You can head back to the home page and keep browsing from there.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-full px-5 py-2.5 text-sm font-bold"
            style={{ background: 'rgba(0,229,186,0.9)', color: '#042f2e' }}
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
