import BelowNavDivider from '../../../../components/server/BelowNavDivider';
import UserIndicator from '../../../../components/server/UserIndicator';
import ClientJobFilter from '../../../../components/client/ClientJobFilter';


export default function Home() {
  return (
    <main style={{ background: '#111111' }}>
      <ClientJobFilter />
      <BelowNavDivider />
      <UserIndicator admin={true}/>
    </main>
  )
}
