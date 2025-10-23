import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Coins, BookOpen, PiggyBank, CreditCard, TrendingUp, Award } from "lucide-react";
import LessonModule from "@/components/LessonModule";
import Quiz from "@/components/Quiz";

const Index = () => {
  const [tokens, setTokens] = useState(150);
  const [streak, setStreak] = useState(7);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [experience, setExperience] = useState(2450);
  const [level, setLevel] = useState(5);

  const lessonCategories = [
    {
      id: "budgeting",
      title: "Budgeting Basics",
      description: "Learn to create and maintain a budget",
      icon: PiggyBank,
      color: "bg-success",
      tokenCost: 0,
      lessons: 8,
      completed: 3,
    },
    {
      id: "saving",
      title: "Smart Saving",
      description: "Build your emergency fund and save effectively",
      icon: Coins,
      color: "bg-warning",
      tokenCost: 50,
      lessons: 6,
      completed: 0,
    },
    {
      id: "credit",
      title: "Credit & Debt",
      description: "Understand credit scores and manage debt",
      icon: CreditCard,
      color: "bg-secondary",
      tokenCost: 100,
      lessons: 7,
      completed: 0,
    },
    {
      id: "investing",
      title: "Investing 101",
      description: "Start your investment journey",
      icon: TrendingUp,
      color: "bg-accent",
      tokenCost: 150,
      lessons: 9,
      completed: 0,
    },
  ];

  const handleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    setTokens(prev => prev + 10);
    setExperience(prev => prev + 50);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    setCurrentLesson(null);
    setTokens(prev => prev + Math.floor(score / 10));
    setExperience(prev => prev + score);
  };

  if (showQuiz && currentLesson) {
    return (
      <Quiz 
        onComplete={handleQuizComplete}
        onBack={() => {
          setShowQuiz(false);
          setCurrentLesson(null);
        }}
      />
    );
  }

  if (currentLesson) {
    const category = lessonCategories.find(c => c.id === currentLesson);
    return (
      <LessonModule
        category={category!}
        onComplete={() => handleLessonComplete(currentLesson)}
        onBack={() => setCurrentLesson(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">FinLearn</h1>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-warning" />
                <span className="font-bold text-foreground">{streak}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Coins className="w-5 h-5 text-accent" />
                <span className="font-bold text-foreground">{tokens}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Level {level}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Progress to Level {level + 1}</span>
              <span className="text-sm font-semibold text-foreground ml-auto">{experience} / {(level + 1) * 500} XP</span>
            </div>
            <Progress value={(experience % 500) / 5} className="h-3" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Achievements Banner */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Your Achievements
              </h2>
              <p className="text-muted-foreground">Keep learning to unlock more badges!</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="px-4 py-2 text-lg">
                🎯 Quick Learner
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-lg">
                🔥 7 Day Streak
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-lg">
                💪 Budget Master
              </Badge>
            </div>
          </div>
        </Card>

        {/* Learning Path */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Learning Path</h2>
          <p className="text-muted-foreground mb-6">Master financial literacy one lesson at a time</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessonCategories.map((category, index) => {
              const Icon = category.icon;
              const isLocked = tokens < category.tokenCost;
              const progressPercent = (category.completed / category.lessons) * 100;
              
              return (
                <Card 
                  key={category.id}
                  className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    isLocked ? 'opacity-60' : 'cursor-pointer'
                  }`}
                  onClick={() => !isLocked && setCurrentLesson(category.id)}
                >
                  <div className={`absolute inset-0 ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {category.tokenCost > 0 && (
                        <Badge variant={isLocked ? "secondary" : "default"} className="flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {category.tokenCost}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{category.completed} / {category.lessons} lessons</span>
                        <span className="font-semibold text-foreground">{Math.round(progressPercent)}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      disabled={isLocked}
                      variant={isLocked ? "secondary" : "default"}
                    >
                      {isLocked ? '🔒 Locked' : category.completed > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Daily Challenge */}
        <Card className="p-6 bg-gradient-to-r from-accent/10 to-warning/10 border-2 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">🎯 Daily Challenge</h3>
              <p className="text-muted-foreground mb-4">Complete today's challenge to earn bonus tokens!</p>
              <p className="text-lg font-semibold text-foreground">Challenge: Complete 3 lessons without mistakes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">+50</div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span className="text-sm">Tokens</span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
