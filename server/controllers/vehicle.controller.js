import Vehicle from '../models/vehicle.model.js'
import userCtrl from './user.controller.js'

const FIELDS = ['make', 'model', 'year', 'mileage', 'price', 'vin', 'fuelType', 'transmission',
  'color', 'condition', 'status', 'description', 'imageUrl']

const pick = (body) => Object.fromEntries(FIELDS.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]))

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// POST /api/vehicles  (signed-in users)
const create = async (req, res) => {
  try {
    const vehicle = new Vehicle({ ...pick(req.body), owner: req.auth._id })
    await vehicle.save()
    return res.status(201).json(vehicle)
  } catch (err) {
    return res.status(400).json({ error: userCtrl.errorMessage(err) })
  }
}

// GET /api/vehicles?status=Available&make=Toyota  (public)
const list = async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.make) filter.make = new RegExp(`^${escapeRegex(req.query.make)}$`, 'i')
    const vehicles = await Vehicle.find(filter).populate('owner', 'name').sort('-created')
    res.json(vehicles)
  } catch (err) {
    return res.status(400).json({ error: userCtrl.errorMessage(err) })
  }
}

// Runs for every route with :vehicleId and loads it into req.vehicle
const vehicleByID = async (req, res, next, id) => {
  try {
    const vehicle = await Vehicle.findById(id).populate('owner', 'name')
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' })
    req.vehicle = vehicle
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve vehicle' })
  }
}

// GET /api/vehicles/:vehicleId  (public)
const read = (req, res) => res.json(req.vehicle)

// Only the user who added the vehicle (or an admin) can edit or delete it
const isOwner = (req, res, next) => {
  const ownerId = req.vehicle.owner && req.vehicle.owner._id.toString()
  if (ownerId !== req.auth._id && req.auth.role !== 'admin') {
    return res.status(403).json({ error: 'You can only change vehicles you added' })
  }
  next()
}

// PUT /api/vehicles/:vehicleId
const update = async (req, res) => {
  try {
    const vehicle = req.vehicle
    Object.assign(vehicle, pick(req.body))
    await vehicle.save()
    res.json(vehicle)
  } catch (err) {
    return res.status(400).json({ error: userCtrl.errorMessage(err) })
  }
}

// DELETE /api/vehicles/:vehicleId
const remove = async (req, res) => {
  try {
    await req.vehicle.deleteOne()
    res.json({ message: 'Vehicle deleted', _id: req.vehicle._id })
  } catch (err) {
    return res.status(400).json({ error: userCtrl.errorMessage(err) })
  }
}

export default { create, list, vehicleByID, read, isOwner, update, remove }
