"use client"
import './styles.css';
import { redirectToPath } from '../../utils/endpoints';
import Card from 'react-bootstrap/Card';


type InitialCardProps = {
    title?: string | undefined,
    bodyText?: string | undefined,
    strong?: string | undefined,
    path?: string | undefined
}
export default function InitialCard(props: InitialCardProps) {
    return (
        <Card onClick={() => redirectToPath(props.path)} className="initial-card">
            <Card.Title className="initial-card-title" >{props.title}</Card.Title>
            <Card.Body className="initial-card-body">
                <Card.Text style={{ fontSize: '1rem'}}>
                    {props.bodyText}
                    <strong>{props.strong}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}