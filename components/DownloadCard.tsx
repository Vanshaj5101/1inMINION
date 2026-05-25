import { Download, FileText, BarChart2, FileCode } from 'lucide-react'

type IconName = 'pdf' | 'csv' | 'md'

interface DownloadCardProps {
  iconType: IconName
  title: string
  filename: string
  description: string
  downloadUrl: string
  bulletPoints?: string[]
}

const iconMap: Record<IconName, React.ReactNode> = {
  pdf: <FileText size={28} className="text-accent-yellow" />,
  csv: <BarChart2 size={28} className="text-accent-yellow" />,
  md:  <FileCode  size={28} className="text-accent-yellow" />,
}

export default function DownloadCard({
  iconType, title, filename, description, downloadUrl, bulletPoints
}: DownloadCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-bg-secondary border border-border-dark rounded-lg p-6 transition-all duration-200 hover:border-accent-yellow hover:shadow-yellow-sm">
      <div className="flex items-start gap-3">
        {iconMap[iconType]}
        <div>
          <p className="font-mono font-bold text-xs tracking-widest text-accent-yellow uppercase">{title}</p>
          <p className="font-mono text-xs text-text-muted mt-0.5">{filename}</p>
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">{description}</p>

      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="space-y-1">
          {bulletPoints.map((pt, i) => (
            <li key={i} className="text-xs text-text-muted font-mono flex items-start gap-2">
              <span className="text-accent-yellow mt-0.5">•</span>
              {pt}
            </li>
          ))}
        </ul>
      )}

      <a
        href={downloadUrl}
        download
        className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-md border border-accent-yellow text-accent-yellow font-mono font-bold text-xs tracking-widest hover:bg-yellow-glow transition-colors duration-150"
        style={{ letterSpacing: '0.08em' }}
      >
        <Download size={14} />
        DOWNLOAD
      </a>
    </div>
  )
}
