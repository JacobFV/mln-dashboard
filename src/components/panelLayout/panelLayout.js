import Header from '../components/header'
import Footer from '../components/footer'

export default function PanelLayout ({children}) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}