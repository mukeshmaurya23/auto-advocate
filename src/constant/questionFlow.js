
const questionsFlow = {
    start: {
        question: "Are you buying an old car or a new car?",
        options: {
            OLD: {
                question: "Please enter a VIN Number and deal offered by dealer",
                next: {
                    question: "Are you trading in a car?",
                    options: {
                        YES: {
                            question: "Please Enter VIN Number"
                        },
                        NO: {
                            action: "Provide Estimate"
                        }
                    }
                }
            },
            NEW: {
                question: "Please enter YM/YT and deal offered by dealer",
                next: {
                    question: "Are you trading in a car?",
                    options: {
                        YES: {
                            question: "Please Enter VIN Number",
                            next: {
                                question: "Finalize the deal",
                                options: {
                                    YES: {
                                        action: "Provide Estimate"
                                    },
                                    NO: {
                                        action: "Provide Estimate"
                                    }
                                }
                            }

                        },
                        NO: {
                            action: "Provide Estimate"
                        }
                    }
                }
            }
        }
    }
};
export default questionsFlow;  