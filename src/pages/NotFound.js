export default function NotFound() { 
    return (
        <div className="container" style={{height: '500px'}}>
            <div className="row w-100 h-100" style={{display: 'flex', flexDirection : "column", justifyContent:'center', alignItems: 'center'}}>
                <h1>404 Error</h1>
                <p>page not found</p>
            </div>
        </div>
    )
}