import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'

function Footer({ className }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      className={cn(
        'w-full border-t border-border bg-background/80 backdrop-blur-sm py-4 px-6 mt-auto',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <p className="font-bold text-center">&copy; 2026 ERP Lab</p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted hover:text-foreground transition-colors text-xs font-medium"
          title="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          Back to top
        </button>
      </div>
    </footer>
  )
}

export { Footer }