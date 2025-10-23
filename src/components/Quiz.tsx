import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, ChevronLeft } from "lucide-react";

interface QuizProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const quizQuestions = [
  {
    question: "What percentage of your income should go to 'Needs' according to the 50/30/20 rule?",
    options: ["30%", "50%", "20%", "40%"],
    correct: 1,
    explanation: "The 50/30/20 rule suggests allocating 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
  },
  {
    question: "What is the recommended starter emergency fund amount?",
    options: ["$100-$200", "$500-$1,000", "$5,000-$10,000", "$50-$100"],
    correct: 1,
    explanation: "Financial experts recommend starting with $500-$1,000 as a starter emergency fund before building up to 3-6 months of expenses.",
  },
  {
    question: "Which factor has the biggest impact on your credit score?",
    options: ["Credit age", "Payment history", "Credit utilization", "Credit mix"],
    correct: 1,
    explanation: "Payment history accounts for 35% of your credit score, making it the single most important factor. Always pay on time!",
  },
  {
    question: "What should your credit card utilization be to maintain a good credit score?",
    options: ["Under 10%", "Under 30%", "Under 50%", "Under 70%"],
    correct: 1,
    explanation: "Keeping your credit utilization under 30% is ideal for maintaining a good credit score. Lower is even better!",
  },
  {
    question: "What is compound interest?",
    options: [
      "Interest paid only on the principal",
      "Interest on both principal and accumulated interest",
      "A type of bank account",
      "Interest that stays the same"
    ],
    correct: 1,
    explanation: "Compound interest means you earn interest on your principal AND on the interest you've already earned, creating exponential growth over time.",
  },
  {
    question: "If you invest $100/month from age 20-30 then stop, versus starting at 30 and investing until 65, who ends up with more money (assuming 7% return)?",
    options: [
      "The person who starts at 30",
      "They end up with the same amount",
      "The person who starts at 20",
      "It depends on market conditions"
    ],
    correct: 2,
    explanation: "The person who starts at 20 ends up with more money ($265k vs $227k) despite investing less total money, thanks to compound interest and starting early!",
  },
  {
    question: "What is an index fund?",
    options: [
      "A single company stock",
      "A collection of many stocks that tracks a market index",
      "A type of savings account",
      "A government bond"
    ],
    correct: 1,
    explanation: "An index fund contains many stocks that track a market index (like the S&P 500), providing instant diversification and typically low fees.",
  },
  {
    question: "What does APR stand for on a credit card?",
    options: [
      "Annual Payment Rate",
      "Annual Percentage Rate",
      "Average Purchase Rate",
      "Approved Payment Return"
    ],
    correct: 1,
    explanation: "APR stands for Annual Percentage Rate - it's the yearly interest rate you'll pay if you carry a balance on your credit card.",
  },
  {
    question: "Which of these is considered a 'Want' rather than a 'Need'?",
    options: [
      "Rent",
      "Groceries",
      "Netflix subscription",
      "Electricity bill"
    ],
    correct: 2,
    explanation: "While entertainment subscriptions like Netflix are nice to have, they're classified as wants because you can live without them. Rent, groceries, and utilities are essential needs.",
  },
  {
    question: "What is the average historical return of the stock market?",
    options: ["3% per year", "7% per year", "15% per year", "1% per year"],
    correct: 1,
    explanation: "The stock market has historically returned about 7% per year on average after adjusting for inflation, though returns vary significantly year to year.",
  },
];

const Quiz = ({ onComplete, onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    const score = (correctAnswers / quizQuestions.length) * 100;
    onComplete(score);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  if (showResults) {
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center shadow-2xl">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            passed ? 'bg-success/20' : 'bg-warning/20'
          }`}>
            <Trophy className={`w-12 h-12 ${passed ? 'text-success' : 'text-warning'}`} />
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {passed ? '🎉 Amazing Work!' : '📚 Keep Learning!'}
          </h2>
          
          <p className="text-2xl font-semibold text-foreground mb-6">
            You scored {percentage}%
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            {passed 
              ? `You got ${correctAnswers} out of ${quizQuestions.length} questions correct! You're mastering financial literacy!`
              : `You got ${correctAnswers} out of ${quizQuestions.length} correct. Review the lessons and try again!`
            }
          </p>

          <div className="bg-muted rounded-lg p-6 mb-8">
            <div className="text-3xl font-bold text-foreground mb-2">+{Math.floor(percentage / 10)}</div>
            <div className="text-muted-foreground">Tokens Earned</div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={handleFinish} size="lg" className="w-full">
              {passed ? 'Continue Learning' : 'Review Lessons'}
            </Button>
            <Button onClick={onBack} variant="outline" size="lg" className="w-full">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Quiz Time!</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{correctAnswers}/{answeredQuestions.filter(Boolean).length}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correct;
              const showCorrect = showExplanation && isCorrectAnswer;
              const showIncorrect = showExplanation && isSelected && !isCorrectAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left flex items-center justify-between group
                    ${isSelected && !showExplanation ? 'border-primary bg-primary/10 shadow-lg scale-105' : ''}
                    ${showCorrect ? 'border-success bg-success/10' : ''}
                    ${showIncorrect ? 'border-destructive bg-destructive/10' : ''}
                    ${!isSelected && !showExplanation ? 'border-border hover:border-primary/50 hover:bg-muted/50' : ''}
                    ${showExplanation ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <span className="text-lg font-semibold text-foreground">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-6 h-6 text-success" />}
                  {showIncorrect && <XCircle className="w-6 h-6 text-destructive" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-6 rounded-xl ${isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-warning/10 border-2 border-warning'}`}>
              <div className="flex items-start gap-3 mb-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
                  </h3>
                  <p className="text-foreground leading-relaxed">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {!showExplanation && (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              size="lg"
              className="w-full"
            >
              Submit Answer
            </Button>
          )}

          {showExplanation && (
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
