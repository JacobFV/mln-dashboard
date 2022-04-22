import useCountdown from "../common/hooks/countdown"

export default function navigateBackAfterCountdown(props: {start: number}) {
  const canGoBack = window.history
  let delay = useCountdown(start, () => {

  })
  return (
    <>
    </>
  )
}