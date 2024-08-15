document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('uploadForm').style.display = 'block';
});

document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', function () {
        button.closest('.modal').style.display = 'none';
    });
});

// Video upload functionality
document.getElementById('confirmUploadButton').addEventListener('click', function () {
    const videoFile = document.getElementById('videoUpload').files[0];
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoContainer = document.getElementById('videoContainer');

    if (videoFile && videoTitle) {
        const videoURL = URL.createObjectURL(videoFile);
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoData = {
            title: videoTitle,
            description: videoDescription,
            url: videoURL,
            uploadTime: new Date().toLocaleString(),
            views: 0 // Initialize view count
        };

        videoItem.innerHTML = `
            <img src="thumbnail.png" alt="Video Thumbnail">
            <h3>${videoData.title}</h3>
            <p>${videoData.uploadTime}</p>
            <p>${videoData.views} views</p>
        `;

        // Add click event to view video
        videoItem.addEventListener('click', function () {
            videoData.views++;
            localStorage.setItem('videos', JSON.stringify(videos));
            document.getElementById('videoPlayerModal').style.display = 'block';
            document.getElementById('videoSource').src = videoData.url;
            document.getElementById('videoPlayer').load();
            document.getElementById('videoTitleDisplay').textContent = videoData.title;
            document.getElementById('videoViewsDisplay').textContent = `${videoData.views} views`;
            document.getElementById('videoDescriptionDisplay').textContent = videoData.description;
            videoItem.querySelector('p:last-child').textContent = `${videoData.views} views`;
        });

        videoContainer.appendChild(videoItem);

        // Save video details to localStorage
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push(videoData);
        localStorage.setItem('videos', JSON.stringify(videos));

        document.getElementById('uploadForm').style.display = 'none';
    } else {
        alert('Please select a video file and provide a title.');
    }
});

// Load uploaded videos from localStorage on page load
window.addEventListener('load', function () {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const videoContainer = document.getElementById('videoContainer');

    videos.forEach(videoData => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        videoItem.innerHTML = `
            <img src="thumbnail.png" alt="Video Thumbnail">
            <h3>${videoData.title}</h3>
            <p>${videoData.uploadTime}</p>
            <p>${videoData.views || 0} views</p>
        `;

        // Add click event to view video
        videoItem.addEventListener('click', function () {
            videoData.views = (videoData.views || 0) + 1;
            localStorage.setItem('videos', JSON.stringify(videos));
            document.getElementById('videoPlayerModal').style.display = 'block';
            document.getElementById('videoSource').src = videoData.url;
            document.getElementById('videoPlayer').load();
            document.getElementById('videoTitleDisplay').textContent = videoData.title;
            document.getElementById('videoViewsDisplay').textContent = `${videoData.views} views`;
            document.getElementById('videoDescriptionDisplay').textContent = videoData.description;
            videoItem.querySelector('p:last-child').textContent = `${videoData.views} views`;
        });

        videoContainer.appendChild(videoItem);
    });
});

// Close video player modal
document.querySelector('#videoPlayerModal .close').addEventListener('click', function () {
    document.getElementById('videoPlayerModal').style.display = 'none';
});
