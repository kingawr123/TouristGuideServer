module.exports = mongoose => {
    var tourSchema = mongoose.Schema({
        id: Number,
        name: {
           type: String,
           required: true
        },
        description: String,
        destination: String,
        startDate: Date,
        endDate: Date,
        price: Number,
        maxPeople: Number,
        imageUrl: String,
     });

    tourSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const Tour = mongoose.model('tour', tourSchema);
    return Tour;
}
     