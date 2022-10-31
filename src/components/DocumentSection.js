import { useEffect, useRef } from 'react';


export default function DocumentSection({title, code, bookmark, description, examples}) {
    const myCode = useRef();
    const myExamples = useRef();
    useEffect(() => {
        myCode.current.innerHTML = code
    }, [code])
    useEffect(() => {
        myExamples.current.innerHTML = examples
    }, [examples])
    return (
        <div className="section">
            <h2 id={bookmark} >{title}</h2>
            <p>{description}</p>
            <div className="card">
                examples
                <hr />
                <div className="card-body">
                    <div className="examples" ref={myExamples}>

                    </div>
                    <div className="code">
                        <code ref={myCode} >
                            {
                            code
                            }
                        </code>
                    </div>
                </div>
                
                  
            </div>
        </div>
    )
}