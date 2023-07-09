import InitialCard from "../../components/client/InitialCard";
import { endpoints } from '../../components/utils/endpoints';
import SteelDoorNav from "../../components/server/SteelDoorNav";


export default function Home() {
  const { adminPage, seekerPage } = endpoints;
  return (
    <main>
      <SteelDoorNav/>
      <div className="homepage">
        <InitialCard
          title="Admin"
          bodyText="Hello Admin! Here you can create, edit and delete Jobs. "
          strong="Click Here!"
          path={adminPage}
        />
        <div className="w-1/12" />
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
