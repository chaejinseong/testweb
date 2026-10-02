export default function HoursTable({ hours }) {
  return (
    <table className="hours">
      <tbody>
        {hours.map((h) => (
          <tr key={h.day}>
            <th scope="row">{h.day}</th>
            <td>{h.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
