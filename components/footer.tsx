import { Building2 } from "lucide-react"

const columns = [
  {
    title: "Product",
    links: ["Listings", "Map search", "Mortgage", "Agents", "Pricing"],
  },
  {
    title: "Markets",
    links: ["Dubai", "New York", "London", "Singapore", "Berlin"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partners", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                Melhek<span className="font-normal text-muted-foreground"> OS</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The operating system for global real estate. Search, finance, and
              close — all in one place.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Melhek Real Estate OS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for global property transactions.
          </p>
        </div>
      </div>
    </footer>
  )
}
