import Stats from "../components/Stats";

function Dashboard({ productos }) {
  return (
    <div>
      <h2>📊 Dashboard</h2>

      <Stats productos={productos} />
    </div>
  );
}

export default Dashboard;