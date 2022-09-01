
const Text = (props: any) => {
    const { title, name } = props.field;
    console.log('Button Render');
    return (
        <div key={ name } className="Button">
            <button
            className="px-10 py-1 text-white  bg-cyan-500 hover:bg-cyan-600 rounded-lg"
            id={name}
            >{title}
            </button>
        </div>
    );
}

export default Text;