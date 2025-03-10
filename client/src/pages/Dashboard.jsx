import {
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

const projectData = [
  { month: "Jan", projects: 4 },
  { month: "Feb", projects: 6 },
  { month: "Mar", projects: 8 },
  { month: "Apr", projects: 5 },
  { month: "May", projects: 7 },
  { month: "Jun", projects: 9 },
];

const statsData = {
  totalProjects: 24,
  activeTasks: 67,
  activeUsers: 12,
};

const Dashboard = () => {
  return (
    <div
      style={{ padding: "32px", marginLeft: "256px", animation: "fadeIn 0.5s" }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "32px" }}
      >
        Dashboard Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            Total Projects
          </h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {statsData.totalProjects}
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            Active Tasks
          </h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {statsData.activeTasks}
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            Active Users
          </h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {statsData.activeUsers}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px",
        }}
      >
        <div
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Project Distribution
          </h3>
          <BarChart
            width={500}
            height={300}
            data={projectData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="projects" fill="#6366F1" />
          </BarChart>
        </div>

        <div
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Project Timeline
          </h3>
          <LineChart
            width={500}
            height={300}
            data={projectData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#6366F1"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
