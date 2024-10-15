import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './redux/store/store';
import { fetchChatBotQuestions } from './redux/slice/chatBotSlice';
import networkRequest from './axios-config/axiosInstance';
import endpoints from './axios-config/endpoints';
import { toast } from 'react-toastify';
import MiniLoader from './components/MiniLoader';
const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white text-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-400"></div>
            </div>
        </div>
    );
};
interface Option {
    label: string;
    value: string;
    next: string;
}

interface ChatStep {
    message: string;
    options?: Option[];
    next?: string;
    currentNode?: string;
    value?: string;
}

interface ChatbotConfig {
    [key: string]: ChatStep;
}

const chatbotConfig: ChatbotConfig = {
    start: {
        message: "Do you wish to buy a new car or a used car?",
        options: [
            { label: "New", value: "new", next: "new" },
            { label: "Used", value: "used", next: "used" },
        ]
    },
    new: {
        message: "Enter the Year, Make, Model and Trim",
        next: "tradeIn"
    },
    used: {
        message: "Enter the VIN Number",
        next: "verifyVIN"
    },
    // verifyVIN: {
    //     message: "Is the VIN correct?",
    //     options: [
    //         { label: "Yes", value: "tradeIn", next: "tradeIn" },
    //         { label: "No", value: "used", next: "used" }
    //     ]
    // },
    tradeIn: {
        message: "Do you have a car to trade in?",
        options: [
            { label: "Yes", value: "tradeInDetails", next: "tradeInDetails" },
            { label: "No", value: "dealerOffer", next: "dealerOffer" }
        ]
    },
    tradeInDetails: {
        message: "Enter the VIN of the car to be traded in",
        next: "mileage"
    },
    mileage: {
        message: "Enter the Mileage of the car",
        next: "zipCode"
    },
    zipCode: {
        message: "Enter your zip code",
        next: "scratchesDents"
    },
    scratchesDents: {
        message: "Are there any scratches or dents in front of the car?",
        options: [
            { label: "Yes", value: "chooseArea", next: "chooseArea" },
            { label: "No", value: "driverSideDents", next: "driverSideDents" }
        ]
    },
    driverSideDents: {
        message: "Are there any scratches or dents on the driver side of the car?",
        options: [
            { label: "Yes", value: "chooseArea", next: "chooseArea" },
            { label: "No", value: "rearDents", next: "rearDents" }
        ]
    },
    rearDents: {
        message: "Are there any scratches or dents in the rear of the car?",
        options: [
            { label: "Yes", value: "chooseArea", next: "chooseArea" },
            { label: "No", value: "passengerSideDents", next: "passengerSideDents" }
        ]
    },
    passengerSideDents: {
        message: "Are there any scratches or dents on the passenger side of the car?",
        options: [
            { label: "Yes", value: "chooseArea", next: "chooseArea" },
            { label: "No", value: "windowsDents", next: "windowsDents" }
        ]
    },
    windowsDents: {
        message: "Are there any scratches or dents on windows or lights of the car?",
        options: [
            { label: "Yes", value: "chooseArea", next: "chooseArea" },
            { label: "No", value: "dealerOffer", next: "dealerOffer" }
        ]
    },
    chooseArea: {
        message: "Choose areas of the car scratched, dinged or dented",
        next: "driverSideDents"
    },
    dealerOffer: {
        message: "Enter the offer given by the dealer",
        next: "calculatePrice"
    },
    calculatePrice: {
        message: "Using formula to calculate price",
        next: "quoteTeaser"
    },
    quoteTeaser: {
        message: "Redirecting to quote teaser page",
        next: "paymentGateway"
    },
    paymentGateway: {
        message: "Redirecting to payment gateway",
        next: "paymentConfirmation"
    },
    paymentConfirmation: {
        message: "Providing report PDF on payment confirmation",
        next: "end"
    },
    end: {
        message: "Thank you for using the chatbot",
        options: [
            { label: "Start again", value: "start", next: "start" }
        ]
    }
};

interface ChatMessage {
    sender: 'bot' | 'user';
    message: string;
    currentNode?: string;
    nextNode?: string;

}

