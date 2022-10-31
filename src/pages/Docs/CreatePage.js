import { useMutation  } from '@apollo/client';
import { modifyPage } from "../../utils/queries";
import { useContext, useEffect, useState } from 'react';
import { pageVal } from '../../utils/val';
import PageForm from '../../components/PageForm';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client"
import { getPage } from "../../utils/queries"
import { Context } from "../../store/globalstore";
import { getPagesNamesQuery } from '../../utils/queries';

export default function CreatePage() {
    const { dispatch, state: { auth } } = useContext(Context);
    const { id } = useParams();
    const page = useQuery(getPage, {
        variables : {id}
    });
    
    const [modify, graphql] = useMutation(modifyPage);
    
    useEffect(() => {
        dispatch({type : 'LOADING', payload: {status: graphql.loading}})
    }, [graphql.loading])

    const initialData = { name : '', desc : '', sections: []};
    const initialSection = { title: '', desc: '', code: '', examples: ''};
    const [newSection, setNewSection] = useState(initialSection);
    const [data, setData] = useState(initialData)
    
    useEffect(() => {
        if(page.data && page.data.page) {
            setData(page.data.page)
        }
    }, [page])

    const handleChange = (e, type) => {
        const name = e.target.name;
        const value = e.target.value;
        if(type === 'data'){
            return setData({ ...data, [name] : value })
        }
        else if ( type === 'section'){
            return setNewSection({...newSection, [name] : value});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newSection)  {
            setData({...data, sections: [...data.sections, newSection]})
            return setNewSection(initialSection)
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        const error = pageVal({...data});

        modify({
            variables : {...data, id, update: id ? true : false, token : auth.accesstoken},
            refetchQueries : [
                {query : getPagesNamesQuery}
            ]
        }).catch(error => console.log(error))
        
    };

    const handleUpdate = (e, i, name) => {
        const newSections = data.sections.map(item => {
            if(item.title === i.title) return {...item, [name] : e.target.value}
            return item
        })
        return setData({ ...data, sections: [...newSections]})
    }

    return (
        <div className="container">
            <h1>New Page:</h1>
            <PageForm data={data} change={handleChange} submit={handleSubmit} save={handleSave} section={newSection}  />
            sections:
            {
                data.sections.length > 0 ? data.sections.map((i,index) => (
                    <div key={index} className='card sectionshow p-2'>
                        <h3>section : {index + 1} </h3>
                        <span>title : <input value={i.title} onChange={(e) => handleUpdate(e, i, 'title') } /></span>
                        <span>desc : <input value={i.desc} onChange={(e) => handleUpdate(e, i, 'desc') } /></span>
                        <span>bookmark : <input value={i.bookmark} onChange={(e) => handleUpdate(e, i, 'bookmark') } /></span>
                        <span>examples : <textarea className="form-contorl w-100" rows="7" value={i.examples} onChange={(e) => handleUpdate(e, i, 'examples') } ></textarea></span>
                        <span>examples code : <textarea value={i.code} className="form-contorl w-100" rows="7" onChange={(e) => handleUpdate(e, i, 'code')}></textarea></span>   
                    </div>
                )) 
                : ' no sections'
            }
        </div>
    )
}