import './styles.css'


type BelowNavDividerProps = {
    admin?: boolean
}

export default function BelowNavDivider(props: BelowNavDividerProps) {
    const title: string = props.admin ? 'Welcome Admin!' : 'Welcome Seeker!'
    return (
        <div className="below-nav-divider">
            <label className="nav-title">{title}</label>
        </div>
    )
}
