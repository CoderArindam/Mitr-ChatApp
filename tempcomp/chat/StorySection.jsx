const StorySection = () => {
  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target="#friend-story"
        type="button"
        className="btn profile-story-box read p-0 border-0"
      >
        <img
          className="img-fluid person-img"
          src="assets/images/profile/p2.png"
          alt="p2"
        />
        Michael
      </button>
    </>
  );
};

export default StorySection;
