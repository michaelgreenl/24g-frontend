/*
   Starts animations or styles changes in order, returning a promise so the animations can complete before any following
   code is run.
   mainEl - Single element that is used to resolve the promise when its animation completes.
            !! This animation should usually be the longest, or similar in time to the other animations/functionalities
               in anims as it will resolve the promise as soon as it is done. !!
   anims  - Array of objects that will set off in order. Their properties:
                 - 'element': element that is being animated or display changed
                 - 'style': What style is being changed
                 - 'setTo': Value to set the style to
*/
function asyncAnimations(mainEl, anims) {
    return new Promise((resolve) => {
        const onAnimationEnd = () => {
            mainEl.removeEventListener('animationend', onAnimationEnd);
            resolve();
        }

        mainEl.addEventListener('animationend', onAnimationEnd);
        for (const anim of anims) {
            switch (anim['style']) {
                case 'animation':
                    anim.element.style.animation = anim.setTo;
                    break;
                case 'display':
                    anim.element.style.display = anim.setTo;
                    break;
                case 'color':
                    anim.element.style.color = anim.setTo;
                    break;
                case 'fill':
                    anim.element.style.fill = anim.setTo;
                    break;
            }
        }
    })
}

// Video selection buttons
let whoIs24GBtn = document.getElementById('who-is-24g-btn');
let cesOverviewBtn = document.getElementById('ces-overview-btn');
let futureOfDronesBtn = document.getElementById('future-of-drones-btn');

let videos = [
    {
        "currVideo": false,
        "videoBtn": whoIs24GBtn,
        "title": "Who is 24G?",
        "src": "./assets/videos/who_is_24g.mp4",
        "img": "./assets/images/who_is_24g.jpeg",
        "views": "340",
        "likes": "40",
        "dislikes": "5"
    },
    {
        "currVideo": true,
        "videoBtn": cesOverviewBtn,
        "title": "CES Overview",
        "src": "./assets/videos/ces_overview.mp4",
        "thumb": "./assets/images/ces_overview.jpg",
        "views": "300",
        "likes": "35",
        "dislikes": "4"
    },
    {
        "currVideo": false,
        "videoBtn": futureOfDronesBtn,
        "title": "Future of Drones",
        "src": "./assets/videos/future_of_drones.mp4",
        "img": "./assets/images/future_of_drones.jpg",
        "views": "290",
        "likes": "31",
        "dislikes": "3"
    }
];

let currentVideo = document.getElementById('video-current');
let videoTitle = document.getElementById('video-title');
let videoViewsCount = document.getElementById('video-views-count');
let videoUpLikesCount = document.getElementById('video-up-likes-count');
let videoDownLikesCount = document.getElementById('video-down-likes-count');

for (let video of videos) {
    video['videoBtn'].addEventListener('click', async () => {

        // If the video is not already playing, then the video will be switched out for the selected video
        if (!video['videoBtn'].classList.contains('selected-video')) {

            // Removing selected-video class from the current playing video button
            let currSelectedVidBtn = document.querySelector('.selected-video');
            currSelectedVidBtn.classList.remove('selected-video');

            // Adding selected-video class to clicked video button
            video['videoBtn'].classList.add('selected-video');

            // Setting video src, title, view count, and like/dislikes count to the correct values of clicked videoBtn
            currentVideo.setAttribute('src', video['src']);
            videoTitle.innerHTML = video['title'];
            videoViewsCount.innerHTML = video['views'];
            videoUpLikesCount.innerHTML = video['likes'];
            videoDownLikesCount.innerHTML = video['dislikes'];
        }
    })
}

// Like and dislike elements needed for functionality
let likeBtn = document.getElementById('thumbs-up-btn');
let likeBtnIcon = document.getElementById('thumbs-up-icon');
let likeBtnIconFill = document.getElementById('thumbs-up-fill');
let dislikeBtn = document.getElementById('thumbs-down-btn');
let dislikeBtnIcon = document.getElementById('thumbs-down-icon');
let dislikeBtnIconFill = document.getElementById('thumbs-down-fill');

