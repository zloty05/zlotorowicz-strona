function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-card">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-ink-faint sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} Kacper Złotorowicz · Business Process Automation
        </p>
        {/* TODO: podlinkować realną Politykę prywatności */}
        <a href="#" className="transition hover:text-gold">
          Polityka prywatności
        </a>
      </div>
    </footer>
  )
}

export default Footer
