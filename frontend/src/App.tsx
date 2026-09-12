import { useEffect, useState } from "react";
import "./App.css";

interface DashboardData {
  summary: {
    impressions: number;
    clicks: number;
    ctr: number;
    leads: number;
    purchases: number;
    cost: number;
    revenue: number;
    conversion_rate: number;
    cpc: number;
    cpa: number;
    roi: number;
  };
}

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!data) {
    return <h1>Нет данных</h1>;
  }

  const { summary } = data;

  return (
    <div className="dashboard">
      <h1>Marketing Dashboard</h1>

      <div className="cards">
        <div className="card">
          <span>Показы</span>
          <strong>{summary.impressions}</strong>
        </div>

        <div className="card">
          <span>Клики</span>
          <strong>{summary.clicks}</strong>
        </div>

        <div className="card">
          <span>CTR</span>
          <strong>{summary.ctr}%</strong>
        </div>

        <div className="card">
          <span>Лиды</span>
          <strong>{summary.leads}</strong>
        </div>

        <div className="card">
          <span>Покупки</span>
          <strong>{summary.purchases}</strong>
        </div>

        <div className="card">
          <span>Расходы</span>
          <strong>{summary.cost} ₽</strong>
        </div>

        <div className="card">
          <span>Выручка</span>
          <strong>{summary.revenue} ₽</strong>
        </div>

        <div className="card">
          <span>ROI</span>
          <strong>{summary.roi}%</strong>
        </div>
      </div>
    </div>
  );
}

export default App;