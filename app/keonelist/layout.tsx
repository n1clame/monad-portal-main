// Local layout for /keonelist. Imports route styles and shows the same header/nav as the main site.
import './styles.css'

export const metadata = {
  title: 'KeoneList — Nads search',
  description: 'Find yourself in the 1000 Nads list',
}

const NAV = [
  { id: 'home',    label: 'Home',        href: '/' },
  { id: 'why',     label: 'Why Monad',   href: '/#why' },
  { id: 'start',   label: 'Get Started', href: '/#start' },
  { id: 'discord', label: 'Discord',     href: '/discord' },
  { id: 'faq',     label: 'FAQ',         href: '/#faq' },
  { id: 'links',   label: 'Links',       href: '/#links' },
  { id: 'keone',   label: 'Keone List',  href: '/keonelist' },
]

export default function KeoneListLayout({ children }:{ children: React.ReactNode }){
  return (
    <>
      {/* Header copied to match the main site's look */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-violet-950/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/monad-logo.png" alt="Monad Portals" className="w-8 h-8 rounded-xl"/>
            <span className="font-semibold tracking-wide pixel">monad portals</span>
          </a>
          <nav className="hidden md:flex items-center gap-3 flex-1 justify-center pixel-nav">
            {NAV.map(n => (
              <a key={n.id} href={n.href}
                 className={`text-xs px-1 py-0.5 text-white/80 hover:text-white transition ${n.id==='keone' ? 'rainbow-text' : ''}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="md:hidden text-xs text-white/70">menu</div>
        </div>
      </header>

      {children}
    </>
  )
}