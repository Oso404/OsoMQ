# Scalable Media Processing System

A distributed backend system for handling image and video uploads with asynchronous processing pipelines that generate optimized media variants using worker-based architecture and cloud storage.

The system allows users to upload media files through a stateless API while background workers process files into thumbnails, compressed formats, and multiple video resolutions, ensuring non-blocking performance and scalable workload handling.

Features:

* Upload images and videos through RESTful API endpoints
* Asynchronous processing using message queues and worker-based architecture
* Media processing pipeline with state tracking (uploaded, processing, completed, failed)
* Automatic generation of image thumbnails and optimized image variants
* Video transcoding into multiple resolutions (1080p, 720p, 480p) and thumbnail extraction

Tech Stack:

* Node.js
* Express.js
* React
* RESTful API architecture
* JWT authentication with HttpOnly cookies
* Amazon S3 (object storage)
* Amazon SQS (message queuing)
* FFmpeg (video transcoding and processing)
* Sharp (image processing)
* Worker-based distributed processing system
* Event-driven backend architecture
