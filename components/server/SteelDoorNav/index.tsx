"use client"
import './styles.css';
import { redirectToPath } from '../../utils/endpoints';
import UserIndicator from '../UserIndicator';


type SteelDoorNavProps = {
  admin: boolean,
}

export default function SteelDoorNav(props: SteelDoorNavProps) {
  return (
    <nav className="steel-door-nav">
      <div onClick={() => redirectToPath("/")} className="steel-door" >
        <label className="grow" >Steel Door</label>
        <label className="tip-label">Home</label>
      </div>
      <UserIndicator admin={props.admin} />
    </nav>
  )
}
