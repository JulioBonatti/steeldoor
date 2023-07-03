import './styles.css'


type BelowNavDividerProps = {
    admin?: boolean
}

export default function UserIndicator(props: BelowNavDividerProps) {
    const title: string = props.admin ? 'Welcome Admin!' : 'Welcome Seeker!'
    return (
        <div className="user-indicator-container">
            <label className="logged-user">{title}</label>
        </div>
    )
}
