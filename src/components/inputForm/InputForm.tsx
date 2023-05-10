const InputForm = (props: any) => {

    const nameLower = props.label.toLowerCase();

    return (
        <div>
            <label
            htmlFor={nameLower}
            className="block text-sm font-medium text-gray-700"
            >
            {props.label}
            </label>
            <div className="mt-1">
            <input
                name={nameLower}
                type={props.type}
                autoComplete={nameLower}
                placeholder={props.label}
                value={props.value}
                onChange={props.onChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            </div>
        </div>
    );
}

export default InputForm;