import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

interface IProps {
  width: number
  height: number
  fill?: string
}

function Upload(props: IProps) {
  return (
    <Svg viewBox="0 0 419.2 419.2" {...props}>
      <Circle cx={158} cy={144.4} r={28.8} />
      <Path d="M394.4 250.4c-13.6-12.8-30.8-21.2-49.6-23.6V80.4c0-15.6-6.4-29.6-16.4-40C318 30 304 24 288.4 24h-232c-15.6 0-29.6 6.4-40 16.4C6 50.8 0 64.8 0 80.4v238.8c0 15.6 6.4 29.6 16.4 40 10.4 10.4 24.4 16.4 40 16.4h224.4c14.8 12 33.2 19.6 53.6 19.6 23.6 0 44.8-9.6 60-24.8 15.2-15.2 24.8-36.4 24.8-60s-9.6-44.8-24.8-60zM21.2 80.4c0-9.6 4-18.4 10.4-24.4 6.4-6.4 15.2-10.4 24.8-10.4h232c9.6 0 18.4 4 24.8 10.4 6.4 6.4 10.4 15.2 10.4 24.8v124.8l-59.2-59.2c-4-4-10.8-4.4-15.2 0L160 236l-60.4-60.8c-4-4-10.8-4.4-15.2 0l-63.2 64V80.4zM56 355.2v-.8c-9.6 0-18.4-4-24.8-10.4-6-6.4-10-15.2-10-24.8v-49.6L92 198.4l60.4 60.4c4 4 10.8 4 15.2 0l89.2-89.6 58.4 58.8-3.6 1.2c-1.6.4-3.2.8-5.2 1.6-1.6.4-3.2 1.2-4.8 1.6-1.2.4-2 .8-3.2 1.6-1.6.8-2.8 1.2-4 2l-6 3.6c-1.2.8-2 1.2-3.2 2-.8.4-1.2.8-2 1.2-3.6 2.4-6.8 5.2-9.6 8.4-15.2 15.2-24.8 36.4-24.8 60 0 6 .8 11.6 2 17.6.4 1.6.8 2.8 1.2 4.4 1.2 4 2.4 8 4 12v.4c1.6 3.2 3.2 6.8 5.2 9.6H56zm322.8 0c-11.6 11.6-27.2 18.4-44.8 18.4-16.8 0-32.4-6.8-43.6-17.6-1.6-1.6-3.2-3.6-4.8-5.2-1.2-1.2-2.4-2.8-3.6-4-1.6-2-2.8-4.4-4-6.8-.8-1.6-1.6-2.8-2.4-4.4-.8-2-1.6-4.4-2-6.8-.4-1.6-1.2-3.6-1.6-5.2-.8-4-1.2-8.4-1.2-12.8 0-17.6 7.2-33.2 18.4-44.8 11.2-11.6 27.2-18.4 44.8-18.4s33.2 7.2 44.8 18.4c11.6 11.6 18.4 27.2 18.4 44.8 0 17.2-7.2 32.8-18.4 44.4z" />
      <Path d="M341.6 267.6c-.8-.8-2-1.6-3.6-2.4-1.2-.4-2.4-.8-3.6-.8h-.8c-1.2 0-2.4.4-3.6.8-1.2.4-2.4 1.2-3.6 2.4l-24.8 24.8c-4 4-4 10.8 0 15.2 4 4 10.8 4 15.2 0l6.4-6.4v44c0 6 4.8 10.8 10.8 10.8s10.8-4.8 10.8-10.8v-44l6.4 6.4c4 4 10.8 4 15.2 0 4-4 4-10.8 0-15.2l-24.8-24.8z" />
    </Svg>
  )
}

export default Upload
