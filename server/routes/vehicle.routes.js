import express from 'express'
import vehicleCtrl from '../controllers/vehicle.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/vehicles')
  .get(vehicleCtrl.list)
  .post(authCtrl.requireSignin, vehicleCtrl.create)

router.route('/api/vehicles/:vehicleId')
  .get(vehicleCtrl.read)
  .put(authCtrl.requireSignin, vehicleCtrl.isOwner, vehicleCtrl.update)
  .delete(authCtrl.requireSignin, vehicleCtrl.isOwner, vehicleCtrl.remove)

router.param('vehicleId', vehicleCtrl.vehicleByID)

export default router
