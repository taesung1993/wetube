import axios from "axios";

const isVideoDetail = document.querySelector(".videoDetail-page");
const needLoginInthumb = document.querySelector(".thumb-Box__needlogin");
const thumbUp = document.getElementById("videolike");
const thumbDown = document.getElementById("videohate");

const incrementView = async () => {
  const videoId = window.location.href.split("http://localhost:9000/video/")[1];
  const res = await axios(`/api/video/${videoId}/view`, {
    method: "POST",
    data: {
      success: true,
      videoId,
    },
  });
  const isSuccess = res.data.success;

  if (isSuccess) {
    const view = document.getElementById("videoDetailView");
    const viewNum = parseInt(view.textContent) * 1 + 1;
    view.textContent = viewNum == 1 ? `${viewNum} view` : `${viewNum} views`;
  }
};

const incrementLike = async (event) => {
  // 좋아요 버튼을 눌렀을 때
  // 이미 좋아요 버튼이 눌러져 있는지 확인
  // isCanceled : 좋아요 버튼이 클릭되어있는 상태에서 누르면 - 취소
  //              좋아요 버튼이 클릭되지않은 상태에서 누르면 - 좋아요
  const videoId = window.location.href.split("http://localhost:9000/video/")[1];
  const isSelected = thumbUp.className;
  const isSelectedUnlike = thumbDown.className;
  const willSwitch = isSelectedUnlike ? true : false;
  const willCancel = isSelected ? true : false;

  // 좋아요 버튼 - 선택 됨
  // 싫어요 버튼 - 선택되있다면 선택을 푼다.
  thumbUp.classList.toggle("selected");
  thumbDown.classList.remove("selected");

  const res = await axios(`/api/video/${videoId}/like`, {
    method: "POST",
    data: {
      success: true,
      videoId,
      willCancel,
      willSwitch,
    },
  });
  const isSuccess = res.data.success;

  if (isSuccess) {
    const isCanceled = res.data.isCanceled;
    const isSwitched = res.data.isSwitched;
    const likeNumEl = document.getElementById("likeNum");
    const likeNum = likeNumEl.textContent * 1;

    if (isCanceled) {
      // 취소 버튼을 눌렀을 때
      likeNumEl.textContent = likeNum - 1;
    } else {
      // 취소 버튼을 누르지 않았을 때
      likeNumEl.textContent = likeNum + 1;
    }
    if (isSwitched) {
      const unlikeNumEl = document.getElementById("unlikeNum");
      const unlikeNum = unlikeNumEl.textContent * 1;
      unlikeNumEl.textContent = unlikeNum - 1;
    }
  }
};

const incrementUnlike = async (event) => {
  // 위에 있는 incrementLike 함수와 동작방식 같음

  const videoId = window.location.href.split("http://localhost:9000/video/")[1];
  const isSelected = thumbDown.className;
  const isSelectedUnlike = thumbUp.className;
  const willCancel = isSelected ? true : false;
  const willSwitch = isSelectedUnlike ? true : false;
  // 좋아요 버튼 - 선택 됨
  // 싫어요 버튼 - 선택되있다면 선택을 푼다.
  thumbUp.classList.remove("selected");
  thumbDown.classList.toggle("selected");

  const res = await axios(`/api/video/${videoId}/unlike`, {
    method: "POST",
    data: {
      success: true,
      videoId,
      willCancel,
      willSwitch,
    },
  });
  const isSuccess = res.data.success;

  if (isSuccess) {
    const isCanceled = res.data.isCanceled;
    const isSwitched = res.data.isSwitched;
    const unlikeNumEl = document.getElementById("unlikeNum");
    const unlikeNum = unlikeNumEl.textContent * 1;

    if (isCanceled) {
      // 취소 버튼을 눌렀을 때
      unlikeNumEl.textContent = unlikeNum - 1;
    } else {
      // 취소 버튼을 누르지 않았을 때
      unlikeNumEl.textContent = unlikeNum + 1;
    }
    if (isSwitched) {
      const likeNumEl = document.getElementById("likeNum");
      const likeNum = likeNumEl.textContent * 1;
      likeNumEl.textContent = likeNum - 1;
    }
  }
};

if (isVideoDetail) {
  if (window.performance.navigation.type !== 2) {
    // 뒤로 가기를 이용해서 videoDetail 페이지에 왔을 경우
    // view를 올리지 않는다.
    incrementView();
  }
  if (!needLoginInthumb) {
    thumbUp.addEventListener("click", incrementLike);
    thumbDown.addEventListener("click", incrementUnlike);
  }
}
