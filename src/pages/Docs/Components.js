import { useContext } from 'react';
import { Context } from '../../store/globalstore';
import DocumentSection from '../../components/DocumentSection';

export default function Components() {
    // const docs = useContext(Context);
    const page =  {
            name: 'Components', 
            desc: "there are serveral components you can use by adding classess to simple HTML elements: ",
            sections: [
                {
                    title: 'Buttons',
                    bookmark: 'buttons',
                    desc: "Use custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
                    examples: [
                        {tag: 'button', className:"btn btn-secondary", children: 'secondary'},
                        {tag: 'button', className:"btn btn-primary", children: 'primary'},
                        {tag: 'button', className:"btn btn-error", children: 'error'},
                        {tag: 'button', className:"btn btn-success", children: 'success'},
                        {tag: 'button', className:"btn btn-outlined-secondary", children: 'outlined-secondary'},
                        {tag: 'button', className:"btn btn-outlined-primary", children: 'outlined-primary'},
                        {tag: 'button', className:"btn btn-outlined-error", children: 'outlined-error'},
                        {tag: 'button', className:"btn btn-outlined-success", children: 'outlined-success'},
                    ],
                    
                    code: `

                    &lt;div className="card"&gt; <br />
                        &lt;h1 className="card-title"&gt;card title&lt;/h1&gt; <br />
                        &lt;hr /&gt; <br />
                        &lt;p className="card-body"&gt;this is our card body&lt;/p&gt; <br />
                    &lt;/div&gt;


                    &lt;input type="text" className="form-control" placeholder="text input" /&gt;<br />    
                    &lt;input type="number" className="form-control" placeholder="number input" /&gt;<br />
                    &lt;textarea className="form-control" placeholder="textarea" &gt;&lt;/textarea&gt;<br />

                    `
                }
            ],
            bookmarks : ['buttons', 'cards', 'list', 'navbar']
        }


        
    return (
        <div className="container">
            <h1>{page.name}:</h1>
            <p>{page.desc}</p>
            <ul className="list" style={{padding: 0, margin: '10px 0'}}>
                {
                    page.bookmarks.map((i,index)=> (
                        <li key={index}><a href={`#${i}`}>{i}</a></li>
                    ))
                }
            </ul>
            {
                page.sections.map( (section,index) => <DocumentSection key={index} code={section.code} title={section.title} bookmark={section.bookmark} description={section.desc} examples={section.examples} />)
            }
        </div>
    )
}