import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import ProblemDetailsSection from './ProblemDetailsSection'
import TagsSection from './TagsSection';
import ConstraintsSection from './ConstraintsSection';
import SolutionSection from './SolutionSection';
import ImplementationSection from './ImplementationSection';
import TestCaseSection from './TestCaseSection';
import PreviewProblem from "./PreviewProblem";

const StepDiv = ({ step, number, value }) => {

    const getSymbol = () => {
        if (step === number) 
            return ( <span className={`w-[22px] h-[22px] flex flex-row justify-center items-center bg-blue-600 rounded-full text-xs`}>
                { number }
            </span>)
        else if (step > number) 
            return ( <AiFillCheckCircle size={22} className='text-green-600' /> )
        else 
            return ( <span className={`w-[22px] h-[22px] flex flex-row justify-center items-center bg-gray-600 rounded-full text-xs`}>
                {number}
            </span> )
    }
        
    return (
        <div className='flex flex-col items-center gap-2 text-sm'>
            { getSymbol() }
            <span>{ value }</span>
        </div>
    )
}

const Stepper = () => {

    const [step, setStep] = React.useState(1)

    const [errors, setErrors] = React.useState({
        name: [],
        description: [],
        difficulty: [],
        tags: [],
        constraints: [],
        solution: {
            name: [],
            intuition: [],
            algorithm: []
        },
        implementations: [],
        testcases: []
    });
    const [data, setData] = React.useState(
        {
            name: "Find Smallest Element",
            difficulty: 1,
            description: "Given a array `nums` of size `n`, find the smallest element present in the array",
            tags: [],
            constraints: [],
            solutions: [
                {
                    name: "Brute Force",
                    intution: "The simplest approach is to iterate through the array and keep track of the smallest element found so far.",
                    algorithm: "Initialize the smallest element with the first element of the array.Iterate through the array from the second element to the end. If the current element is smaller than the smallest element found so far, update the smallest element. Return the smallest element.",
                    implementations: [],
                    complexities: [
                        {
                            "type": 1,
                            "value": "O(n)",
                            "explanation": "Iterating through the list once"
                        },
                        {
                            "type": 2,
                            "value": "O(1)",
                            "explanation": "Saving an extra integer to keep track "
                        }
                    ]
                }
            ],
            testcases: [
                {
                    is_sample: true,
                    inputs: [{ name: "nums", type: 3, value: "[1, 2, 3, 4, 5]" },
                        { name: "target", type: 1, value: 5 },
                        { name: "output", type: 1, value: 1 }
                    ]
                },
                {
                    is_sample: true,
                    inputs: [
                        {
                            name: "nums",
                            type: 3,
                            value: "[999, 999, 999]"
                        },
                        {
                            name: "target",
                            type: 1,
                            value: 3
                        },
                        {
                            name: "output",
                            type: 1,
                            value: 999
                        }
                    ]
                },
                {
                    is_sample: true,
                    inputs: [
                        {
                            name: "nums",
                            type: 3,
                            value: "[5, 4, 7]"
                        },
                        {
                            name: "target",
                            type: 1,
                            value: 3
                        },
                        {
                            name: "output",
                            type: 1,
                            value: 4
                        }
                    ]
                }
            ]
        }
    );

    const updateData = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
        if (key === 'solution') {
            if (errors.solution.name.length || errors.solution.algorithm.length || errors.solution.intuition.length) {
                setErrors({ ...errors, solution: { name: [], intuition: [], algorithm: [] } });
            }
        }
        else if (errors[key].length) {
            setErrors({
                ...errors,
                [key]: []
            })
        }
    }

    const updateImplementation = (language, code) => {
        console.log(language, code);
        const newSol = [...data.solutions];
        const id = newSol[0].implementations.find(imp => imp.language_id === language);
        if (id === -1)
            newSol[0].implementations.push({
                language: language,
                value: code
            });
        else 
            newSol[0].implementations[id] = {
                language: language,
                value: code
            }
        setData({
            ...data,
            solutions: newSol
        })
    }

    const validateStepOneData = () => {

        let valid = true;
        let nameErrors = [];
        let difficultyErrors = [];
        let descriptionErrors = [];

        // validate problem name
        if (!data.name.trim().length) {
            nameErrors.push("Name cannot be empty");
            valid = false;
        }

        // validate description name
        if (!data.description.trim().length) {
            descriptionErrors.push("Description cannot be empty");
            valid = false;
        }

        // validate difficulty
        if (!data.difficulty) {
            difficultyErrors.push("Please select a difficulty");
            valid = false;
        }

        setErrors({
            ...errors,
            name: nameErrors,
            description: descriptionErrors,
            difficulty: difficultyErrors
        })

        return valid;
    }

    const validateStepTwoData = () => {
        let tagErrors = [];
        let valid = true;

        if (data.tags.length === 0) {
            tagErrors.push("Please select at least one tag");
            valid = false;
        }
        else if (data.tags.length > 5) {
            tagErrors.push("You cannot select more than 5 tags per problem");
            valid = false;
        }
        
        setErrors({
            ...errors,
            tags: tagErrors
        })
        return valid;
    }

    const validateStepThreeData = () => {
        let constraintErrors = [];
        let valid  = true;

        if (data.constraints.length === 0) {
            constraintErrors.push("Please specify at least one constraint");
            valid = false;
        }
        else if (data.constraints.length > 5) {
            constraintErrors.push("You cannot add more than 5 constraints");
            valid = false;
        }
        setErrors({
            ...errors,
            constraints: constraintErrors
        });
        return valid;
    }

    const validateStepFourData = () => {
        let solNameError = [];
        let solIntuitionError = [];
        let solAlgoError = [];
        let valid = true;

        if (data.solutions[0].name.trim().length === 0) {
            solNameError.push("Solution name cannot be empty");
            valid = false;
        }

        if (data.solutions[0].intution.trim().length === 0) {
            solIntuitionError.push("Solution intuition cannot be empty");
            valid = false;
        }

        if (data.solutions[0].algorithm.trim().length === 0) {
            solAlgoError.push("Solution algorithm cannot be empty");
            valid = false;
        }

        setErrors({
            ...errors,
            solution: {
                name: solNameError,
                intuition: solIntuitionError,
                algorithm: solAlgoError
            }
        })

        return valid;
    }

    const validateStepFiveData = () => {
        let valid = true;
        let implementationErrors = [];

        let found = false;
        for (let implementation of data.solutions[0].implementations) {
            if (implementation.value.trim().length)
                found = true;
        }
        if (!found){
            valid = false;
            implementationErrors.push("Please specify at least one implementation in any language");
        }

        setErrors({
            ...errors,
            implementations: implementationErrors
        })

        return valid;
    }
    
    const getType = (int) => {
        if (int === 1)
            return "integer";
        else if (int === 2)
            return "string";
        else if (int === 3)
            return "integer array";
        else if (int === 4)
            return "string array";
    }

    const validateInteger = (value) => {

        if (!value)
            return false;

        const integerRegex = /^-?\d+$/;
        return integerRegex.test(value);
    }

    const validateIntegerArray = (value) => {

        if (value.trim().length === 0)
            return false;
        
        const integerArrayRegex = /^\[\s*(-?\d+)(\s*,\s*-?\d+)*\s*\]$/;
        return integerArrayRegex.test(value);
    }

    const validateStringArray = (value) => {

        if (value.trim().length === 0)
            return false;
        
        const stringArrayRegex = /^\[\s*("([^"]*)"\s*,\s*)*("([^"]*)"\s*)?\]$/;
        return stringArrayRegex.test(value);
    }

    const validateType = (type, value) => {
        if (type === 1) 
            return validateInteger(value);
        else if (type === 2)
            return value.trim().length != 0;
        else if (type === 3)
            return validateIntegerArray(value);
        else if (type === 4)
            return validateStringArray(value);
    }

    const validateStepSixData = () => {
        let testcaseErrors = [];
        let valid = true;

        if (data.testcases.length < 5) {
            testcaseErrors.push("Please specify at least five test case (3 sample and others hidden)");
            valid = false;
        }
        else if (data.testcases.length > 10) {
            testcaseErrors.push("You can specify a max upto 10 test cases");
            valid = false;
        }

        let sampleCount = data.testcases.filter(testcase => testcase.is_sample === true);
        if (sampleCount < 3) {
            testcaseErrors.push("Please specify at least 3 sample test cases");
            valid = false;
        }
        
        let inputPattern = data.testcases[0].inputs;
        let inputPatternLength = inputPattern.length;

        for (let i=0; i<data.testcases.length; i++) {
            let inputsLength = data.testcases[i].inputs.length;
            if (inputsLength != inputPatternLength) {
                testcaseErrors.push(`Test Case #${i+1} does not have the same number of inputs as Test Case #1`);
                valid = false;
            }
            for (let j=0; j<inputsLength; j++) {
                let firstInput = inputPattern[j];
                let secondInput = data.testcases[i].inputs[j];

                if (firstInput.name != secondInput.name) {
                    testcaseErrors.push(`Name '${secondInput.name}' from Test Case #${i+1} not same as name '${firstInput.name}' in Test Case #1`);
                    valid = false;
                }
                if (firstInput.type != secondInput.type) {
                    testcaseErrors.push(`Type '${getType(secondInput.type)}' from Test Case #${i+1} not same as type '${getType(firstInput.type)}' in Test Case #1`);
                    valid = false;
                }

                if (!validateType(secondInput.type, secondInput.value)) {
                    testcaseErrors.push(`Value ${secondInput.value} in Test Case #${i+1} is not a valid value for type ${getType(secondInput.type)}`);
                    valid = false;
                }
            }
        }

        setErrors({
            ...errors,
            testcases: testcaseErrors
        })
        return valid;
    }

    const onNextClick = () => {
        if (step === 1) {
            let status = validateStepOneData();
            if (status === true) {
                setStep(2);
            }
        }
        else if (step === 2) {
            let status = validateStepTwoData();
            if (status === true) {
                setStep(3);
            }
        }
        else if (step === 3) {
            let status = validateStepThreeData();
            if (status) {
                setStep(4);
            }   
        }
        else if (step === 4) {
            let status = validateStepFourData();
            if (status) {
                setStep(5);
            }
        }
        else if (step === 5) {
            let status = validateStepFiveData();
            if (status) {
                setStep(6);
            }
        }
        else if (step === 6) {
            let status = validateStepSixData();
            if (status) {
                setStep(7);
            }
        }
    }

    const onBackClick = () => {
        if (step === 1)
            return;

        setStep(step - 1);
    }

    return (
        <div className='w-full h-full px-5 py-4 dark:bg-neutral-800 dark:text-white'>

            {/* Steps Icon Div */}
            <div className='flex flex-row justify-center items-start gap-2'>
                <StepDiv step={step} number={1} value={"Problem Details"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={2} value={"Tags"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={3} value={"Constraints"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={4} value={"Solution"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={5} value={"Implementation"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={6} value={"Test Cases"} />
                <hr className='border-white w-[100px] mt-3' />
                <StepDiv step={step} number={7} value={"Review and Create"} />
            </div>

            <div className='w-full min-h-full px-5 py-4 mt-5'>
                {step === 1 && <ProblemDetailsSection data={data} errors={errors} updateData={updateData} />}
                {step === 2 && <TagsSection data={data.tags} errors={errors} updateData={updateData} />}
                {step === 3 && <ConstraintsSection data={data.constraints} errors={errors} updateData={updateData} />}
                {step === 4 && <SolutionSection data={data.solutions[0]} errors={errors} updateData={updateData} />}
                {step === 5 && <ImplementationSection data={data.solutions[0].implementations} errors={errors} updateData={updateImplementation} />}
                {step === 6 && <TestCaseSection data={data.testcases} errors={errors} updateData={updateData} />}
                {step === 7 && <PreviewProblem problem={data} />}
            </div>

            <div className='w-full flex flex-row justify-center px-5 items-center'>
                <div className='w-[50%] flex flex-row justify-between items-center'>
                    <button className='flex flex-row items-center bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded-lg disabled:bg-gray-700 pr-4' disabled={step === 1} onClick={onBackClick}>
                        <MdKeyboardArrowLeft />
                        Back
                    </button>
                    <button className='flex flex-row items-center bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-lg pl-4' onClick={onNextClick}>
                        Next
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Stepper