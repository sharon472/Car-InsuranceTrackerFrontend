import React from "react";

const ActivityLog = ({ log }) => (
  <section className="activity">
    <div className="panel">
      <div className="panel-head"><h2>Activity</h2></div>
      <div className="log">
        {log.slice(0, 50).map(item => (
          <div key={item.id}>
            <strong>{item.title}</strong>
            <div className="muted small">{new Date(item.ts).toLocaleString()}</div>
            <div className="small">{item.msg}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ActivityLog;
