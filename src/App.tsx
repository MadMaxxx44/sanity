import { useState, useEffect } from "react";
//modified
interface DatesType {
  id: string;
  date: string;
  completed: boolean;
}

function App() {
  const [dates, setDates] = useState<DatesType[]>(() => {
    const localValue = localStorage.getItem("dates");
    if (localValue == null) return [];
    return JSON.parse(localValue) as DatesType[];
  });

  useEffect(() => {
    localStorage.setItem("dates", JSON.stringify(dates));
  }, [dates]);

  const handleClick = () => {
    setDates((currentDates) => {
      const newDate = f.format(new Date()).toString();
      for (let i = 0; i < currentDates.length; i++) {
        if (currentDates[i].date === newDate) return currentDates;
      }
      return [
        ...currentDates,
        { id: crypto.randomUUID(), date: newDate, completed: false },
      ];
    });
  };

  const complete = (id: string, completed: boolean) => {
    setDates((currentDates) => {
      return currentDates.map((date) => {
        if (date.id == id) {
          return { ...date, completed };
        }
        return date;
      });
    });
  };

  const f = Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  });

  return (
    <>
      <div className="container">
        <button onClick={handleClick}>Add Date</button>
        {dates.map((date) => (
          <div key={date.id}>
            <input
              type="checkbox"
              checked={date.completed}
              onChange={(e) => complete(date.id, e.target.checked)}
            />
            {date.date}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
