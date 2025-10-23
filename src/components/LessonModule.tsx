import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface LessonModuleProps {
  category: {
    id: string;
    title: string;
    icon: any;
    color: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const lessonContent = {
  budgeting: [
    {
      title: "What is a Budget?",
      content: `A budget is a financial plan that helps you track your income and expenses. Think of it as a roadmap for your money - it tells you where your money should go before you spend it.

**Why Budget?**
• Control your spending
• Achieve financial goals
• Reduce money stress
• Build savings

**The Golden Rule:**
Income - Expenses = Savings

A successful budget ensures that your savings number is always positive! Start by tracking every dollar you earn and every dollar you spend for one month.`,
    },
    {
      title: "The 50/30/20 Rule",
      content: `This simple budgeting framework divides your after-tax income into three categories:

**50% - Needs**
Essential expenses you can't avoid:
• Rent/Housing
• Utilities
• Groceries
• Transportation
• Insurance
• Minimum debt payments

**30% - Wants**
Things that enhance your life:
• Dining out
• Entertainment
• Hobbies
• Subscriptions
• Shopping

**20% - Savings & Debt**
Building your future:
• Emergency fund
• Retirement savings
• Extra debt payments
• Investments

*Example: If you earn $2,000/month after taxes, allocate $1,000 to needs, $600 to wants, and $400 to savings.*`,
    },
    {
      title: "Creating Your First Budget",
      content: `Follow these steps to create a budget that works for you:

**Step 1: Calculate Income**
Add up all sources of money:
• Job salary/wages
• Side hustles
• Financial aid
• Family support

**Step 2: List Fixed Expenses**
Monthly costs that stay the same:
• Rent
• Phone bill
• Insurance
• Subscriptions

**Step 3: Estimate Variable Expenses**
Costs that change monthly:
• Groceries
• Gas
• Entertainment
• Personal care

**Step 4: Set Savings Goals**
Decide how much to save:
• Emergency fund (start with $500)
• Long-term goals
• Future purchases

**Step 5: Track & Adjust**
Review weekly and adjust as needed. Your first budget won't be perfect - that's okay! Learning happens through practice.`,
    },
  ],
  saving: [
    {
      title: "Why Save Money?",
      content: `Saving money provides security and opportunities. Here's why it matters:

**Financial Security**
• Handle emergencies without debt
• Reduce stress about money
• Sleep better at night

**Freedom & Opportunity**
• Make choices based on wants, not just needs
• Take advantage of opportunities
• Pursue your dreams

**Building Wealth**
• Compound interest works magic
• Create passive income
• Retire comfortably

*A person who saves $100/month from age 20-65 at 7% return will have over $280,000!*`,
    },
    {
      title: "Emergency Fund Essentials",
      content: `An emergency fund is your financial safety net. Here's how to build one:

**What is it?**
Money set aside for unexpected expenses:
• Car repairs
• Medical bills
• Job loss
• Emergency travel
• Urgent home repairs

**How Much Do You Need?**
• Starter: $500-$1,000
• Basic: 3 months of expenses
• Ideal: 6 months of expenses

**Where to Keep It:**
• High-yield savings account
• Money market account
• Separate from checking account
• Easily accessible but not too easy!

**Building Strategy:**
1. Start with $25/week = $1,300/year
2. Save tax refunds
3. Save windfalls (gifts, bonuses)
4. Automate transfers

Remember: This money is only for emergencies, not for wants!`,
    },
  ],
  credit: [
    {
      title: "Understanding Credit Scores",
      content: `Your credit score is a three-digit number (300-850) that represents your creditworthiness.

**What Affects Your Score:**
• Payment History (35%) - Pay on time!
• Credit Utilization (30%) - Use <30% of limits
• Credit Age (15%) - Keep old accounts open
• Credit Mix (10%) - Different types of credit
• New Credit (10%) - Limit hard inquiries

**Score Ranges:**
• 800-850: Exceptional
• 740-799: Very Good
• 670-739: Good
• 580-669: Fair
• 300-579: Poor

**Why It Matters:**
• Lower interest rates
• Better loan approvals
• Lower insurance premiums
• Easier apartment rentals
• Some job opportunities`,
    },
    {
      title: "Credit Cards 101",
      content: `Credit cards are powerful tools when used correctly:

**How They Work:**
1. You make purchases on credit
2. You get a monthly statement
3. You pay by the due date (avoid interest!)
4. If you don't pay in full, you pay interest

**Key Terms:**
• APR: Annual interest rate
• Credit Limit: Maximum you can charge
• Minimum Payment: Smallest payment allowed
• Grace Period: Time before interest kicks in

**Smart Usage:**
✅ Pay full balance monthly
✅ Use for planned purchases only
✅ Keep utilization under 30%
✅ Set up autopay for minimum payment
✅ Track spending weekly

❌ Don't max out cards
❌ Don't miss payments
❌ Don't get cash advances
❌ Don't open too many at once

*Pro tip: Treat your credit card like a debit card - only spend what you have!*`,
    },
  ],
  investing: [
    {
      title: "Why Invest?",
      content: `Investing helps your money grow faster than traditional savings:

**The Power of Compound Interest:**
• Your money earns returns
• Those returns earn returns
• Snowball effect over time

**Example:**
$1,000 saved at 1% interest (savings account):
• After 30 years: $1,348

$1,000 invested at 7% return (stock market avg):
• After 30 years: $7,612

**Starting Young = Huge Advantage**
Invest $100/month from age 20-30, then stop:
Total contributed: $12,000
Value at 65: $265,000

Start at 30, invest $100/month until 65:
Total contributed: $42,000
Value at 65: $227,000

The early starter wins with less money invested!`,
    },
    {
      title: "Investment Basics",
      content: `Understanding basic investment types:

**Stocks:**
• Own a piece of a company
• Higher risk, higher potential return
• Can be volatile short-term
• Great for long-term growth

**Bonds:**
• Loan money to companies/governments
• Lower risk than stocks
• Steady, predictable returns
• Good for stability

**Index Funds:**
• Own many stocks at once
• Diversification reduces risk
• Low fees
• Great for beginners!

**Starting Steps:**
1. Open a brokerage account
2. Start with index funds
3. Invest regularly (dollar-cost averaging)
4. Don't panic during market drops
5. Think long-term (10+ years)

**Rule of Thumb:**
Your age in bonds, rest in stocks
• Age 20: 20% bonds, 80% stocks
• Age 40: 40% bonds, 60% stocks`,
    },
  ],
};

const LessonModule = ({ category, onComplete, onBack }: LessonModuleProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const lessons = lessonContent[category.id as keyof typeof lessonContent] || lessonContent.budgeting;
  const Icon = category.icon;

  const handleNext = () => {
    if (currentSlide < lessons.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progress = ((currentSlide + 1) / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.title}</h1>
              <p className="text-muted-foreground">Lesson {currentSlide + 1} of {lessons.length}</p>
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
        </div>

        {/* Lesson Content */}
        <Card className="p-8 mb-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center text-white font-bold`}>
                {currentSlide + 1}
              </span>
              {lessons[currentSlide].title}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {lessons[currentSlide].content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-foreground mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('•')) {
                  const items = paragraph.split('\n').filter(line => line.trim());
                  return (
                    <ul key={idx} className="space-y-2 mb-4 ml-6">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">●</span>
                          <span>{item.replace('• ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <div key={idx} className="bg-primary/10 border-l-4 border-primary p-4 rounded my-4">
                      <p className="text-foreground italic">{paragraph.replace(/\*/g, '')}</p>
                    </div>
                  );
                } else {
                  return (
                    <p key={idx} className="text-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {lessons.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-primary w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <Button
            size="lg"
            onClick={handleNext}
            className="gap-2"
          >
            {currentSlide === lessons.length - 1 ? (
              <>
                Complete
                <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonModule;
