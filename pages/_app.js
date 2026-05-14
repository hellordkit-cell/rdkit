import '../styles/globals.css'
import FloatingClaimAssist from '../components/FloatingClaimAssist'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FloatingClaimAssist />
    </>
  )
}