// Whether or not a like/dislike button has been clicked yet
let likeBtnClicked = false;
let dislikeBtnClicked = false;

likeBtn.addEventListener('click', async () => {
    // Checking if dislike button is clicked before allowing functionality of like button to take place
    if (!dislikeBtnClicked) {
        if (!likeBtnClicked) {
            await asyncAnimations(likeBtn, [
                {'element': videoUpLikesCount, 'style': 'color', 'setTo': 'var(--blue)'},
                {'element': likeBtnIconFill, 'style': 'fill', 'setTo': 'var(--blue)'},
                {'element': likeBtn, 'style': 'animation', 'setTo': 'like-rotation ease-in 140ms'},
                {'element': likeBtnIcon, 'style': 'animation', 'setTo': 'like-move ease 150ms'},
            ])

            // Setting the liked 'clicked' value to true
            likeBtnClicked = true;

            // Adding one to the like count
            for (let video of videos) {
                if (video['title'] === videoTitle.innerHTML) {
                    video['likes'] = parseInt(video['likes'], 10) + 1
                    video['likes'] = video['likes'].toString()
                    videoUpLikesCount.innerHTML = video['likes'];
                }
            }
        } else if (likeBtnClicked) {

            // Taking one back off the like count
            for (let video of videos) {
                if (video['title'] === videoTitle.innerHTML) {
                    video['likes'] = parseInt(video['likes'], 10) - 1
                    video['likes'] = video['likes'].toString()
                    videoUpLikesCount.innerHTML = video['likes'];
                }
            }

            // Resetting the liked 'clicked' value to false
            likeBtnClicked = false;

            // Resetting the liked buttons colors
            videoUpLikesCount.style.color = 'var(--orange)';
            likeBtnIconFill.style.fill = 'var(--orange)';
        }
    }

})

dislikeBtn.addEventListener('click', async () => {

    // Checking if like button is clicked before allowing functionality of dislike button to take place
    if (!likeBtnClicked) {

        // If dislike button has not already been clicked
        if (!dislikeBtnClicked) {

            // Animations when user clicks dislike button, including changing its color and some movements
            await asyncAnimations(dislikeBtn, [
                {'element': videoDownLikesCount, 'style': 'color', 'setTo': 'var(--blue)'},
                {'element': dislikeBtnIconFill, 'style': 'fill', 'setTo': 'var(--blue)'},
                {'element': dislikeBtn, 'style': 'animation', 'setTo': 'dislike-rotation ease-in 140ms'},
                {'element': dislikeBtnIcon, 'style': 'animation', 'setTo': 'dislike-move ease 150ms'},
            ])

            // Setting the liked 'clicked' value to false
            dislikeBtnClicked = true;

            // Adding one to the dislike count
            for (let video of videos) {
                if (video['title'] === videoTitle.innerHTML) {
                    video['dislikes'] = parseInt(video['dislikes'], 10) + 1
                    video['dislikes'] = video['dislikes'].toString()
                    videoDownLikesCount.innerHTML = video['dislikes'];
                }
            }
        }
        // If dislike button has already been clicked
        else if (dislikeBtnClicked) {

            // Taking one back off the dislike count
            for (let video of videos) {
                if (video['title'] === videoTitle.innerHTML) {
                    video['dislikes'] = parseInt(video['dislikes'], 10) - 1
                    video['dislikes'] = video['dislikes'].toString()
                    videoDownLikesCount.innerHTML = video['dislikes'];
                }
            }

            // Resetting the disliked 'clicked' value to false
            dislikeBtnClicked = false;

            // Resetting the disliked buttons colors
            videoDownLikesCount.style.color = 'var(--orange)';
            dislikeBtnIconFill.style.fill = 'var(--orange)';
        }
    }
})