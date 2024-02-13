function Card({ date, icon, maxTemp, minTemp, sunrise, sunset }) {
  const dateString = date;
  const dateObject = new Date(dateString);

  const options = { weekday: "long" }; // "long" restituirà il nome completo del giorno

  const dayOfWeek = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return (
    <div className="card">
      <img src={icon} alt="sunny" />

      <p className="weekday">{dayOfWeek}</p>
      <div className="card-temp">
        <p>Max : {maxTemp}°C</p>
        <p>Min : {minTemp}</p>
      </div>
      <p
        style={{
          fontSize: "12px",
          marginBlockStart: "2px",
          marginBlockEnd: "2px",
        }}
      >
        Sunrise : {sunrise}
      </p>
      <p
        style={{
          fontSize: "12px",
          marginBlockStart: "2px",
          marginBlockEnd: "8px",
        }}
      >
        Sunset : {sunset}
      </p>
    </div>
  );
}

export default Card;
