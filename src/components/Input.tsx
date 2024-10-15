const fixedInputClass = "rounded-md text-[14px] font-poppins appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2a7086] focus:border-[#2a7086] focus:z-10 sm:text-sm"

interface InputProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    isRequired?: boolean;
    placeholder: string;
    customClass?: string;

}
export default function Input(props: InputProps) {
    const {
        handleChange,
        value,
        labelText,
        labelFor,
        id,
        name,
        type,
        isRequired = false,
        placeholder,
        customClass
    } = props;
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <input
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass + customClass}
                placeholder={placeholder}
            />
        </div>
    )
}