import { useEffect, useState } from "react";

export default function FilesTable() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("http://localhost:6969/user/files", {
          credentials: "include",
        });
        //should be an array of files in res.body
        const data = await res.json();
        setFiles(data.files || []);
      } catch (err) {
        console.error("Failed to fetch files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

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
            </tr>
          </thead>

          <tbody>
            {files.map((f, idx) => (
              <tr key={idx}>
                <td>{f.file_name}</td>
                <td>{f.file_type}</td>
                <td>{(f.file_size / 1024).toFixed(2)}</td>
                <td>{new Date(f.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}