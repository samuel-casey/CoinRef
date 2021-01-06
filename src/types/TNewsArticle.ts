import { PopoverTitle } from "react-bootstrap";

export type TNewsArticle = {
    url: string;
    title: string;
    author: { name: string };
    published_at: string;
}