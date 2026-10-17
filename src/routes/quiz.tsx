import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { questions, shuffleQuestions, type Question } from "@/data/quiz";
import { holdAudio, playCheer, playFart, warmAudio } from "@/lib/quiz-sounds";
import { useI18n } from "@/i18n/locale";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

type Phase = "setup" | "question" | "wait" | "reveal" | "done";
type Result = "winner" | "draw" | "solo" | null;

function leaders(scores: number[], pool: number[]) {
  const best = Math.max(...pool.map((id) => scores[id] ?? 0));
  return pool.filter((id) => (scores[id] ?? 0) === best);
}

function QuizPage() {
  const { t, tf } = useI18n();
  const [phase, setPhase] = useState<Phase>("setup");
  const [length, setLength] = useState<10 | 25>(10);
  const [mode, setMode] = useState<"solo" | "teams">("solo");
  const [teamCount, setTeamCount] = useState(2);
  const [custom, setCustom] = useState<(string | null)[]>(() => Array.from({ length: 10 }, () => null));
  const [bank, setBank] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [sudden, setSudden] = useState(false);
  const [suddenRounds, setSuddenRounds] = useState(0);
  const [active, setActive] = useState<number[]>([]);
  const [result, setResult] = useState<Result>(null);
  const [winner, setWinner] = useState("");
  const [flash, setFlash] = useState(false);
  const scoresRef = useRef<number[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const prime = () => warmAudio();
    window.addEventListener("pointerdown", prime);
    return () => window.removeEventListener("pointerdown", prime);
  }, []);

  const count = mode === "teams" ? teamCount : 1;
  const question = bank.length ? bank[index % bank.length] : null;
  const asked = sudden ? length + suddenRounds + 1 : index + 1;

  function clearTimer() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function start() {
    warmAudio();
    clearTimer();
    const nextScores = Array.from({ length: count }, () => 0);
    scoresRef.current = nextScores;
    setBank(shuffleQuestions(questions));
    setIndex(0);
    setScores(nextScores);
    setPicks(Array.from({ length: count }, () => null));
    setSudden(false);
    setSuddenRounds(0);
    setActive(Array.from({ length: count }, (_, id) => id));
    setResult(null);
    setWinner("");
    setFlash(false);
    setPhase("question");
  }

  function choose(team: number, choice: number) {
    warmAudio();
    holdAudio(3000);
    if (phase !== "question") return;
    if (!active.includes(team)) return;
    const next = picks.map((pick, id) => (id === team ? choice : pick));
    setPicks(next);
    if (!question || !active.every((id) => next[id] !== null)) return;
    const answer = question.answer;
    if (active.some((id) => next[id] === answer)) playCheer();
    if (active.some((id) => next[id] !== answer)) playFart();
    queueMicrotask(() => lock(next));
  }

  function lock(currentPicks: (number | null)[]) {
    if (!question) return;
    setPhase("wait");
    const who = active.slice();
    const answer = question.answer;
    clearTimer();
    timer.current = window.setTimeout(() => {
      setScores((current) => {
        const next = current.map((score, team) => {
          if (!who.includes(team)) return score;
          return currentPicks[team] === answer ? score + 1 : score;
        });
        scoresRef.current = next;
        return next;
      });
      setPhase("reveal");
    }, 1000);
  }

  function celebrate(name: string) {
    setWinner(name);
    setResult("winner");
    setFlash(true);
    setPhase("done");
    window.setTimeout(() => setFlash(false), 1700);
  }

  function advance() {
    if (!question) return;
    const finalScores = scoresRef.current;
    const nextIndex = index + 1;
    if (!sudden && nextIndex >= length) {
      if (mode === "solo" || teamCount < 2) {
        setResult("solo");
        setPhase("done");
        return;
      }
      const tied = leaders(finalScores, active);
      if (tied.length === 1) {
        celebrate(label(tied[0] ?? 0));
        return;
      }
      setSudden(true);
      setSuddenRounds(0);
      setActive(tied);
      setPicks(Array.from({ length: count }, () => null));
      setIndex(nextIndex);
      setPhase("question");
      return;
    }
    if (sudden) {
      const tied = leaders(finalScores, active);
      if (tied.length === 1) {
        celebrate(label(tied[0] ?? 0));
        return;
      }
      const rounds = suddenRounds + 1;
      if (rounds >= 3) {
        setResult("draw");
        setPhase("done");
        return;
      }
      setSuddenRounds(rounds);
      setActive(tied);
      setPicks(Array.from({ length: count }, () => null));
      setIndex(nextIndex);
      setPhase("question");
      return;
    }
    setPicks(Array.from({ length: count }, () => null));
    setIndex(nextIndex);
    setPhase("question");
  }

  function label(team: number) {
    if (mode === "solo") return t("You");
    const typed = custom[team];
    if (typed) return typed;
    return tf("Team {n}", { n: team + 1 });
  }

  const mainScore = mode === "solo" ? (scores[0] ?? 0) : 0;

  return (
    <main className="mx-auto max-w-3xl px-3 py-4">
      {flash ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gold px-4 text-center text-ink">
          <p className="font-display text-4xl leading-tight wrap-safe sm:text-7xl">{t("CONGRATULATIONS")}</p>
        </div>
      ) : null}

      {phase === "setup" ? (
        <section>
          <h1 className="font-display text-4xl leading-tight wrap-safe text-pitch sm:text-5xl">{t("Class Quiz")}</h1>
          <p className="mt-2 text-lg">{t("Quick 10 or Mega 25. Play solo, or with up to 10 teams of 4.")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setLength(10)}
              className={`h-16 rounded-3xl font-display text-2xl ${length === 10 ? "bg-pitch text-vest" : "bg-gold text-ink"}`}
            >
              {t("Quick 10")}
            </button>
            <button
              type="button"
              onClick={() => setLength(25)}
              className={`h-16 rounded-3xl font-display text-2xl ${length === 25 ? "bg-pitch text-vest" : "bg-gold text-ink"}`}
            >
              {t("Mega 25")}
            </button>
            <button
              type="button"
              onClick={() => setMode("solo")}
              className={`h-16 rounded-3xl font-display text-2xl ${mode === "solo" ? "bg-track text-vest" : "bg-vest text-ink border-2 border-ink"}`}
            >
              {t("Solo")}
            </button>
            <button
              type="button"
              onClick={() => setMode("teams")}
              className={`h-16 rounded-3xl font-display text-2xl ${mode === "teams" ? "bg-track text-vest" : "bg-vest text-ink border-2 border-ink"}`}
            >
              {t("Teams")}
            </button>
          </div>
          {mode === "teams" ? (
            <div className="mt-4 rounded-3xl bg-ink p-4 text-vest">
              <label htmlFor="team-count" className="font-bold">
                {t("How many teams? Up to 10. Each team can have 4 players.")}
              </label>
              <input
                id="team-count"
                type="range"
                min={2}
                max={10}
                value={teamCount}
                onChange={(event) => setTeamCount(Number(event.target.value))}
                className="mt-3 w-full"
              />
              <p className="mt-1 font-display text-3xl text-gold">{tf("{count} teams", { count: teamCount })}</p>
              <ul className="mt-3 space-y-2">
                {custom.slice(0, teamCount).map((name, team) => (
                  <li key={team}>
                    <label className="sr-only" htmlFor={`team-${team}`}>
                      {tf("Team {n} name", { n: team + 1 })}
                    </label>
                    <input
                      id={`team-${team}`}
                      value={name ?? ""}
                      placeholder={tf("Team {n}", { n: team + 1 })}
                      onChange={(event) =>
                        setCustom((current) => current.map((item, id) => (id === team ? event.target.value : item)))
                      }
                      className="h-11 w-full rounded-full border-2 border-gold bg-vest px-3 text-ink placeholder:text-muted"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <button type="button" onClick={start} className="mt-4 h-14 w-full rounded-full bg-gold font-display text-2xl text-ink">
            {t("Start")}
          </button>
          <a
            href="/every-sport-ever-quiz.pdf"
            target="_blank"
            rel="noopener"
            className="mt-3 flex h-14 w-full items-center justify-center rounded-full border-2 border-ink bg-vest text-center font-display text-2xl text-ink"
          >
            {t("Download the full quiz")}
          </a>
        </section>
      ) : null}

      {phase !== "setup" && phase !== "done" && question ? (
        <section>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold">{sudden ? t("Sudden death") : tf("Question {asked} of {total}", { asked, total: length })}</p>
            <button type="button" onClick={() => setPhase("setup")} className="text-sm font-bold text-track">
              {t("Stop")}
            </button>
          </div>
          {sudden && phase === "question" ? <p className="mt-2 rounded-2xl bg-gold px-3 py-2 text-ink">{t("It is a tie. Sudden death.")}</p> : null}
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink">{question ? tf(question.prompt, { name: t(question.name) }) : ""}</h1>
          {mode === "solo" ? (
            <div className="mt-4 grid gap-2">
              {question.choices.map((choice, choiceIndex) => {
                const picked = picks[0] === choiceIndex;
                const show = phase === "reveal" || phase === "wait";
                const right = choiceIndex === question.answer;
                return (
                  <button
                    key={choiceIndex}
                    type="button"
                    disabled={phase !== "question"}
                    onClick={() => choose(0, choiceIndex)}
                    className={`min-h-14 rounded-2xl px-4 py-3 text-left font-bold ${
                      phase === "reveal" && right
                        ? "bg-gold text-ink"
                        : phase === "reveal" && picked
                          ? "bg-track text-vest"
                          : picked
                            ? "bg-pitch text-vest"
                            : "bg-vest text-ink border-2 border-ink"
                    } ${show && phase === "wait" ? "opacity-80" : ""}`}
                  >
                    {t(choice)}
                    {phase === "reveal" && right ? ` · ${t("Right")}` : ""}
                    {phase === "reveal" && picked && !right ? ` · ${t("Wrong")}` : ""}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {question.choices.map((choice, choiceIndex) => (
                <p key={choiceIndex} className={`rounded-2xl px-3 py-3 ${phase === "reveal" && choiceIndex === question.answer ? "bg-gold text-ink" : "bg-vest border-2 border-ink"}`}>
                  <span className="font-display text-xl">{String.fromCharCode(65 + choiceIndex)}. </span>
                  {t(choice)}
                  {phase === "reveal" && choiceIndex === question.answer ? ` · ${t("Right")}` : ""}
                </p>
              ))}
              <ul className="space-y-3">
                {active.map((team) => (
                  <li key={team} className="rounded-2xl bg-ink p-3 text-vest">
                    <p className="font-bold">{label(team)}</p>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {question.choices.map((choice, choiceIndex) => (
                        <button
                          key={choiceIndex}
                          type="button"
                          disabled={phase !== "question"}
                          onClick={() => choose(team, choiceIndex)}
                          className={`h-12 rounded-full font-bold ${picks[team] === choiceIndex ? "bg-gold text-ink" : "bg-vest text-ink"}`}
                        >
                          {String.fromCharCode(65 + choiceIndex)}
                        </button>
                      ))}
                    </div>
                    {phase === "reveal" ? (
                      <p className="mt-2">{picks[team] === question.answer ? t("Right") : t("Wrong")}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {phase === "wait" ? <p className="mt-3 font-bold">{t("Checking...")}</p> : null}
          {phase === "reveal" ? (
            <button type="button" onClick={advance} className="mt-4 h-12 w-full rounded-full bg-pitch font-bold text-vest">
              {t("Next")}
            </button>
          ) : null}
          <ul className="mt-4 flex flex-wrap gap-2">
            {scores.map((score, team) => (
              <li key={team} className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-ink">
                {label(team)} {score}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {phase === "done" ? (
        <section className="rounded-[2rem] bg-ink p-5 text-vest">
          <h1 className="font-display text-4xl text-gold">
            {result === "winner" ? tf("{name} wins", { name: winner }) : result === "draw" ? t("It is a draw.") : t("Quiz done")}
          </h1>
          {result === "solo" ? (
            <p className="mt-3 text-2xl">
              {tf("You scored {score} out of {total}.", { score: mainScore, total: length })}
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {scores.map((score, team) => (
                <li key={team} className="flex justify-between rounded-2xl bg-vest px-3 py-2 text-ink">
                  <span>{label(team)}</span>
                  <span className="font-bold">{score}</span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={() => setPhase("setup")} className="mt-4 h-12 rounded-full bg-gold px-5 font-bold text-ink">
            {t("Play again")}
          </button>
        </section>
      ) : null}
    </main>
  );
}
