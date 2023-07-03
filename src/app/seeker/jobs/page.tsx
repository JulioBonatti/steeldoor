import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import UserIndicator from '../../../../components/server/UserIndicator';


export default function Home() {
  return (
    <main style={{ background: '#111111' }}>
      <BelowNavDivider />
      <UserIndicator admin={true}/>
    </main>
  )
}
