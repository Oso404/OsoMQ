import { useEffect, useState, useRef } from "react";
import "../css/Dashboard.css";
import logo from "../images/upload-logo.png";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:6969/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const mappedFiles = selectedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles(mappedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();

    files.forEach((f) => {
      formData.append("files", f.file);
    });

    setUploading(true);

    try {
      const res = await fetch("http://localhost:6969/aws/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log("Upload success:", data);

      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        {/* <img src={logo} alt="upload logo" className="logo" /> */}
        <h1>Welcome {user?.email || "User"}</h1>
      </div>

      <div className="upload-section">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload to S3"}
        </button>
      </div>

      <div className="file-table">
        <h2>Selected Files</h2>

        {files.length === 0 ? (
          <p>No files selected</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size (KB)</th>
              </tr>
            </thead>

            <tbody>
              {files.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.name}</td>
                  <td>{f.type || "unknown"}</td>
                  <td>{(f.size / 1024).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}