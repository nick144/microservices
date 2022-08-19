import { ChangeEvent, Component } from "react";
import BlogData from "../models/Blog.type";

type Props = {};
type State = BlogData & {
    submitted: boolean
};

export default class AddBlog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.state = {
            id: null,
            title: '',
            description: '',
            published: false,
            submitted: false
        };
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            title: e.target.value
        });
    }

}