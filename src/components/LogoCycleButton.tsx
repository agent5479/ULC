import { useLogo } from '../logoContext'
import { SITE_NAME } from '../config'

type LogoCycleButtonProps = {
  className?: string
  width: number
  height: number
  /** Larger hero treatment */
  size?: 'header' | 'hero'
}

export function LogoCycleButton({
  className,
  width,
  height,
  size = 'header',
}: LogoCycleButtonProps) {
  const { logoId, logoSrc, cycleLogo } = useLogo()

  return (
    <button
      type="button"
      className={`logo-cycle${className ? ` ${className}` : ''}`}
      onClick={cycleLogo}
      aria-label={`Logo option ${logoId} of 6. Click to try the next logo.`}
      title={`Logo ${logoId} of 6 — click to cycle`}
    >
      <img src={logoSrc} alt={`${SITE_NAME} logo option ${logoId}`} width={width} height={height} />
      {size === 'hero' && (
        <span className="logo-cycle__hint" aria-hidden="true">
          Logo {logoId}/6 · click to change
        </span>
      )}
    </button>
  )
}
