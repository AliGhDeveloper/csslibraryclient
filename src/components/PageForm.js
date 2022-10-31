
export default function PageForm({ change, submit, save, section, example, data}) {
    
    return(
        <form className="newPageForm" onSubmit={submit}>
                <input name="name" value={data.name} className="form-control w-50" placeholder="page name.." onChange={(e) => change(e, 'data')} />
                <input name="desc" value={data.desc} className="form-control w-100" placeholder="page description.." onChange={(e) => change(e, 'data')}/>
                <div className="card">
                    <h3>Add Sections: </h3>
                    <input name="title" className="form-control w-50" placeholder="section title.." onChange={(e) => change(e, 'section')} />
                    <input name="desc" className="form-control w-50" placeholder="section description.." onChange={(e) => change(e, 'section')} />
                    <input name="bookmark" className="form-control w-50" placeholder="section bookmark.." onChange={(e) => change(e, 'section')} />
                    <div className="card">
                        Add Examples : 
                        
                        <textarea name="examples" rows="7" placeholder="enter the code of your examples" className="form-control w-100 mt-1" onChange={(e) => change(e, 'section')}></textarea>
                        <textarea name="code" rows="7" placeholder="enter the inner code of your examples" className="form-control w-100 mt-1" onChange={(e) => change(e, 'section')}></textarea>
                        
                        <h5>examples: </h5>
                        {
                            section.examples
                        }
                        <hr />
                        <button type="submit" className="btn btn-outlined-success">Add Section</button>
                        
                    </div>
                </div>
                <button onClick={save} >Save Page</button>
            </form>
    )
}