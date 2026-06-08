import { useEffect, useState, useRef } from "react";
import "../css/Dashboard.css";
import logo from "../images/upload-logo.png";
import FilesTable from "../components/FilesTable";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
      setRefresh(prev => !prev);


    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const logoutUser = async () => {
    //ill clear cookie in backend
    try {
      await fetch("http://localhost:6969/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
    navigate("/login");
  }
  if (loading) return <div className="dashboard-loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
           {user?.email?.split("@")[0] || "User"}
        </h1>

        <div className="header-actions">
          <button
            className="upload-btn logout-btn"
            onClick={logoutUser}
          >
            Logout
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="file-input"
          />

          <button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </button>

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}

          </button>
        </div>
      </div>

      <FilesTable refresh={refresh} />
      <br></br>
      {/* <div className="upload-section">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <button className="upload-btn" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload to S3"}
        </button>
      </div> */}

      <div className="file-table-container">
        <div className="file-table-header">
          <h2 className="file-table-title">Selected Files</h2>

          <button
            className="delete-btn"
            disabled={selectedFiles.length === 0}
            onClick={() => {
              setFiles(files.filter((f) => !selectedFiles.includes(f)));
              setSelectedFiles([]);
            }}
          >
            Delete Selected
          </button>
        </div>

        {files.length === 0 ? (
          <p className="no-files">No files selected</p>
        ) : (
          <table className="file-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size (KB)</th>
              </tr>
            </thead>

            <tbody>
              {files.map((f, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedFiles((prev) => {
                    if (prev.includes(f)) {
                      return prev.filter((file) => file !== f);
                    } else {
                      return [...prev, f];
                    }
                  })
                  }

                  className={selectedFiles.includes(f) ? "selected" : ""}
                >
                  <td>{f.name}</td>
                  <td>{f.type || "unknown"}</td>
                  <td>{(f.size / 1024).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div >
  );
}