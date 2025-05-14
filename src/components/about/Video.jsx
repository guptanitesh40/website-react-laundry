const Video = () => {
  return (
    <section className="section-space">
      <div className="secondary-container">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            className="rounded-3xl laptop-m:rounded-2xl laptop-s:rounded-xl tab-m:rounded-lg mb-l:rounded"
            src="https://www.youtube.com/embed/rCLK5km-WXA?rel=0&modestbranding=1"
            title="Customer review on sikka cleaners"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Video;
