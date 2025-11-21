import BOOKS_DATA from "../data/data.js"
import createBookTemplate from "./book.js";

const bookListTemplate = () => /*html*/ {
    let template = `<ul>` 
    template += BOOKS_DATA.map((book) => createBookTemplate(book)).join('')
    
    template += `</ul>`
    return template;
};

export default bookListTemplate;