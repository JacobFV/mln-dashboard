import Image from 'next/image'
import { appname, appLogoSVG } from '../common/constants'

export default (props) => {
  return <Image src={appLogoSVG} alt={appname} {...props} />
}