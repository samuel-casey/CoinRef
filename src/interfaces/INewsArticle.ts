import { PopoverTitle } from "react-bootstrap";

interface INewsArticleAuthor {
    name: string;
}

export default interface INewsArticle {
    url: string;
    title: string;
    author: INewsArticleAuthor;
    published_at: string;
}