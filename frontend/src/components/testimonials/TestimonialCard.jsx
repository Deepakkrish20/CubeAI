/**
 * Single testimonial card — placeholder for Swiper integration in UI phase.
 */
function TestimonialCard({ name, location, quote }) {
  return (
    <div className="card">
      <p className="italic text-text-muted">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4">
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-sm text-text-light">{location}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
