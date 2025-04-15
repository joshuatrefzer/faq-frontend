import "./questions.css"

export default function Questions() {

    const questions = [
        { question: "Was ist der Sinn des Lebens?", createdAt: "2025-04-13" },
        { question: "Wie funktioniert SolidJS?", createdAt: "2025-04-12" },
        { question: "Was ist der Unterschied zwischen Signal und Store?", createdAt: "2025-04-10" },
    ];

    function transformDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Europe/Berlin"
        });
    }
    

    return (
        <div class="admin-route-wrapper items-start ">
            <table class="question-table">
                <thead>
                    <tr>
                        <th>Frage</th>
                        <th>Erstellt am</th>
                        <th>Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr>
                            <td style={{ width: "70%" }}>{q.question}</td>
                            <td>{transformDate(q.createdAt)}</td>
                            <td class="button-cell">
                                <button class="faq-button" onClick={() => console.log("FAQ erstellen für:", q.question)}>
                                    FAQ erstellen
                                </button>
                                <button class="faq-button" onClick={() => console.log("FAQ erstellen für:", q.question)}>
                                  Frage Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
