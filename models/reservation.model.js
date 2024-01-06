module.exports = mongoose => {
    var reservationSchema = mongoose.Schema({
        userId: String,
        tourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour"
        },
        totalPrice: Number,
        reservedSpots: Number,
        createdAt: Date,
        updatedAt: Date
    });

    reservationSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        //idk if this is needed
        object.createdAt = this.createdAt;
        object.updatedAt = this.updatedAt;
        return object;
      });

      const Reservation = mongoose.model('reservation', reservationSchema);
      return Reservation;
}