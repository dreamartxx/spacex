import React, { useState } from 'react';
import { quizQuestions } from '../data/astronomyData';
import { QuizQuestion } from '../types/astronomy';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, AlertCircle, RotateCcw, Trophy, FileText, Download, Printer, Sparkles } from 'lucide-react';

interface QuizModuleProps {
  studentName: string;
  onUpdateStats: (correct: number, total: number, score: number) => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ studentName, onUpdateStats }) => {
  const [selectedGrade, setSelectedGrade] = useState<'Tümü' | '5. Sınıf' | '6. Sınıf' | '7-8. Sınıf'>('Tümü');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Filter questions based on grade
  const filteredQuestions: QuizQuestion[] =
    selectedGrade === 'Tümü'
      ? quizQuestions
      : quizQuestions.filter((q) => q.gradeLevel === selectedGrade || q.gradeLevel === 'Genel Uzay');

  const currentQuestion = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    playSound('click');
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      playSound('correct');
      setCorrectCount((prev) => prev + 1);
    } else {
      playSound('wrong');
    }
  };

  const handleNextQuestion = () => {
    playSound('whoosh');
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Completed!
      playSound('win');
      setIsQuizFinished(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      const finalScore = Math.round((correctCount / filteredQuestions.length) * 100);
      onUpdateStats(correctCount, filteredQuestions.length, finalScore * 10);
    }
  };

  const handleRestartQuiz = () => {
    playSound('click');
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setIsQuizFinished(false);
  };

  // Certificate Download / Print
  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Award className="h-3.5 w-3.5" />
            <span>MEB Fen Bilimleri Kazanımlı Testler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Astronomi ve Uzay Sınavları
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Güneş, Dünya, Ay ve Gezegenler konularında seviyene uygun soruları çöz, başarı sertifikanı al!
          </p>
        </div>

        {/* Grade Level Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          {(['Tümü', '5. Sınıf', '6. Sınıf', '7-8. Sınıf'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => {
                playSound('click');
                setSelectedGrade(grade);
                handleRestartQuiz();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedGrade === grade
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {!isQuizFinished ? (
        /* ================= ACTIVE QUESTION CARD ================= */
        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Progress Ribbon */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-amber-400 font-bold">
                Soru {currentQuestionIndex + 1} / {filteredQuestions.length}
              </span>
              <span>· {currentQuestion.gradeLevel}</span>
              <span className="hidden sm:inline">· {currentQuestion.topic}</span>
            </div>

            <div className="flex items-center gap-1 font-mono">
              <span className="text-slate-400">Doğru:</span>
              <span className="font-bold text-emerald-400">{correctCount}</span>
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswerIndex === idx;
              const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;

              let optionStyle =
                'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

              if (isSelected && !isAnswerSubmitted) {
                optionStyle = 'bg-amber-500/20 border-amber-400 text-white font-medium';
              } else if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm transition-all ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full border border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>Bilimsel Açıklama ve Çözüm:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
              <div className="text-emerald-400 pt-1 font-mono text-[11px]">
                ★ {currentQuestion.mebTip}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswerIndex === null}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all"
              >
                Cevabı Onayla
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all"
              >
                {currentQuestionIndex + 1 < filteredQuestions.length ? 'Sonraki Soru →' : 'Sınavı Bitir ve Sertifikanı Al'}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* ================= COMPLETED & OFFICIAL CERTIFICATE ================= */
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Certificate Preview Card */}
          <div
            id="print-certificate"
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-4 border-amber-500/80 shadow-2xl relative overflow-hidden text-center space-y-5"
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 text-amber-500 font-mono text-xs">✦ GÖK ATLASI ✦</div>
            <div className="absolute top-4 right-4 text-amber-500 font-mono text-xs">✦ MEB UYUMLU ✦</div>
            <div className="absolute bottom-4 left-4 text-slate-500 font-mono text-[10px]">KOD: ASTRO-2026</div>
            <div className="absolute bottom-4 right-4 text-slate-500 font-mono text-[10px]">TÜBİTAK & MEB DESTEKLİ</div>

            <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/40">
              <Trophy className="h-12 w-12" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block mb-1">
                TÜRKİYE CUMHURİYETİ GENÇ ASTRONOM BAŞARI BELGESİ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                ÜSTÜN BAŞARI SERTİFİKASI
              </h2>
            </div>

            <div className="py-2">
              <span className="text-xs text-slate-400 block mb-1">Bu belge gururla takdim edilmiştir:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 underline decoration-amber-500/50 underline-offset-8">
                {studentName || 'Genç Kaşif'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Güneş Sistemi, Gezegenler, Güneş ve Dünya’nın Katmanları ile Ay’ın Evreleri konulu MEB seviye tespit sınavını başarıyla tamamlayarak <strong className="text-emerald-400">%{Math.round((correctCount / filteredQuestions.length) * 100)}</strong> başarı ortalaması ile bu sertifikayı almaya hak kazanmıştır.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Toplam Soru:</span>
                <span className="font-mono font-bold text-white text-base">{filteredQuestions.length}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Doğru Sayısı:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{correctCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tarih:</span>
                <span className="font-mono font-bold text-white text-base">
                  {new Date().toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Sertifikayı Yazdır / PDF İndir</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Testi Tekrar Çöz</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
