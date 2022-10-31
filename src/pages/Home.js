import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="container">
                <div className="row mt-2 gap-2">
                    <div className="col-6-md col-12-xs note d-flex align-center" >
                        This a new css library created inspiring from popular bootstrap library using sass.
                    </div>
                    <div className="col-6-md col-12-xs">
                        <img src="picture.png" alt="library pictrue" className="image" />
                    </div>
                </div>
                <div className="row">
                    <Link to="/docs/intro" style={{width:'100%'}}><button type="button" style={{fontStyle: 'italic'}} className="btn  btn-orange">Get Started!</button></Link>
                </div>
            </div>
        </>
    )
}