interface FormActionProps {
    handleSubmit: (e: { preventDefault: () => void; }) => void;
    type?: 'Button' | 'Submit';
    action?: 'submit' | 'reset' | 'button';
    text: string | JSX.Element;
}
export default function FormAction(props: FormActionProps) {
    const {
        handleSubmit,
        type = 'Button',
        action = 'submit',
        text
    } = props;
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="group font-poppins relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2a7086] hover:bg-[#2a7086] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a7086] mt-10"
                        onSubmit={handleSubmit}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}