const Chatbot2: React.FC = () => {
    const { chatbotConfig, chatBotQuestionLoading, session } = useAppSelector(state => state.chatBot) || {};
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [saveChatLoading, setSaveChatLoading] = useState<boolean>(false);
    useEffect(() => {
        dispatch(fetchChatBotQuestions({ token }));
    }, [token]);

    // console.log(JSON.stringify(chatbotConfig, null, 2))
    let startObj = {
        message: "Do you wish to buy a new car or a used car?",
        options: [
            { label: "New", value: "new", next: "new" },
            { label: "Used", value: "used", next: "used" },
        ]
    }
    useEffect(() => {
        const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = "Are you sure you want to leave this page?";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const [currentStep, setCurrentStep] = useState<ChatStep>(chatbotConfig?.start ? chatbotConfig?.start : startObj);


    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            sender: 'bot',
            message: chatbotConfig?.start?.message,
            currentNode: "start",
            nextNode: ""
        }
    ]);

    const [loading, setLoading] = useState<boolean>(false);

    const [responses, setResponses] = useState<string[]>([]);

    const resetChat = () => {
        setChatHistory([{ sender: 'bot', message: chatbotConfig?.start?.message, currentNode: "start", nextNode: "" }]);
        setCurrentStep(chatbotConfig?.start);
        setResponses([]);
        localStorage.clear();
    };

    const handleOptionClick = (nextStep: string, label: string, value: string) => {
        if (nextStep === "start") {
            resetChat();
            return;
        }
        const newHistory: ChatMessage[] = [
            ...chatHistory,
            { sender: 'user', message: label, currentNode: currentStep?.currentNode, nextNode: nextStep }
        ];

        setChatHistory(newHistory);
        setResponses([...responses, label]);
        setLoading(true);
        setTimeout(() => {
            setChatHistory([
                ...newHistory,
                { sender: 'bot', message: chatbotConfig[nextStep]?.message, currentNode: nextStep, nextNode: chatbotConfig[nextStep]?.next }
            ]);
            setCurrentStep({
                ...chatbotConfig[nextStep],
                currentNode: nextStep,
                value: value
            });
            setLoading(false);
        }, 1000);
    };
    const verifyVIN = async (vin: string) => {
        // make api call to verify vin
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
        // console.log(response.data);
        // const isValid = response.data.Results.some(result => result.Value !== null && result.Value !== '0');
        // return isValid;
        return true;
    }
    const handleInputSubmit = async (input: string) => {
        const newHistory: ChatMessage[] = [
            ...chatHistory,
            { sender: 'user', message: input, currentNode: currentStep?.currentNode, nextNode: currentStep?.next }
        ];

        if (currentStep.next === "verifyVIN") {
            const isValidVIN = await verifyVIN(input);
            if (isValidVIN) {
                setChatHistory([
                    ...newHistory,
                    { sender: 'bot', message: chatbotConfig["tradeIn"].message, currentNode: "tradeIn", nextNode: "tradeIn" }
                ]);
                setCurrentStep({
                    ...chatbotConfig["tradeIn"],
                    currentNode: "tradeIn",
                    value: input,
                });
            } else {
                setChatHistory([
                    ...newHistory,
                    { sender: 'bot', message: "Invalid VIN. Please enter a valid VIN number.", currentNode: "verifyVIN", nextNode: "verifyVIN" }
                ]);
                // Keep the current step to ask for VIN again
                setCurrentStep({
                    ...chatbotConfig["verifyVIN"],
                    currentNode: "verifyVIN",
                    value: input,
                });
            }
            return;
        }

        setChatHistory(newHistory);
        setResponses([...responses, input]);

        const nextStep = currentStep.next;
        console.log("Next Step:", nextStep);
        console.log("Current Step:", currentStep);
        if (nextStep && nextStep !== "verifyVIN") {
            setLoading(true);
            setTimeout(() => {
                setChatHistory([
                    ...newHistory,
                    { sender: 'bot', message: chatbotConfig[nextStep].message, currentNode: nextStep, nextNode: chatbotConfig[nextStep]?.next }
                ]);
                setCurrentStep({
                    ...chatbotConfig[nextStep],
                    currentNode: nextStep,
                    value: input,
                });
                setLoading(false);
            }, 1000);
        }

        if (!nextStep && !currentStep.options) {
            console.log("Responses:", responses);
        }
    };


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const newHistory: ChatMessage[] = [
                ...chatHistory,
                { sender: 'user', message: `Uploaded file: ${file.name}`, currentNode: currentStep?.currentNode, nextNode: currentStep?.next }
            ];
            setChatHistory(newHistory);
            setResponses([...responses, `Uploaded file: ${file.name}`]);
            const nextStep = currentStep.next;
            if (nextStep) {
                setLoading(true);
                setTimeout(() => {
                    setChatHistory([
                        ...newHistory,
                        { sender: 'bot', message: chatbotConfig[nextStep].message, currentNode: nextStep, nextNode: chatbotConfig[nextStep]?.next }
                    ]);
                    setCurrentStep({
                        ...chatbotConfig[nextStep],
                        currentNode: nextStep,
                        value: file.name,
                    });
                    setLoading(false);
                }, 1000); // 1 second delay for typing effect
            }
            if (!nextStep && !currentStep.options) {
                console.log("Responses:", responses);
            }
        }
    };

    const handlePageLeave = async () => {
        if (chatHistory.length === 0) return;

        const processData = {} as Record<string, { question: string; answer: string }>;
        let previousNode = '';

        chatHistory.forEach((message, index) => {
            if (message.sender === 'bot') {
                const stepName = message.currentNode || `step_${index}`;
                const nextMessage = chatHistory[index + 1];

                if (nextMessage?.sender === 'user') {
                    processData[stepName] = {
                        question: message.message,
                        answer: nextMessage.message || "",
                    };
                    previousNode = stepName;  // Update previous node
                } else {
                    processData[stepName] = {
                        question: message.message,
                        answer: "",
                    };
                }
            }
        });

        const lastBotMessage = chatHistory.reverse().find((message) => message.sender === 'bot') as ChatMessage;
        const lastUserMessage = chatHistory.reverse().find((message) => message.sender === 'user');

        const next = lastUserMessage ? lastBotMessage.currentNode : lastBotMessage.currentNode;
        const previous_state = previousNode || 'new';
        setSaveChatLoading(true);
        const requestBody = {
            message: lastBotMessage.message,
            next: next || "",
            previous_state: previous_state || "",
            response: lastUserMessage?.message || "",
            data: chatHistory,
            process_data: processData,
        };
        console.log(requestBody, "requestBody");
        try {
            const res = await networkRequest({ token, content_type: false }).post(endpoints.chatBotSessionUp, requestBody);
            if (res?.status === 200) {
                setSaveChatLoading(false);
                dispatch(fetchChatBotQuestions({ token }));
                toast.success("Chat saved successfully");
            }
        } catch (error) {
            setSaveChatLoading(false);
            console.error("Error saving chat:", error);
        }
    };
    // const handlePageLeave = async () => {
    //     const processData: Record<string, { question: string; answer: string }> = {};

    //     chatHistory.forEach((message, index) => {
    //         if (message.sender === 'bot' && chatHistory[index + 1]?.sender === 'user') {
    //             const stepName = message?.currentNode || `step_${index}`;
    //             processData[stepName] = {
    //                 question: message.message,
    //                 answer: chatHistory[index + 1]?.message || "",
    //             };
    //         }
    //     });

    //     const data = {
    //         message: chatHistory[chatHistory.length - 1]?.message || "",
    //         next: currentStep?.next || "",
    //         previous_state: currentStep?.currentNode || "",
    //         response: responses[responses.length - 1] || "",
    //         data: chatHistory,
    //         process_data: processData,
    //     };
    //     console.log(data, "data");
    //     // return
    //     try {
    //         const res = await networkRequest({ token, content_type: false }).post(endpoints.chatBotSessionUp, data);
    //         if (res?.status === 200) {
    //             dispatch(fetchChatBotQuestions({ token }));
    //         }
    //     } catch (error) {
    //         console.error("Error saving chat:", error);
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('beforeunload', function () {

    //         localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    //         //set currentstep
    //         localStorage.setItem('currentStep', JSON.stringify(currentStep));
    //     });
    //     return () => {
    //         window.removeEventListener('beforeunload', function () {
    //             localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    //             localStorage.setItem('currentStep', JSON.stringify(currentStep));
    //         });
    //     }
    // }, [chatHistory]);


    useEffect(() => {
        const chatHistory = session?.state
        const currentStep = session?.current_step
        if (chatHistory) {
            setChatHistory(chatHistory);
        }
        if (currentStep) {
            console.log(
                { ...chatbotConfig[currentStep] },
                "currentStep8888"
            )
            setCurrentStep(
                {
                    ...chatbotConfig[currentStep],
                    currentNode: currentStep,
                    value: currentStep,
                }
            );
            if (currentStep === "start") {
                setChatHistory([{ sender: 'bot', message: chatbotConfig.start.message, currentNode: "start", nextNode: "" }]);
                setCurrentStep(chatbotConfig.start);
            }
        }
    }, []);

    const handleResetChatBot = async () => {
        try {
            const response = await networkRequest({ token }).post(endpoints.resetChatBot);
            console.log(response);
            if (response?.status === 200) {
                resetChat();
                dispatch(fetchChatBotQuestions({ token }));
                toast.success("Chat Reset Successfully");
            }

        } catch (error: any) {
            console.log(error)

        }
    }
    return (
        <>
            <Navbar />
            {
                chatBotQuestionLoading ? <Loader /> : <div className="relative max-w-lg mx-auto mt-2">
                    <div className="bg-white shadow-md rounded  pt-6 pb-8 mb-4 overflow-auto border border-[#ccc]">
                        <div className='flex justify-between py-2 px-4'>
                            <h4 className="text-2xl font-bold text-[#2a7086]">
                                Negotigator
                            </h4>
                            <div className='flex items-center gap-4'>
                                <button className="bg-[#2a7086] text-white  py-2 px-4 rounded" onClick={handlePageLeave}>
                                    {
                                        saveChatLoading ? <MiniLoader />

                                            : "Save Chat"
                                    }
                                </button>
                                <button onClick={handleResetChatBot}
                                    disabled={
                                        currentStep?.currentNode ? false : true
                                    }

                                >
                                    <img src='https://storage.needpix.com/rsynced_images/symbol-909831_1280.png' alt='logo' style={{ height: "2rem", width: "2rem", cursor: currentStep?.currentNode ? "pointer" : "not-allowed" }} />
                                    {/* <button
                            className="bg-[#2a7086] text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setChatHistory([{ sender: 'bot', message: chatbotConfig.start.message }]);
                                setCurrentStep(chatbotConfig.start);
                                setResponses([]);
                                localStorage.clear();
                            }}
                        >
                            Start Over
                        </button> */}
                                </button>

                            </div>
                        </div>
                        <div className=' border-b border-b-[#ccc] mb-4' />
                        <div className={`mb-4 px-4 `}>
                            {chatHistory?.length > 0 && chatHistory?.map((chat, index) => (
                                // <p
                                //     key={index}
                                //     className={`text-base ${chat.sender === 'bot' ? 'text-gray-700' : 'text-blue-700 text-right'} my-2`}
                                // >
                                //     {chat.sender === 'bot' ? <img src="https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg" alt="bot" style={{ borderRadius: "50%", height: "8%", width: "8%" }} /> : 'you'}{chat.message}
                                // </p>



                                <div key={index} className={`flex ${chat.sender === 'bot' ? 'justify-start' : 'justify-end'} mb-2 items-center`}>
                                    <img src={chat.sender === 'bot' ? "https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg" : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} alt="bot" style={{ borderRadius: "50%", height: "8%", width: "8%" }} />
                                    <div className={` ${chat.sender === 'bot' ? 'bg-[#2a7086] text-white' : 'bg-[#faebd7] text-black'}  p-2 rounded-lg ${chat.sender === 'bot' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                        {chat.message}
                                    </div>
                                </div>

                            ))}
                        </div>
                        {loading && <div className={`flex justify-start mb-2 items-center ml-[1rem]`}>
                            <img src="https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg" alt="bot" style={{ borderRadius: "50%", height: "8%", width: "8%" }} />
                            <div className='bg-[#2a7086] text-white p-2 py-3 rounded-lg rounded-br-none flex items-center gap-2'>

                                <Loader />
                            </div>
                        </div>}

                        {!loading && currentStep?.options ? (
                            <div style={{ marginLeft: "2.5rem" }}>
                                {currentStep?.options?.map((option) => (
                                    <button
                                        key={option.value}

                                        className="  py-2 px-4 rounded mr-2 mb-2 border-2 border-[#2a7086] bg-[#2a7086] bg-none"
                                        style={{
                                            background: "none",
                                            color: "#2a7086",
                                            border: "2px solid #2a7086",
                                            borderRadius: "60px",
                                            cursor: "pointer",
                                            marginLeft: ".5rem",
                                            marginTop: ".4rem"

                                        }}
                                        onClick={() => handleOptionClick(option.next, option.label, option.value)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className='px-4  w-full' style={{

                                // left: 0,
                                // right: 0,
                                // marginLeft: "auto",
                                // marginRight: "auto",
                            }}>
                                <div className="flex items-center pt-4">
                                    <input
                                        type="text"
                                        disabled={loading}
                                        placeholder="Type here..."
                                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                if ((e.currentTarget as HTMLInputElement).value === '') {
                                                    return;
                                                }
                                                handleInputSubmit(e.currentTarget.value);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                    />
                                    <svg
                                        style={{
                                            height: "1.4rem",
                                            width: "1.4rem",
                                            cursor: "pointer",
                                            marginLeft: "-2.2rem",

                                        }}

                                        xmlns="http://www.w3.org/2000/svg" width="100%" fill="#2a7086" viewBox="0 0 16 16" onClick={(e) => {

                                            const input = (e.target as HTMLElement).previousSibling as HTMLInputElement;
                                            if (input.value === '') {
                                                return;
                                            }
                                            handleInputSubmit(input.value);
                                            input.value = '';
                                        }}>
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                    </svg>
                                    {/* <svg
                            className="w-6 h-6 text-gray-500 ml-2 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={(e) => {
                                const input = (e.target as HTMLElement).previousSibling as HTMLInputElement;
                                handleInputSubmit(input.value);
                                input.value = '';
                            }}
                        >
                            <path
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg> */}
                                </div>
                            </div>
                        )}
                        {
                            currentStep?.next === "paymentConfirmation" && (
                                <div className="mt-4">
                                    <input type="file" onChange={handleFileUpload} />
                                </div>
                            )
                        }
                    </div>
                </div>
            }

        </>
    );
};


export default Chatbot2;
