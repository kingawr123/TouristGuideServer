module.exports = mongoose => {
    var reviewSchema = mongoose.Schema({
        username: String,
        opinion: String,
        rating: Number,
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour"
        }
     });

    reviewSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Review = mongoose.model('review', reviewSchema);
    return Review;
}
     