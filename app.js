document.getElementById('loginButton').addEventListener('click', function () {
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('signUpButton').addEventListener('click', function () {
    document.getElementById('signUpForm').style.display = 'block';
});

document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', function () {
        button.closest('.modal').style.display = 'none';
    });
});

// User signup functionality
document.getElementById('signUpSubmit').addEventListener('click', function () {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Sign Up successful! You can now log in.');
        document.getElementById('signUpForm').style.display = 'none';
    } else {
        alert('Please fill in both fields.');
    }
});

// User login functionality
document.getElementById('loginSubmit').addEventListener('click', function () {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const savedPassword = localStorage.getItem(username);

    if (savedPassword && password === savedPassword) {
        alert('Logged in successfully!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('loginButton').textContent = username;
        document.getElementById('signUpButton').style.display = 'none';
        document.getElementById('uploadButton').style.display = 'block';
        document.getElementById('channelButton').style.display = 'block';
    } else {
        alert('Incorrect username or password.');
    }
});

// Video upload functionality (after login)
document.getElementById('confirmUploadButton').addEventListener('click', function () {
    const videoFile = document.getElementById('videoUpload').files[0];
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoContainer = document.getElementById('videoContainer');
    const username = document.getElementById('loginButton').textContent;

    if (videoFile && videoTitle) {
        const videoURL = URL.createObjectURL(videoFile);
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoData = {
            title: videoTitle,
            description: videoDescription,
            url: videoURL,
            username: username,
            uploadTime: new Date().toLocaleString(),
            views: 0 // Initialize view count
        };

        videoItem.innerHTML = `
            <img src="thumbnail.png" alt="Video Thumbnail">
            <h3>${videoData.title}</h3>
            <p>Uploaded by: ${username}</p>
            <p>${videoData.uploadTime}</p>
            <p>${videoData.views} views</p>
        `;

        // Add click event to increment views
        videoItem.addEventListener('click', function () {
            videoData.views++;
            localStorage.setItem('videos', JSON.stringify(videos));
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
            <p>Uploaded by: ${videoData.username}</p>
            <p>${videoData.uploadTime}</p>
            <p>${videoData.views || 0} views</p>
        `;

        // Add click event to increment views
        videoItem.addEventListener('click', function () {
            videoData.views = (videoData.views || 0) + 1;
            localStorage.setItem('videos', JSON.stringify(videos));
            videoItem.querySelector('p:last-child').textContent = `${videoData.views} views`;
        });

        videoContainer.appendChild(videoItem);
    });
});

// Navigation to user channel
document.getElementById('channelButton').addEventListener('click', function () {
    const username = document.getElementById('loginButton').textContent;
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = `<h2>${username}'s Channel</h2>`;

    videos.filter(video => video.username === username).forEach(videoData => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        videoItem.innerHTML = `
            <img src="thumbnail.png" alt="Video Thumbnail">
            <h3>${videoData.title}</h3>
            <p>${videoData.uploadTime}</p>
            <p>${videoData.views} views</p>
        `;

        videoContainer.appendChild(videoItem);
    });
});
