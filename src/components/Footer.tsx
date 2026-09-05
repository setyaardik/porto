import { profile } from '../data'

function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} — dibikin dari nol, sambil banyak ngopi
        </p>
        <p className="mono text-xs text-lime">
          react · ts · partikel · dan sejuta refresh
        </p>
      </div>
    </footer>
  )
}

export default Footer