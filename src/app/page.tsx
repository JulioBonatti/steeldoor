import InitialCard from "../../components/client/InitialCard";
import { endpoints } from '../../components/utils/endpoints';


export default function Home() {
  const { adminPage, seekerPage } = endpoints;
  return (
    <main style={{ background: '#111111'}} className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4.2rem'  }}>
        <InitialCard
          title="Admin"
          bodyText="Hello Admin! Here you can create, edit and delete Jobs. "
          strong="Click Here!"
          path={adminPage}
        />
        <InitialCard
          title="Job-Seeker"
          bodyText="Hello Seeker! Here you can manage your job applications. "
          strong="Click Here!"
          path={seekerPage}
        />
      </div>
    </main>
  )
}
