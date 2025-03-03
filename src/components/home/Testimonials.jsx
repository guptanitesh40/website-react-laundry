import useFetchReviews from "../../hooks/testimonials/useFetchReviews";

const Testimonials = () => {
  const { reviews } = useFetchReviews();

  if (!reviews && reviews.length > 0) {
    return null;
  }

  return (
    <section className="space-xl">
      <div className="secondary-container">
        <div className="flex justify-between items-center pb-20 laptop-l:pb-16 laptop-m:pb-12 laptop-s:pb-10 tab:flex-wrap tab:gap-8 mb-l:pb-6 mb-l:gap-12 mb:gap-8 ">
          <div>
            <p className="section-title">Testimonials</p>
            <h2>What They Are Talking</h2>
          </div>
          <div className="review-count flex flex-col items-start gap-4 laptop:gap-3 tab-l:gap-2">
            <span>3000+</span>
            <p>Customers are satisfied</p>
          </div>
        </div>

        <div className="testimonials-scroll flex items-stretch gap-28 overflow-x-scroll snap-x scroll-smooth laptop-l:gap-20 laptop-m:gap-16 laptop-s:gap-12 mb-l:gap-8 mb:gap-6">
          {reviews.slice(0, 15).map((review) => {
            const { feedback_id, comment, order } = review;
            const { first_name } = order.user;
            return (
              <div key={feedback_id} className="review-container snap-start">
                <h4>{first_name}</h4>
                <p>{comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
