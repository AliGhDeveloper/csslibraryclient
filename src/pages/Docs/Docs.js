import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getPage } from '../../utils/queries';
import { useContext, useEffect, useState } from 'react';
import DocumentSection from '../../components/DocumentSection';
import { Context } from '../../store/globalstore';

export default function DocPage() {
    const { state: {auth, modal}, dispatch } = useContext(Context);
    const id = useParams().id;
    const [ page, setPage ] = useState({});
    const [ bookmarks, setBookmarks] = useState([]);
    const data = useQuery(getPage, {
        variables : {id}
    }).data 

    useEffect(() => {
        if(page.sections) setBookmarks(page.sections.map(section => section.bookmark))
    },[page])

    useEffect(() => {
        if(data) setPage(data.page)
        
    }, [data])

    if(!Object.keys(page).length < 0 ) return null

    return (
        <div className="container page">
            <h1>{page.name}:</h1>
            <p>{page.desc}</p>
            <ul className="list">
                {
                    bookmarks.length > 0 && bookmarks.map((i,index)=> (
                        <li key={index}><a href={`#${i}`}>{i}</a></li>
                    ))
                }
            </ul>
            {
                page.sections && page.sections.map( (section,index) => <DocumentSection key={index} code={section.code} title={section.title} bookmark={section.bookmark} description={section.desc} examples={section.examples} />)
            }
            {
                auth.user && auth.accesstoken && 
                <div className="row justify-space-between">
                    <Link to={`/docs/modify/${page.id}`}><button className="btn btn-primary">Edit Page</button></Link>
                    <Link ><button className="btn btn-error" onClick={() => dispatch({type: 'MODAL', payload: {show: true, item: page.id, actionType: "ADD_PAGES"}})}>Delete Page</button></Link>
                </div>
            }
        </div>
        
    )
}