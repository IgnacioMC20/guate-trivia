import { Navbar } from '@/components'
import { MainLayout } from '@/layout'

export default function Home() {
  return (
    <MainLayout title='Dashboard' pageDescription='Dashboard'>
       <Navbar />
    </MainLayout>
  )
}
