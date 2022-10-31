export const pageVal = ({ name, desc, sections}) => {
    let error;
    if( !name || !desc ) {
        return error = 'please add all fields'
    }
    if(sections.length === 0) {
        return error = 'please add section'
    }
    for (const section of sections) {
        const { title, desc, code, bookmark, examples} = section;
        if(!title || !desc || !code || !bookmark || !examples) {
            error = "your sections must contain all it's fields";
            break;
        }
    }
    return error;
    
}