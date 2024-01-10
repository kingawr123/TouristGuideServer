module.exports = mongoose => {
    var historySchema = mongoose.Schema({
        tourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour"
        },
        name: String,
        description: String,
        destination: String,
        price: Number,
        startDate: Date,
        endDate: Date,
        imageUrl: String,
        reservedSpots: Number,
        totalPrice: Number,
        boughtDate: Date,
     });

    historySchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const HistoryItem = mongoose.model('history', historySchema);
    return HistoryItem;
}
     