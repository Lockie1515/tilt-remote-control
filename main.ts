radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Y_TILT") {
        yTilt = value
        calculateSpeed()
    } else if (name == "X_TILT") {
        xTilt = value
        calculateTurnDirection()
    }
    updateMotors()
})
function calculateSpeed () {
    speed = Math.idiv(yTilt, -10)
}
function calculateTurnDirection () {
    if (xTilt < -400) {
        direction = "LEFT"
    } else if (xTilt > 400) {
        direction = "RIGHT"
    } else {
        direction = "STRAIGHT"
    }
}
function updateMotors () {
    if (direction == "LEFT") {
        motion.turnLeft(speed)
    } else if (direction == "RIGHT") {
        motion.turnRight(speed)
    } else {
        motion.driveStraight(speed)
    }
}
let direction = ""
let speed = 0
let xTilt = 0
let yTilt = 0
radio.setGroup(1)
basic.forever(function () {
    if (lineSensors.checkSensor(IRSensor.MIDDLE, IRColour.BLACK)) {
        motion.driveStraight(speed)
    }
    radio.sendValue("Y_TILT", input.acceleration(Dimension.Y))
    radio.sendValue("X_TILT", input.acceleration(Dimension.X))
})
