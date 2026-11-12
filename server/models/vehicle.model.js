import mongoose from 'mongoose'

const currentYear = new Date().getFullYear()

const VehicleSchema = new mongoose.Schema(
  {
    make: { type: String, trim: true, required: 'Make is required' },
    model: { type: String, trim: true, required: 'Model is required' },
    year: { type: Number, required: 'Year is required', min: 1980, max: currentYear + 1 },
    mileage: { type: Number, required: 'Mileage is required', min: 0 }, // km
    price: { type: Number, required: 'Price is required', min: 0 }, // CAD
    vin: {
      type: String,
      trim: true,
      uppercase: true,
      match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN must be 17 characters (letters and digits, no I, O or Q)'],
    },
    fuelType: { type: String, enum: ['Gas', 'Diesel', 'Hybrid', 'Electric'], default: 'Gas' },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
    color: { type: String, trim: true },
    condition: { type: String, enum: ['Excellent', 'Good', 'Fair'], default: 'Good' },
    status: { type: String, enum: ['Available', 'Reserved', 'Sold'], default: 'Available' },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

export default mongoose.model('Vehicle', VehicleSchema)
