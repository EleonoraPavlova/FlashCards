import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgArrowIosBack = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <defs>
      <clipPath id="arrow-ios-back_svg__a">
        <path fill="currentColor" fillOpacity={0} d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
    <path fill="none" d="M0 0h24v24H0z" />
    <g clipPath="url(#arrow-ios-back_svg__a)">
      <path
        fill="currentColor"
        d="M13.83 19c-.15 0-.3-.04-.44-.1-.13-.07-.25-.16-.34-.28l-4.83-5.99c-.15-.18-.23-.41-.23-.64s.08-.46.23-.63l5-6c.16-.21.41-.34.67-.36.27-.03.53.06.74.23.2.16.33.41.35.67.03.27-.06.53-.22.74L10.29 12l4.32 5.36c.12.14.2.32.22.51s-.01.38-.09.55c-.08.18-.21.32-.37.42-.17.1-.35.16-.54.16"
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgArrowIosBack)
const Memo = memo(ForwardRef)
export default Memo
