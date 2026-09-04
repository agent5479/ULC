import { LOGO_SRC, SITE_NAME } from '../config'

type BrandLogoProps = {
  className?: string
  width: number
  height: number
}

export function BrandLogo({ className, width, height }: BrandLogoProps) {
  return (
    <a
      href="#top"
      className={`brand-logo${className ? ` ${className}` : ''}`}
      aria-label={`${SITE_NAME} home`}
    >
      <img src={LOGO_SRC} alt="" width={width} height={height} />
    </a>
  )
}
