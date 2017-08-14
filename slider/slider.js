'use strict';
function Slider(parentNode, folderUrl, imgCount, imgSize, imgInRow) {
    const wrapper = document.createElement('div');
    const leftArrow = wrapper.appendChild(document.createElement('img'));
    const slidesContainer = wrapper.appendChild(document.createElement('div'));
    const rightArrow = wrapper.appendChild(document.createElement('img'));

    wrapper.id = 'slider-wrapper';
    slidesContainer.style.width = imgSize * imgInRow + 'px';

    leftArrow.src = 'lArrow.png';
    rightArrow.src = 'rArrow.png';
    leftArrow.addEventListener('click', prev);
    rightArrow.addEventListener('click', next);

    for (let i = 1; i <= imgCount; i++) {
        let img = slidesContainer.appendChild(document.createElement('img'));
        img.src = `${folderUrl}${i}.jpg`;
        img.className = 'slider-inner-img';
        img.style.width = imgSize + 'px';
        img.style.height = imgSize + 'px';

        if (i > imgInRow) img.classList.add('hidden')
    }

    let imgArr = wrapper.querySelectorAll('.slider-inner-img');
    let currentLastImg = imgInRow - 1;
    console.log(currentLastImg);

    function next() {
        if (!(currentLastImg % (imgCount - 1))) currentLastImg = -1;
        currentLastImg += imgInRow;
        if (currentLastImg >= imgCount) currentLastImg = imgCount - 1;
        changeImgs();
    }
    function prev() {
        if (currentLastImg === imgInRow - 1) currentLastImg = imgCount - 1 + imgInRow;
        currentLastImg -= imgInRow;
        if (currentLastImg < imgInRow) currentLastImg = imgInRow - 1;
        changeImgs();
    }
    function changeImgs() {
        for (let i = imgCount - 1; i >= 0; i--) {
            imgArr[i].classList.add('hidden');
            if (i > currentLastImg - imgInRow && i <= currentLastImg) {
                imgArr[i].classList.remove('hidden');
            }
        }
    }


    parentNode.appendChild(wrapper);
}

function createSlider(options) {
    options.wrapperId = (options.wrapperId) ? document.getElementById(options.wrapperId) :
        document.body.appendChild(document.createElement('div'));
    options.imgFolderSrc = options.imgFolderSrc || 'img/';
    options.imgCount = options.imgCount || 1;
    options.imgSize = options.imgSize || '200';
    options.imgInRow = options.imgInRow || 3;
    new Slider(options.wrapperId, options.imgFolderSrc, options.imgCount, options.imgSize,
        options.imgInRow);
}