# 📦 Scalable Media Processing System

A full-stack backend system that handles **image and video uploads**, processes them asynchronously using background workers, and generates optimized outputs such as thumbnails and compressed variants.

The system is designed to mimic real-world media platforms like Instagram or YouTube, focusing on **scalability, async processing, and distributed architecture concepts**.

---

# 🚀 Features

## 📁 File Upload System

* Upload images and videos
* Supports large file uploads
* Upload progress tracking (frontend)

## ⚙️ Background Processing Pipeline

* Asynchronous job processing using queues
* Worker-based architecture for scalability
* Retry handling for failed jobs

## 🖼️ Image Processing

* Thumbnail generation
* Image compression
* Format optimization (JPG/PNG → WebP)

## 🎬 Video Processing

* Multi-resolution video encoding (1080p, 720p, 480p)
* Thumbnail extraction from video frames
* Compression using FFmpeg

## ☁️ Cloud Storage Integration

* Files stored in Amazon S3
* Processed outputs stored separately
* Public or signed URL access

## 📊 Dashboard

* Displays recent uploads
* File status tracking (uploaded → processing → completed → failed)
* Preview thumbnails for images and videos

---

# 🧠 System Architecture

```
Client (React)
     ↓
API Server (Node.js + Express)
     ↓
S3 Upload (Original File Storage)
     ↓
Job Queue (SQS / BullMQ)
     ↓
Worker Pool
   ├── Image Worker
   ├── Video Worker
   └── Metadata Worker
     ↓
Processed Files → S3
     ↓
Database Update (File Status + URLs)
     ↓
Frontend Dashboard Update
```

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie-based sessions

## Queue / Async Processing

* Amazon SQS *(or BullMQ alternative)*

## Storage

* Amazon S3

## Media Processing

* FFmpeg (video encoding, thumbnails)
* Sharp (image processing)

## Database

* PostgreSQL / MongoDB *(depending on implementation)*

## Frontend

* React
* React Router

---

# 🔐 Authentication

* JWT stored in **HttpOnly cookies**
* Secure authentication middleware
* CORS configured for credentialed requests

---

# ⚙️ Core Concepts Implemented

* Asynchronous job processing
* Worker-based architecture
* Event-driven system design
* File lifecycle state machine
* Cloud object storage (S3)
* Media processing pipelines
* REST API design
* Authentication with cookies + JWT
* Frontend state-driven dashboard

---

# 📁 File Lifecycle

Each uploaded file goes through the following states:

```
UPLOADED → STORED → PROCESSING → COMPLETED → FAILED
```

Each file has:

* original file
* thumbnail
* processed variants (image/video)
* metadata (size, resolution, duration)

---

# 🖼️ Image Pipeline

1. User uploads image
2. Original stored in S3
3. Worker generates:

   * thumbnail
   * optimized medium version
4. URLs saved in database
5. Frontend displays preview instantly

---

# 🎬 Video Pipeline

1. User uploads video
2. Stored in S3
3. Worker processes:

   * 1080p / 720p / 480p variants
   * thumbnail frame extraction
4. Variants stored in S3
5. Dashboard updates with playable links

---

# 📊 Dashboard Features

* View recent uploads
* See processing status in real-time
* Preview thumbnails
* Download original and processed files
* Access different video resolutions

---

# 📡 API Endpoints

## Auth

* POST /auth/login
* GET /auth/me

## Files

* POST /upload
* GET /files
* GET /files/:id

---

# ⚠️ Error Handling

* Failed uploads tracked in DB
* Worker retry logic for failed jobs
* Graceful fallback for missing variants
* Authentication failure handling

---

# 📈 Future Improvements

* Real-time updates via WebSockets
* CDN integration for faster delivery
* Multi-region storage support
* Advanced video adaptive streaming (HLS/DASH)
* Drag-and-drop upload UI
* Progress tracking per chunk upload

---

# 🧠 What this project demonstrates

This project showcases:

* Scalable backend architecture
* Distributed processing systems
* Real-world media pipelines
* Async job queues and workers
* Cloud storage integration
* Authentication systems
* Full-stack integration

---

# 👨‍💻 Author

Built by Julio Reyes
Focused on full-stack development and scalable backend systems.

---

# 💡 One-line summary

A scalable media processing system that uploads, processes, and serves optimized image and video variants using asynchronous worker-based architecture and cloud storage.
