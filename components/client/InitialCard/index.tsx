"use client"
import './styles.css';
import { redirectToPath } from '../../utils/endpoints';


type InitialCardProps = {
    title?: string | undefined,
    bodyText?: string | undefined,
    strong?: string | undefined,
    path?: string | undefined
}
export default function InitialCard(props: InitialCardProps) {
    return (
        <div onClick={() => redirectToPath(props.path)} className="initial-card">
            <div className="initial-card-title" >{props.title}</div>
            <div className="initial-card-body">
                <div style={{ fontSize: '1rem'}}>
                    {props.bodyText}
                    <strong>{props.strong}</strong>
                </div>
            </div>
        </div>
    );
}