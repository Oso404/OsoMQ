import React, { useEffect, useState } from "react";
export default function FilesTable({ refresh }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]); const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:6969/user/files", {
        credentials: "include",
      });

      const data = await res.json();
      setFiles(data.files || []);
      console.log("Fetched files:", data.files);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refresh]);

  if (loading) return <p>Loading files...</p>;

  return (
    <div className="file-table-container">
      <h2 className="file-table-title">My Uploaded Files</h2>

      {files.length === 0 ? (
        <p className="no-files">No files uploaded yet</p>
      ) : (
        <table className="file-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size (KB)</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {files.map((f, idx) => (
              <React.Fragment key={idx}>
                <tr
                  onClick={() => {
                    setExpandedRows((prev) => {
                      if (prev.includes(idx)) {
                        return prev.filter((i) => i !== idx);
                      }

                      return [...prev, idx];
                    });
                  }}
                >
                  <td>{f.file_name}</td>
                  <td>{f.file_type}</td>
                  <td>{(f.file_size / 1024).toFixed(2)}</td>
                  <td>{new Date(f.created_at).toLocaleString()}</td>
                  <td>{f.status}</td>
                </tr>

                {expandedRows.includes(idx) && (
                  <tr
                    onClick={(e) => {
                      e.stopPropagation();

                      setExpandedRows((prev) =>
                        prev.filter((i) => i !== idx)
                      );
                    }}
                  >
                    <td colSpan="4">
                      <a href={f.file_url} target="_blank" rel="noopener noreferrer">
                        {f.file_type?.startsWith("image/")
                          ? "View Image"
                          : "View Video"}
                      </a>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}