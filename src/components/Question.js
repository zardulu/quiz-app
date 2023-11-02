function Question({ data, onAnswer, questionNum, totalQuestions }) {

    if(!data) return <p>Loading...</p>;
  
    const { question, options, correct } = data;
  
    return (
      <div className="question flex flex-col p-20">
        <div className="question flex flex-col">
        <h1 className="text-2xl text-white font-bold mb-8">
        Question {questionNum} of {totalQuestions}
      </h1> 
  
        <h1 className="text-3xl text-white font-bold mb-4">{question}</h1>

        </div>
  
        <div className="options grid grid-cols-2 gap-4">
          {options.map(option => (
            <button 
            key={option}
            className="p-4inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-200 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-white hover:border-white focus:shadow-xs focus:no-underline"
            onClick={() => onAnswer(option === correct)}  
            >
            {option}
            </button>
                        
          

          ))}
        </div>
      </div>
    );
  }
  
  export default Question;

 
  
  

  